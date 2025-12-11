import sql from "@/app/api/utils/sql";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const year = searchParams.get("year");
    const rows = await sql(
      year
        ? `SELECT * FROM fin_vat_payments WHERE year = $1 ORDER BY payment_date DESC NULLS LAST, created_at DESC`
        : `SELECT * FROM fin_vat_payments ORDER BY payment_date DESC NULLS LAST, created_at DESC`,
      year ? [year] : [],
    );
    return Response.json({ items: rows });
  } catch (err) {
    console.error("[vat/payments/list]", err);
    return Response.json(
      { error: "Failed to list VAT payments" },
      { status: 500 },
    );
  }
}
