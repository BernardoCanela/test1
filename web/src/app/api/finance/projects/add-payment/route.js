import sql from "@/app/api/utils/sql";
import { getOrCreateCurrentMonth } from "@/app/api/finance/utils";

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      project_id,
      payment_amount,
      payment_date,
      payment_method,
      reference,
      notes,
    } = body || {};

    if (!project_id || payment_amount == null) {
      return Response.json(
        { error: "Missing project_id or payment_amount" },
        { status: 400 },
      );
    }

    const month = await getOrCreateCurrentMonth();
    const projRows =
      await sql`SELECT * FROM fin_projects WHERE id = ${project_id}`;
    if (!projRows.length)
      return Response.json({ error: "Project not found" }, { status: 404 });
    const p = projRows[0];

    let payment_eur_equivalent = Number(payment_amount);
    let vat_portion = 0;

    if (p.currency === "EUR") {
      // VAT proportion out of total invoiced incl VAT
      const totalIncl = Number(p.invoiced_amount_incl_vat || 0);
      const totalVat = Number(p.vat_amount || 0);
      const vatRateProportion = totalIncl > 0 ? totalVat / totalIncl : 0;
      vat_portion = Number(payment_amount) * vatRateProportion;
      payment_eur_equivalent = Number(payment_amount) - vat_portion;
    } else if (p.currency === "USDT") {
      const rate = Number(p.exchange_rate_eur_usdt || 0);
      payment_eur_equivalent = Number(payment_amount) * rate;
      vat_portion = 0;
    }

    const payRows = await sql`
      INSERT INTO fin_project_payments (
        project_id, month_id, payment_amount, payment_date, currency,
        exchange_rate_eur_usdt, payment_eur_equivalent, vat_portion,
        payment_method, reference, notes
      ) VALUES (
        ${project_id}, ${month.id}, ${payment_amount}, ${payment_date || new Date().toISOString().slice(0, 10)}, ${p.currency},
        ${p.exchange_rate_eur_usdt || null}, ${payment_eur_equivalent}, ${vat_portion},
        ${payment_method || null}, ${reference || null}, ${notes || null}
      ) RETURNING *
    `;

    // Update project paid totals
    const totals =
      await sql`SELECT COALESCE(SUM(payment_amount),0) as paid FROM fin_project_payments WHERE project_id = ${project_id}`;
    const totalPaid = Number(totals[0].paid || 0);
    const remaining = Number(p.invoiced_amount_incl_vat || 0) - totalPaid;

    await sql`UPDATE fin_projects SET total_paid_amount = ${totalPaid}, remaining_amount = ${remaining} WHERE id = ${project_id}`;

    // If fully paid, mark as Pago
    if (remaining <= 0.01) {
      await sql`UPDATE fin_projects SET status = 'Pago', fully_paid_at = NOW() WHERE id = ${project_id}`;
    }

    // VAT ledger entry for EUR payments
    if (p.currency === "EUR" && vat_portion > 0) {
      await sql`
        INSERT INTO fin_vat_ledger (month_id, type, project_id, vat_amount, description, transaction_date)
        VALUES (${month.id}, 'sales', ${project_id}, ${vat_portion}, 'VAT from payment', ${payment_date || new Date().toISOString().slice(0, 10)})
      `;
    }

    // Crypto movement for USDT
    if (p.currency === "USDT") {
      await sql`
        INSERT INTO fin_crypto_movements (month_id, project_id, type, amount_usdt, exchange_rate_eur_usdt, amount_eur, description, movement_date)
        VALUES (${month.id}, ${project_id}, 'inflow', ${payment_amount}, ${p.exchange_rate_eur_usdt || 0}, ${payment_eur_equivalent}, 'Project payment', ${payment_date || new Date().toISOString().slice(0, 10)})
      `;
    }

    return Response.json({ payment: payRows[0], totalPaid, remaining });
  } catch (err) {
    console.error("/api/finance/projects/add-payment error", err);
    return Response.json({ error: "Failed to add payment" }, { status: 500 });
  }
}
