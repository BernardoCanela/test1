import sql from "@/app/api/utils/sql";
import { getSettings, getOrCreateCurrentMonth } from "@/app/api/finance/utils";

async function getExpensesBreakdown(monthId) {
  const byCat = await sql`
    SELECT category, COALESCE(SUM(amount_excl_vat),0) as total
    FROM (
      SELECT category, amount_excl_vat FROM fin_expenses_onetime WHERE month_id = ${monthId}
      UNION ALL
      SELECT category, amount_excl_vat FROM fin_expenses_recurring WHERE is_active = true AND start_month_id <= ${monthId} AND (end_month_id IS NULL OR end_month_id >= ${monthId})
    ) t
    GROUP BY category
  `;
  return byCat;
}

export async function POST(request) {
  try {
    const month = await getOrCreateCurrentMonth();
    if (month.status === "closed") {
      return Response.json({ error: "Month already closed" }, { status: 400 });
    }

    // Basic KPIs via existing endpoint computations (inline minimal)
    const settings = await getSettings({
      irc_rate: 0.21,
      mandatory_savings_pct: 0.075,
    });

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

    const cryptoRows = await sql`
      SELECT COALESCE(SUM(pp.payment_eur_equivalent), 0) as crypto_total_eur
      FROM fin_project_payments pp
      JOIN fin_projects p ON p.id = pp.project_id
      WHERE pp.month_id = ${month.id} AND p.currency = 'USDT' AND p.is_cancelled = false
    `;
    const cryptoRevenue = Number(cryptoRows[0]?.crypto_total_eur || 0);

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

    const vatLiability = vatSales - vatExpenses;
    const eurProfitBeforeTax = eurRevenueExclVat - totalExpenses;
    const ircLiability =
      eurProfitBeforeTax > 0 ? eurProfitBeforeTax * settings.irc_rate : 0;

    const totalRevenueExclVat = eurRevenueExclVat + cryptoRevenue;
    const netRevenue = totalRevenueExclVat - totalExpenses;
    const profitBeforeSavings =
      netRevenue - Math.max(vatLiability, 0) - ircLiability;
    const mandatorySavings =
      profitBeforeSavings > 0
        ? profitBeforeSavings * settings.mandatory_savings_pct
        : 0;
    const realProfit = profitBeforeSavings - mandatorySavings;

    // Pipeline snapshot at closing time
    const pipeline = await sql`
      SELECT id, title, status, currency, invoiced_amount_excl_vat, start_date FROM fin_projects
      WHERE current_month_id = ${month.id} AND is_cancelled = false
      ORDER BY created_at DESC
    `;

    const expensesBreakdown = await getExpensesBreakdown(month.id);

    // Store snapshot & close
    await sql`
      UPDATE fin_months SET
        status = 'closed',
        closed_at = NOW(),
        snapshot_real_revenue_eur = ${eurRevenueExclVat},
        snapshot_real_revenue_crypto_eur = ${cryptoRevenue},
        snapshot_real_profit = ${realProfit},
        snapshot_theoretical_revenue_eur = ${totalRevenueExclVat},
        snapshot_theoretical_profit = ${realProfit},
        snapshot_vat_sales = ${vatSales},
        snapshot_vat_expenses = ${vatExpenses},
        snapshot_vat_liability = ${vatLiability},
        snapshot_expenses_total = ${totalExpenses},
        snapshot_mandatory_savings = ${mandatorySavings},
        snapshot_pipeline = ${JSON.stringify(pipeline)}::jsonb,
        snapshot_expenses_breakdown = ${JSON.stringify(expensesBreakdown)}::jsonb
      WHERE id = ${month.id}
    `;

    // Create next month
    const y = month.year;
    const m = month.month;
    const nextM = m === 12 ? 1 : m + 1;
    const nextY = m === 12 ? y + 1 : y;
    const next =
      await sql`INSERT INTO fin_months (year, month, status) VALUES (${nextY}, ${nextM}, 'open') RETURNING *`;

    // Carry over non-paid projects
    await sql`
      UPDATE fin_projects SET current_month_id = ${next[0].id}
      WHERE current_month_id = ${month.id} AND status <> 'Pago' AND is_cancelled = false
    `;

    // Track debt if negative
    if (realProfit < 0) {
      await sql`
        INSERT INTO fin_debt_ledger (month_id, debt_amount, carried_to_month_id)
        VALUES (${month.id}, ${Math.abs(realProfit)}, ${next[0].id})
      `;
    }

    return Response.json({
      ok: true,
      closedMonthId: month.id,
      nextMonthId: next[0].id,
    });
  } catch (err) {
    console.error("/api/finance/months/close error", err);
    return Response.json({ error: "Failed to close month" }, { status: 500 });
  }
}
