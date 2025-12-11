import sql from "@/app/api/utils/sql";

export async function PUT(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const isRead = searchParams.get("isRead") === "true";

    if (!id) {
      return Response.json({ error: "Missing id parameter" }, { status: 400 });
    }

    await sql("UPDATE contact_messages SET is_read = $1 WHERE id = $2", [
      isRead,
      id,
    ]);

    return Response.json({ ok: true });
  } catch (err) {
    console.error("/api/contact/mark-read error", err);
    return Response.json(
      { error: "Failed to update message" },
      { status: 500 },
    );
  }
}
