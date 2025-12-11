import sql from "@/app/api/utils/sql";

export async function PUT(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return Response.json({ error: "Missing id" }, { status: 400 });

    const body = await request.json();
    const {
      month_id,
      name,
      category,
      amount_excl_vat,
      vat_applicable,
      vat_rate,
      expense_date,
      notes,
    } = body || {};

    const sets = [];
    const vals = [];

    const push = (k, v) => {
      sets.push(`${k} = $${vals.length + 1}`);
      vals.push(v);
    };

    if (month_id !== undefined) push("month_id", month_id);
    if (name !== undefined) push("name", name);
    if (category !== undefined) push("category", category);
    if (amount_excl_vat !== undefined) push("amount_excl_vat", amount_excl_vat);
    if (vat_applicable !== undefined) push("vat_applicable", vat_applicable);
    if (vat_rate !== undefined) push("vat_rate", vat_rate);
    if (expense_date !== undefined) push("expense_date", expense_date);
    if (notes !== undefined) push("notes", notes);

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
      `UPDATE fin_expenses_onetime SET ${sets.join(", ")} WHERE id = $${vals.length} RETURNING *`,
      vals,
    );

    return Response.json({ item: rows[0] });
  } catch (err) {
    console.error("[onetime/update]", err);
    return Response.json(
      { error: "Failed to update one-time expense" },
      { status: 500 },
    );
  }
}
