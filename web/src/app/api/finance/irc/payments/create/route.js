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
      `INSERT INTO fin_irc_payments (quarter, year, amount_paid, payment_date, month_id, notes)
       VALUES ($1,$2,$3,$4,$5,$6)
       RETURNING *`,
      [quarter, year, amount_paid, payment_date, month_id, notes || null],
    );

    const payment = rows[0];

    // Also create an IRC ledger payment entry (negative amount)
    await sql(
      `INSERT INTO fin_irc_ledger (month_id, type, irc_payment_id, irc_amount, description, transaction_date)
       VALUES ($1,'payment',$2,$3,$4,$5)`,
      [
        month_id,
        payment.id,
        -Math.abs(amount_paid),
        "IRC payment",
        payment_date,
      ],
    );

    return Response.json({ item: payment });
  } catch (err) {
    console.error("[irc/payments/create]", err);
    return Response.json(
      { error: "Failed to record IRC payment" },
      { status: 500 },
    );
  }
}
