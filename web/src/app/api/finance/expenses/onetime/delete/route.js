import sql from "@/app/api/utils/sql";

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return Response.json({ error: "Missing id" }, { status: 400 });

    await sql(`DELETE FROM fin_expenses_onetime WHERE id = $1`, [id]);
    return Response.json({ ok: true });
  } catch (err) {
    console.error("[onetime/delete]", err);
    return Response.json(
      { error: "Failed to delete one-time expense" },
      { status: 500 },
    );
  }
}
