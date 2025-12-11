import sql from "@/app/api/utils/sql";

export async function GET() {
  try {
    const rows =
      await sql`SELECT key, value, description, category FROM fin_settings ORDER BY key`;
    return Response.json({ settings: rows });
  } catch (err) {
    console.error("/api/finance/settings/get error", err);
    return Response.json({ error: "Failed to load settings" }, { status: 500 });
  }
}
