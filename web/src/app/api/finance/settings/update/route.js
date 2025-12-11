import sql from "@/app/api/utils/sql";

export async function POST(request) {
  try {
    const body = await request.json();
    // body is an object of { key: value }
    const entries = Object.entries(body || {});
    if (!entries.length)
      return Response.json({ error: "No settings provided" }, { status: 400 });

    // upsert settings
    for (const [key, value] of entries) {
      await sql`
        INSERT INTO fin_settings (key, value)
        VALUES (${key}, ${JSON.stringify({ value })}::jsonb)
        ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = NOW()
      `;
    }

    return Response.json({ ok: true });
  } catch (err) {
    console.error("/api/finance/settings/update error", err);
    return Response.json(
      { error: "Failed to update settings" },
      { status: 500 },
    );
  }
}
