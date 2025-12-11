import sql from "@/app/api/utils/sql";

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      name,
      category,
      amount_excl_vat,
      vat_applicable = false,
      vat_rate = 0.23,
      start_month_id,
      end_month_id = null,
      notes = null,
    } = body || {};

    if (!name || !amount_excl_vat || !start_month_id) {
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
      `INSERT INTO fin_expenses_recurring (name, category, amount_excl_vat, vat_applicable, vat_rate, vat_amount, amount_incl_vat, start_month_id, end_month_id, is_active, notes)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,true,$10)
       RETURNING *`,
      [
        name,
        category || null,
        amount_excl_vat,
        vat_applicable,
        vat_rate,
        vat_amount,
        amount_incl_vat,
        start_month_id,
        end_month_id,
        notes,
      ],
    );

    return Response.json({ item: rows[0] });
  } catch (err) {
    console.error("[recurring/create]", err);
    return Response.json(
      { error: "Failed to create recurring expense" },
      { status: 500 },
    );
  }
}
