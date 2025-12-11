import sql from "@/app/api/utils/sql";

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return Response.json(
        { error: "Project ID is required" },
        { status: 400 },
      );
    }

    const result = await sql`
      DELETE FROM projects
      WHERE id = ${id}
      RETURNING id
    `;

    if (result.length === 0) {
      return Response.json({ error: "Project not found" }, { status: 404 });
    }

    return Response.json({ success: true, id: result[0].id });
  } catch (error) {
    console.error("Error deleting project:", error);
    return Response.json(
      { error: "Failed to delete project" },
      { status: 500 },
    );
  }
}
