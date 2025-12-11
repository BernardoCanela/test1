import sql from "@/app/api/utils/sql";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const unreadOnly = searchParams.get("unread") === "true";

    let query = "SELECT * FROM contact_messages";
    const params = [];

    if (unreadOnly) {
      query += " WHERE is_read = $1";
      params.push(false);
    }

    query += " ORDER BY created_at DESC";

    const messages = await sql(query, params);

    return Response.json({ messages });
  } catch (err) {
    console.error("/api/contact/list error", err);
    return Response.json(
      { error: "Failed to fetch messages" },
      { status: 500 },
    );
  }
}
