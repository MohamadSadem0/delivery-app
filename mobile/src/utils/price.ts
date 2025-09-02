export function formatPrice(value: number, currency: 'LBP'|'USD' = 'LBP') {
  if (currency === 'LBP') {
    // Compact billions/millions format; Lebanon pricing often in LBP
    if (value >= 1_000_000_000) return `LBP ${(value/1_000_000_000).toFixed(1)}B`;
    if (value >= 1_000_000) return `LBP ${(value/1_000_000).toFixed(1)}M`;
    return `LBP ${Math.round(value).toLocaleString('en-LB')}`;
  }
  return `$${(value/1).toFixed(2)}`;
}
