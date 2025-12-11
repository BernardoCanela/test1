import sql from "@/app/api/utils/sql";

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return Response.json({ error: "Missing id parameter" }, { status: 400 });
    }

    await sql("DELETE FROM contact_messages WHERE id = $1", [id]);

    return Response.json({ ok: true });
  } catch (err) {
    console.error("/api/contact/delete error", err);
    return Response.json(
      { error: "Failed to delete message" },
      { status: 500 },
    );
  }
}
