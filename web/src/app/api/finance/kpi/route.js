import sql from "@/app/api/utils/sql";
import {
  getSettings,
  getOrCreateCurrentMonth,
  toFixedCurrency,
} from "@/app/api/finance/utils";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const monthIdParam = searchParams.get("monthId");
    const month = monthIdParam
      ? (await sql`SELECT * FROM fin_months WHERE id = ${monthIdParam}`)[0]
      : await getOrCreateCurrentMonth();

    if (!month) {
      return Response.json(
        { error: "Month not found or could not be created" },
        { status: 404 },
      );
    }

    const settings = await getSettings({
      vat_rate: 0.23,
      irc_rate: 0.21,
      mandatory_savings_pct: 0.075,
    });

    // EUR payments in this month
    const eurRows = await sql`
      SELECT 
        COALESCE(SUM(pp.payment_eur_equivalent + pp.vat_portion), 0) as eur_total_incl_vat,
        COALESCE(SUM(pp.vat_portion), 0) as eur_vat_sales
      FROM fin_project_payments pp
      JOIN fin_projects p ON p.id = pp.project_id
      WHERE pp.month_id = ${month.id} AND p.currency = 'EUR' AND p.is_cancelled = false
    `;

    const eurRevenueInclVat = Number(eurRows[0]?.eur_total_incl_vat || 0);
    const vatSales = Number(eurRows[0]?.eur_vat_sales || 0);
    const eurRevenueExclVat = eurRevenueInclVat - vatSales;

    // Crypto payments
    const cryptoRows = await sql`
      SELECT COALESCE(SUM(pp.payment_eur_equivalent), 0) as crypto_total_eur
      FROM fin_project_payments pp
      JOIN fin_projects p ON p.id = pp.project_id
      WHERE pp.month_id = ${month.id} AND p.currency = 'USDT' AND p.is_cancelled = false
    `;
    const cryptoRevenue = Number(cryptoRows[0]?.crypto_total_eur || 0);

    const totalRevenueExclVat = eurRevenueExclVat + cryptoRevenue;

    // Expenses (excl VAT) and VAT deductible
    const recExp = await sql`
      SELECT 
        COALESCE(SUM(amount_excl_vat), 0) as total,
        COALESCE(SUM(CASE WHEN vat_applicable THEN vat_amount ELSE 0 END), 0) as vat_deductible
      FROM fin_expenses_recurring
      WHERE is_active = true AND start_month_id <= ${month.id}
      AND (end_month_id IS NULL OR end_month_id >= ${month.id})
    `;

    const oneExp = await sql`
      SELECT 
        COALESCE(SUM(amount_excl_vat), 0) as total,
        COALESCE(SUM(CASE WHEN vat_applicable THEN vat_amount ELSE 0 END), 0) as vat_deductible
      FROM fin_expenses_onetime
      WHERE month_id = ${month.id}
    `;

    const totalExpenses =
      Number(recExp[0].total || 0) + Number(oneExp[0].total || 0);
    const vatExpenses =
      Number(recExp[0].vat_deductible || 0) +
      Number(oneExp[0].vat_deductible || 0);

    // VAT liability
    const vatLiability = vatSales - vatExpenses;

    // IRC liability (EUR only, before salaries)
    const eurProfitBeforeTax = eurRevenueExclVat - totalExpenses;
    const ircLiability =
      eurProfitBeforeTax > 0 ? eurProfitBeforeTax * settings.irc_rate : 0;

    // Profit before savings
    const netRevenue = totalRevenueExclVat - totalExpenses;
    const profitBeforeSavings =
      netRevenue - Math.max(vatLiability, 0) - ircLiability;

    // Savings
    const mandatorySavings =
      profitBeforeSavings > 0
        ? profitBeforeSavings * settings.mandatory_savings_pct
        : 0;

    // Real profit
    const realProfit = profitBeforeSavings - mandatorySavings;

    const result = {
      month: {
        id: month.id,
        year: month.year,
        month: month.month,
        status: month.status,
      },
      revenue: {
        eur_incl_vat: toFixedCurrency(eurRevenueInclVat),
        eur_excl_vat: toFixedCurrency(eurRevenueExclVat),
        crypto_eur_equiv: toFixedCurrency(cryptoRevenue),
        total_excl_vat: toFixedCurrency(totalRevenueExclVat),
      },
      expenses: {
        total_excl_vat: toFixedCurrency(totalExpenses),
      },
      taxes: {
        vat_sales: toFixedCurrency(vatSales),
        vat_expenses: toFixedCurrency(vatExpenses),
        vat_liability: toFixedCurrency(vatLiability),
        irc_liability: toFixedCurrency(ircLiability),
      },
      savings: {
        pct: settings.mandatory_savings_pct,
        amount: toFixedCurrency(mandatorySavings),
      },
      profit: {
        real: toFixedCurrency(realProfit),
        before_savings: toFixedCurrency(profitBeforeSavings),
        net_revenue: toFixedCurrency(netRevenue),
      },
    };

    return Response.json(result);
  } catch (err) {
    console.error("/api/finance/kpi error", err);
    return Response.json({ error: "Failed to compute KPIs" }, { status: 500 });
  }
}
