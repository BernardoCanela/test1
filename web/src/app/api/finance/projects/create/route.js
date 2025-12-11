import sql from "@/app/api/utils/sql";
import { getOrCreateCurrentMonth, getSettings } from "@/app/api/finance/utils";

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      title,
      client_id,
      currency,
      amount_excl_vat,
      vat_applicable = true,
      vat_rate,
      exchange_rate_eur_usdt,
      start_date,
      expected_completion_date,
      notes,
    } = body || {};

    if (!title || !currency || amount_excl_vat == null || !start_date) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const month = await getOrCreateCurrentMonth();
    const settings = await getSettings({
      vat_rate: 0.23,
      default_exchange_rate_eur_usdt: 0.92,
    });

    const vatRate =
      currency === "EUR" && vat_applicable
        ? (vat_rate ?? settings.vat_rate)
        : 0;
    const vat_amount =
      currency === "EUR" ? Number(amount_excl_vat) * Number(vatRate) : 0;
    const amount_incl_vat =
      currency === "EUR"
        ? Number(amount_excl_vat) + vat_amount
        : Number(amount_excl_vat);

    const exRate =
      currency === "USDT"
        ? (exchange_rate_eur_usdt ?? settings.default_exchange_rate_eur_usdt)
        : null;
    const eur_equiv =
      currency === "USDT" ? Number(amount_excl_vat) * Number(exRate) : null;

    const rows = await sql`
      INSERT INTO fin_projects (
        title, client_id, status, currency, exchange_rate_eur_usdt,
        invoiced_amount_excl_vat, vat_rate, vat_amount, invoiced_amount_incl_vat,
        invoiced_eur_equivalent,
        start_date, expected_completion_date,
        original_month_id, current_month_id, notes
      ) VALUES (
        ${title}, ${client_id || null}, 'Aberto', ${currency}, ${exRate},
        ${amount_excl_vat}, ${vatRate || null}, ${vat_amount || null}, ${amount_incl_vat},
        ${eur_equiv},
        ${start_date}, ${expected_completion_date || null},
        ${month.id}, ${month.id}, ${notes || null}
      ) RETURNING *
    `;

    const project = rows[0];

    await sql`
      INSERT INTO fin_project_status_history (project_id, from_status, to_status)
      VALUES (${project.id}, NULL, 'Aberto')
    `;

    return Response.json({ project });
  } catch (err) {
    console.error("/api/finance/projects/create error", err);
    return Response.json(
      { error: "Failed to create project" },
      { status: 500 },
    );
  }
}
