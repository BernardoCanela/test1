import sql from "@/app/api/utils/sql";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const filterType = searchParams.get("type");
    const featuredOnly = searchParams.get("featured") === "true";

    let query;

    if (filterType && featuredOnly) {
      query = sql`
        SELECT id, title, client, type_tags, description, media_urls, featured, created_at 
        FROM projects 
        WHERE ${filterType} = ANY(type_tags) AND featured = true
        ORDER BY created_at DESC
      `;
    } else if (filterType) {
      query = sql`
        SELECT id, title, client, type_tags, description, media_urls, featured, created_at 
        FROM projects 
        WHERE ${filterType} = ANY(type_tags)
        ORDER BY created_at DESC
      `;
    } else if (featuredOnly) {
      query = sql`
        SELECT id, title, client, type_tags, description, media_urls, featured, created_at 
        FROM projects 
        WHERE featured = true
        ORDER BY created_at DESC
      `;
    } else {
      query = sql`
        SELECT id, title, client, type_tags, description, media_urls, featured, created_at 
        FROM projects 
        ORDER BY created_at DESC
      `;
    }

    const projects = await query;

    return Response.json({ projects });
  } catch (error) {
    console.error("Error fetching projects:", error);
    return Response.json(
      { error: "Failed to fetch projects" },
      { status: 500 },
    );
  }
}
