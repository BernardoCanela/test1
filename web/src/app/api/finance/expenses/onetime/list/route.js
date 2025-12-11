import sql from "@/app/api/utils/sql";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const monthId = searchParams.get("monthId");
    if (!monthId) {
      return Response.json({ error: "monthId required" }, { status: 400 });
    }
    const rows = await sql(
      `SELECT * FROM fin_expenses_onetime WHERE month_id = $1 ORDER BY expense_date DESC NULLS LAST, created_at DESC`,
      [monthId],
    );
    return Response.json({ items: rows });
  } catch (err) {
    console.error("[onetime/list]", err);
    return Response.json(
      { error: "Failed to list one-time expenses" },
      { status: 500 },
    );
  }
}
