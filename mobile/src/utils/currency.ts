export function formatLBP(value: number): string {
  // Lebanese pounds often formatted with thousands separators
  return new Intl.NumberFormat('en-LB', { style: 'currency', currency: 'LBP', maximumFractionDigits: 0 }).format(value);
}

export function formatUSD(value: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
}

// Simple fallback conversion; in a real app, fetch rates from backend
export function convert(amount: number, from: 'LBP'|'USD', to: 'LBP'|'USD', rateLBPperUSD: number): number {
  if (from === to) return amount;
  return from === 'USD' ? amount * rateLBPperUSD : amount / rateLBPperUSD;
}

