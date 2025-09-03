// Naive Lebanon phone normalization
export function normalizeLBPhone(input: string): string {
  let s = input.replace(/\D+/g, '');
  if (s.startsWith('961')) s = s.slice(3);
  if (s.startsWith('0')) s = s.slice(1);
  return `+961${s}`;
}

export function isValidLBPhone(input: string): boolean {
  const s = normalizeLBPhone(input).replace(/\D+/g, '');
  // Lebanon mobile numbers usually +961 3/70/71/76/78/79 + 6 digits => total length 11 or 12 including country code
  return /^961(3|70|71|76|78|79)\d{6}$/.test(s);
}
