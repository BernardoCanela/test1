import sql from "@/app/api/utils/sql";

function getQuarter(month) {
  // month is 1-12
  if (month <= 3) return 1;
  if (month <= 6) return 2;
  if (month <= 9) return 3;
  return 4;
}

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
      `SELECT * FROM fin_vat_ledger WHERE month_id = $1 ORDER BY transaction_date ASC NULLS LAST, created_at ASC`,
      [monthId],
    );

    // Totals for month
    const totals = await sql(
      `SELECT
        COALESCE(SUM(CASE WHEN type = 'sales' THEN vat_amount ELSE 0 END),0) as vat_sales,
        COALESCE(SUM(CASE WHEN type = 'expense_deduction' THEN vat_amount ELSE 0 END),0) as vat_expenses,
        COALESCE(SUM(CASE WHEN type = 'payment' THEN vat_amount ELSE 0 END),0) as vat_payments
      FROM fin_vat_ledger WHERE month_id = $1`,
      [monthId],
    );

    // Quarterly summary
    const q = getQuarter(month.month);
    const monthsInQ = [1, 2, 3].map((i) => (q - 1) * 3 + i);
    const quarterMonthIds = await sql(
      `SELECT id FROM fin_months WHERE year = $1 AND month = ANY($2)`,
      [month.year, monthsInQ],
    );
    const qIds = quarterMonthIds.map((r) => r.id);
    let qTotals = { vat_sales: 0, vat_expenses: 0, vat_payments: 0 };
    if (qIds.length > 0) {
      const res = await sql(
        `SELECT
          COALESCE(SUM(CASE WHEN type = 'sales' THEN vat_amount ELSE 0 END),0) as vat_sales,
          COALESCE(SUM(CASE WHEN type = 'expense_deduction' THEN vat_amount ELSE 0 END),0) as vat_expenses,
          COALESCE(SUM(CASE WHEN type = 'payment' THEN vat_amount ELSE 0 END),0) as vat_payments
        FROM fin_vat_ledger WHERE month_id = ANY($1)`,
        [qIds],
      );
      qTotals = res[0];
    }

    return Response.json({
      month,
      entries,
      monthTotals: totals[0],
      quarter: q,
      quarterTotals: qTotals,
    });
  } catch (err) {
    console.error("[vat/ledger]", err);
    return Response.json(
      { error: "Failed to load VAT ledger" },
      { status: 500 },
    );
  }
}
