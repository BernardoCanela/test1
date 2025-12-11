import sql from "@/app/api/utils/sql";
import { getOrCreateCurrentMonth } from "@/app/api/finance/utils";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const monthId = searchParams.get("monthId");
    const month = monthId
      ? (await sql`SELECT * FROM fin_months WHERE id = ${monthId}`)[0]
      : await getOrCreateCurrentMonth();

    const projects = await sql`
      SELECT 
        p.*, 
        COALESCE((SELECT SUM(payment_amount) FROM fin_project_payments WHERE project_id = p.id), 0) as paid_total,
        COALESCE((SELECT SUM(payment_eur_equivalent) FROM fin_project_payments WHERE project_id = p.id), 0) as paid_eur_equiv
      FROM fin_projects p
      WHERE p.current_month_id = ${month.id}
      ORDER BY p.created_at DESC
    `;

    return Response.json({ month, projects });
  } catch (err) {
    console.error("/api/finance/projects/list error", err);
    return Response.json({ error: "Failed to list projects" }, { status: 500 });
  }
}
