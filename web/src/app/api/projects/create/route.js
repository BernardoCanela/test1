import sql from "@/app/api/utils/sql";

export async function POST(request) {
  try {
    const body = await request.json();
    const { title, client, type_tags, description, media_urls, featured } =
      body;

    if (!title || !media_urls || media_urls.length === 0) {
      return Response.json(
        { error: "Title and at least one photo are required" },
        { status: 400 },
      );
    }

    if (media_urls.length > 10) {
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

    const result = await sql`
      INSERT INTO projects (title, client, type_tags, description, media_urls, featured)
      VALUES (${title}, ${client || null}, ${type_tags || []}, ${description || null}, ${media_urls}, ${featured || false})
      RETURNING *
    `;

    return Response.json({ project: result[0] }, { status: 201 });
  } catch (error) {
    console.error("Error creating project:", error);
    return Response.json(
      { error: "Failed to create project" },
      { status: 500 },
    );
  }
}
