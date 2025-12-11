import sql from "@/app/api/utils/sql";

export async function POST(request) {
  try {
    const body = await request.json();
    const { quarter, year, amount_paid, payment_date, month_id, notes } =
      body || {};
    if (!quarter || !year || !amount_paid || !payment_date || !month_id) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const rows = await sql(
      `INSERT INTO fin_vat_payments (quarter, year, amount_paid, payment_date, month_id, notes)
       VALUES ($1,$2,$3,$4,$5,$6)
       RETURNING *`,
      [quarter, year, amount_paid, payment_date, month_id, notes || null],
    );

    const payment = rows[0];

    // Also create a VAT ledger entry for this payment (negative amount)
    await sql(
      `INSERT INTO fin_vat_ledger (month_id, type, vat_payment_id, vat_amount, description, transaction_date)
       VALUES ($1,'payment',$2,$3,$4,$5)`,
      [
        month_id,
        payment.id,
        -Math.abs(amount_paid),
        "VAT payment",
        payment_date,
      ],
    );

    return Response.json({ item: payment });
  } catch (err) {
    console.error("[vat/payments/create]", err);
    return Response.json(
      { error: "Failed to record VAT payment" },
      { status: 500 },
    );
  }
}
