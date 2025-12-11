import sql from "@/app/api/utils/sql";

export async function PUT(request) {
  try {
    const body = await request.json();
    const { id, title, client, type_tags, description, media_urls, featured } =
      body;

    if (!id) {
      return Response.json(
        { error: "Project ID is required" },
        { status: 400 },
      );
    }

    if (media_urls && media_urls.length === 0) {
      return Response.json(
        { error: "At least one photo is required" },
        { status: 400 },
      );
    }

    if (media_urls && media_urls.length > 10) {
      return Response.json(
        { error: "Maximum 10 photos allowed" },
        { status: 400 },
      );
    }

    if (description && description.length > 200) {
      return Response.json(
        { error: "Description must be 200 characters or less" },
        { status: 400 },
      );
    }

    // Build dynamic update query
    let setClauses = [];
    let values = [];
    let paramCount = 1;

    if (title !== undefined) {
      setClauses.push(`title = $${paramCount}`);
      values.push(title);
      paramCount++;
    }

    if (client !== undefined) {
      setClauses.push(`client = $${paramCount}`);
      values.push(client);
      paramCount++;
    }

    if (type_tags !== undefined) {
      setClauses.push(`type_tags = $${paramCount}`);
      values.push(type_tags);
      paramCount++;
    }

    if (description !== undefined) {
      setClauses.push(`description = $${paramCount}`);
      values.push(description);
      paramCount++;
    }

    if (media_urls !== undefined) {
      setClauses.push(`media_urls = $${paramCount}`);
      values.push(media_urls);
      paramCount++;
    }

    if (featured !== undefined) {
      setClauses.push(`featured = $${paramCount}`);
      values.push(featured);
      paramCount++;
    }

    if (setClauses.length === 0) {
      return Response.json({ error: "No fields to update" }, { status: 400 });
    }

    values.push(id);
    const query = `
      UPDATE projects
      SET ${setClauses.join(", ")}
      WHERE id = $${paramCount}
      RETURNING *
    `;

    const result = await sql(query, values);

    if (result.length === 0) {
      return Response.json({ error: "Project not found" }, { status: 404 });
    }

    return Response.json({ project: result[0] });
  } catch (error) {
    console.error("Error updating project:", error);
    return Response.json(
      { error: "Failed to update project" },
      { status: 500 },
    );
  }
}
