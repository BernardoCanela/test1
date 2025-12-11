import sql from "@/app/api/utils/sql";

export async function PUT(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return Response.json({ error: "Missing id" }, { status: 400 });

    const body = await request.json();
    const {
      name,
      category,
      amount_excl_vat,
      vat_applicable,
      vat_rate,
      start_month_id,
      end_month_id,
      is_active,
      notes,
    } = body || {};

    // Build dynamic update
    const sets = [];
    const vals = [];

    const push = (key, value) => {
      sets.push(`${key} = $${vals.length + 1}`);
      vals.push(value);
    };

    if (name !== undefined) push("name", name);
    if (category !== undefined) push("category", category);
    if (amount_excl_vat !== undefined) push("amount_excl_vat", amount_excl_vat);
    if (vat_applicable !== undefined) push("vat_applicable", vat_applicable);
    if (vat_rate !== undefined) push("vat_rate", vat_rate);
    if (start_month_id !== undefined) push("start_month_id", start_month_id);
    if (end_month_id !== undefined) push("end_month_id", end_month_id);
    if (is_active !== undefined) push("is_active", is_active);
    if (notes !== undefined) push("notes", notes);

    // Recompute VAT totals if amount/vat fields changed
    if (
      amount_excl_vat !== undefined ||
      vat_applicable !== undefined ||
      vat_rate !== undefined
    ) {
      const _vat_applicable =
        vat_applicable !== undefined ? vat_applicable : true;
      const _vat_rate = vat_rate !== undefined ? vat_rate : 0.23;
      const _amount = amount_excl_vat !== undefined ? amount_excl_vat : 0;
      const vat_amount = _vat_applicable
        ? Number(_amount) * Number(_vat_rate)
        : 0;
      const amount_incl_vat = Number(_amount) + vat_amount;
      push("vat_amount", vat_amount);
      push("amount_incl_vat", amount_incl_vat);
    }

    if (sets.length === 0) {
      return Response.json({ error: "No fields to update" }, { status: 400 });
    }

    vals.push(id);
    const rows = await sql(
      `UPDATE fin_expenses_recurring SET ${sets.join(", ")} WHERE id = $${vals.length} RETURNING *`,
      vals,
    );

    return Response.json({ item: rows[0] });
  } catch (err) {
    console.error("[recurring/update]", err);
    return Response.json(
      { error: "Failed to update recurring expense" },
      { status: 500 },
    );
  }
}
