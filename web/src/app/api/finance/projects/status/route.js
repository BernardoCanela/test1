import sql from "@/app/api/utils/sql";

export async function POST(request) {
  try {
    const body = await request.json();
    const { project_id, to_status, reason } = body || {};
    if (!project_id || !to_status) {
      return Response.json(
        { error: "Missing project_id or to_status" },
        { status: 400 },
      );
    }

    const current = (
      await sql`SELECT status FROM fin_projects WHERE id = ${project_id}`
    )[0];
    if (!current)
      return Response.json({ error: "Project not found" }, { status: 404 });

    await sql`
      INSERT INTO fin_project_status_history (project_id, from_status, to_status, notes)
      VALUES (${project_id}, ${current.status}, ${to_status}, ${reason || null})
    `;

    if (to_status === "Cancelado") {
      await sql`UPDATE fin_projects SET status = 'Cancelado', is_cancelled = true, cancelled_at = NOW(), cancellation_reason = ${reason || null} WHERE id = ${project_id}`;
    } else if (to_status === "Finalizado") {
      await sql`UPDATE fin_projects SET status = 'Finalizado', completed_at = NOW() WHERE id = ${project_id}`;
    } else if (to_status === "Pago") {
      await sql`UPDATE fin_projects SET status = 'Pago', fully_paid_at = NOW() WHERE id = ${project_id}`;
    } else {
      await sql`UPDATE fin_projects SET status = ${to_status} WHERE id = ${project_id}`;
    }

    return Response.json({ ok: true });
  } catch (err) {
    console.error("/api/finance/projects/status error", err);
    return Response.json({ error: "Failed to update status" }, { status: 500 });
  }
}
