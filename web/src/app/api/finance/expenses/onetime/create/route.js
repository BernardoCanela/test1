import sql from "@/app/api/utils/sql";

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      month_id,
      name,
      category,
      amount_excl_vat,
      vat_applicable = false,
      vat_rate = 0.23,
      expense_date = null,
      notes = null,
    } = body || {};

    if (!month_id || !name || !amount_excl_vat) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const vat_amount = vat_applicable
      ? Number(amount_excl_vat) * Number(vat_rate)
      : 0;
    const amount_incl_vat = Number(amount_excl_vat) + vat_amount;

    const rows = await sql(
      `INSERT INTO fin_expenses_onetime (month_id, name, category, amount_excl_vat, vat_applicable, vat_rate, vat_amount, amount_incl_vat, expense_date, notes)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
       RETURNING *`,
      [
        month_id,
        name,
        category || null,
        amount_excl_vat,
        vat_applicable,
        vat_rate,
        vat_amount,
        amount_incl_vat,
        expense_date,
        notes,
      ],
    );

    const expense = rows[0];

    // Add VAT ledger entry (deduction) for this one-time expense if applicable
    if (vat_applicable && vat_amount > 0) {
      await sql(
        `INSERT INTO fin_vat_ledger (month_id, type, expense_onetime_id, vat_amount, description, transaction_date)
         VALUES ($1,'expense_deduction',$2,$3,$4,$5)`,
        [
          month_id,
          expense.id,
          -Math.abs(vat_amount),
          `VAT dedução: ${name}`,
          expense_date,
        ],
      );
    }

    return Response.json({ item: expense });
  } catch (err) {
    console.error("[onetime/create]", err);
    return Response.json(
      { error: "Failed to create one-time expense" },
      { status: 500 },
    );
  }
}
