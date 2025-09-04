export const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));
export const nonEmpty = (s?: string | null) => !!(s && s.trim().length);

