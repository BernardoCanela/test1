import sql from "@/app/api/utils/sql";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, phone, message, company, project_type, source_page } =
      body || {};

    if (!name || !email || !message) {
      return Response.json(
        { error: "Missing required fields: name, email, message" },
        { status: 400 },
      );
    }

    // Save to database first
    await sql(
      "INSERT INTO contact_messages (name, email, phone, company, project_type, message, source_page) VALUES ($1, $2, $3, $4, $5, $6, $7)",
      [
        name,
        email,
        phone || null,
        company || null,
        project_type || null,
        message,
        source_page || null,
      ],
    );

    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    const RESEND_FROM_EMAIL = process.env.RESEND_FROM_EMAIL;

    if (!RESEND_API_KEY || !RESEND_FROM_EMAIL) {
      return Response.json(
        {
          error:
            "Email service is not configured. Please set RESEND_API_KEY and RESEND_FROM_EMAIL.",
        },
        { status: 500 },
      );
    }

    const subject = `Novo pedido de contacto — ${name}`;

    const html = `
      <div style="font-family: Arial, sans-serif; color: #111;">
        <h2 style="margin-bottom: 8px;">Novo pedido de contacto</h2>
        <p style="margin: 0 0 16px 0; font-size: 14px; color: #444;">Recebeu um novo pedido enviado pelo site.</p>
        <table style="border-collapse: collapse; width: 100%;">
          <tr>
            <td style="border: 1px solid #eee; padding: 8px; font-weight: bold;">Nome</td>
            <td style="border: 1px solid #eee; padding: 8px;">${escapeHtml(name)}</td>
          </tr>
          <tr>
            <td style="border: 1px solid #eee; padding: 8px; font-weight: bold;">Email</td>
            <td style="border: 1px solid #eee; padding: 8px;"><a href="mailto:${escapeHtml(
              email,
            )}">${escapeHtml(email)}</a></td>
          </tr>
          ${
            phone
              ? `
          <tr>
            <td style="border: 1px solid #eee; padding: 8px; font-weight: bold;">Telefone</td>
            <td style="border: 1px solid #eee; padding: 8px;"><a href="tel:${escapeHtml(
              phone.replace(/\s+/g, ""),
            )}">${escapeHtml(phone)}</a></td>
          </tr>`
              : ""
          }
        </table>
        <div style="margin-top: 16px;">
          <div style="font-weight: bold; margin-bottom: 8px;">Mensagem</div>
          <div style="white-space: pre-wrap; border: 1px solid #eee; padding: 12px;">${escapeHtml(
            message,
          )}</div>
        </div>
      </div>
    `;

    const text = `Novo pedido de contacto\n\nNome: ${name}\nEmail: ${email}\n$${
      phone ? `Telefone: ${phone}\n` : ""
    }\nMensagem:\n${message}`;

    const payload = {
      from: RESEND_FROM_EMAIL,
      to: ["geral@mindframe.media"],
      cc: [email],
      subject,
      html,
      text,
    };

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errText = await res.text();
      return Response.json(
        { error: `Failed to send email: [${res.status}] ${errText}` },
        { status: 500 },
      );
    }

    const data = await res.json();

    return Response.json({ ok: true, id: data.id || null });
  } catch (err) {
    console.error("/api/contact/send error", err);
    return Response.json({ error: "Unexpected error" }, { status: 500 });
  }
}

function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
