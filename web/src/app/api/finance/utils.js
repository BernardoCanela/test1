import sql from "@/app/api/utils/sql";

export async function getSettingValue(key, defaultValue = null) {
  const rows = await sql`SELECT value FROM fin_settings WHERE key = ${key}`;
  if (rows.length && rows[0].value && rows[0].value.value !== undefined) {
    return rows[0].value.value;
  }
  // If value is a primitive stored directly
  if (rows.length && rows[0].value !== undefined) {
    const v = rows[0].value;
    if (
      typeof v === "number" ||
      typeof v === "string" ||
      typeof v === "boolean"
    ) {
      return v;
    }
  }
  return defaultValue;
}

export async function getSettings(keysWithDefaults) {
  const entries = Object.entries(keysWithDefaults);
  const keys = entries.map(([k]) => k);
  const rows =
    await sql`SELECT key, value FROM fin_settings WHERE key = ANY(${keys})`;
  const map = {};
  for (const { key, value } of rows) {
    map[key] = value?.value !== undefined ? value.value : value;
  }
  // fill defaults
  for (const [k, def] of entries) {
    if (map[k] === undefined) map[k] = def;
  }
  return map;
}

export async function getOrCreateCurrentMonth() {
  // Try to get open month with max(year, month)
  const open =
    await sql`SELECT * FROM fin_months WHERE status = 'open' ORDER BY year DESC, month DESC LIMIT 1`;
  if (open.length) return open[0];
  // Create current calendar month
  const now = new Date();
  const year = now.getUTCFullYear();
  const month = now.getUTCMonth() + 1; // 1-12
  const created = await sql`
    INSERT INTO fin_months (year, month, status)
    VALUES (${year}, ${month}, 'open')
    RETURNING *
  `;
  return created[0];
}

export function toFixedCurrency(value) {
  const n = Number(value || 0);
  return Math.round(n * 100) / 100;
}
