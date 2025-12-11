import sql from "@/app/api/utils/sql";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const monthId = searchParams.get("monthId");
    if (!monthId)
      return Response.json({ error: "monthId required" }, { status: 400 });

    const [month] = await sql(`SELECT * FROM fin_months WHERE id = $1`, [
      monthId,
    ]);
    if (!month)
      return Response.json({ error: "month not found" }, { status: 404 });

    const entries = await sql(
      `SELECT * FROM fin_irc_ledger WHERE month_id = $1 ORDER BY transaction_date ASC NULLS LAST, created_at ASC`,
      [monthId],
    );

    const totals = await sql(
      `SELECT
        COALESCE(SUM(CASE WHEN type = 'liability' THEN irc_amount ELSE 0 END),0) as irc_liability,
        COALESCE(SUM(CASE WHEN type = 'payment' THEN irc_amount ELSE 0 END),0) as irc_payments
      FROM fin_irc_ledger WHERE month_id = $1`,
      [monthId],
    );

    return Response.json({ month, entries, monthTotals: totals[0] });
  } catch (err) {
    console.error("[irc/ledger]", err);
    return Response.json(
      { error: "Failed to load IRC ledger" },
      { status: 500 },
    );
  }
}
