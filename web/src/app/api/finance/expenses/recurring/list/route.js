import sql from "@/app/api/utils/sql";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const monthId = searchParams.get("monthId");
    const onlyActive = searchParams.get("active") === "true";

    let query = `SELECT * FROM fin_expenses_recurring`;
    const where = [];
    const values = [];

    if (onlyActive) {
      where.push(`is_active = $${values.length + 1}`);
      values.push(true);
    }

    if (monthId) {
      // active for the given month
      where.push(`start_month_id <= $${values.length + 1}`);
      values.push(monthId);
      where.push(
        `(end_month_id IS NULL OR end_month_id >= $${values.length + 1})`,
      );
      values.push(monthId);
    }

    if (where.length) {
      query += ` WHERE ` + where.join(" AND ");
    }

    query += ` ORDER BY created_at DESC`;

    const rows = await sql(query, values);
    return Response.json({ items: rows });
  } catch (err) {
    console.error("[recurring/list]", err);
    return Response.json(
      { error: "Failed to list recurring expenses" },
      { status: 500 },
    );
  }
}
