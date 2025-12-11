import sql from "@/app/api/utils/sql";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, phone, company, project_type, message, source_page } =
      body;

    // Validate required fields
    if (!name || !email) {
      return Response.json(
        { error: "Name and email are required" },
        { status: 400 },
      );
    }

    // Insert lead into database
    const result = await sql`
      INSERT INTO leads (name, email, phone, company, project_type, message, source_page)
      VALUES (${name}, ${email}, ${phone || null}, ${company || null}, ${project_type || null}, ${message || null}, ${source_page || null})
      RETURNING *
    `;

    return Response.json({ success: true, lead: result[0] });
  } catch (error) {
    console.error("Error creating lead:", error);
    return Response.json({ error: "Failed to submit form" }, { status: 500 });
  }
}
