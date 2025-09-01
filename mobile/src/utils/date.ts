/** Very light validation for YYYY-MM-DD */
export function isISODate(v?: string | null) {
  if (!v) return true;
  return /^\d{4}-\d{2}-\d{2}$/.test(v);
}
export function toISODate(d: Date) {
  return d.toISOString().slice(0, 10);
}
