import sql from "@/app/api/utils/sql";

export async function GET() {
  try {
    const rows =
      await sql`SELECT * FROM fin_months ORDER BY year DESC, month DESC`;
    return Response.json({ months: rows });
  } catch (err) {
    console.error("/api/finance/months/list error", err);
    return Response.json({ error: "Failed to list months" }, { status: 500 });
  }
}
