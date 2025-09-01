export function formatPrice(n: number, currency: 'LBP'|'USD') {
  const v = Math.round(n);
  if (currency === 'LBP') return v.toLocaleString('en-LB') + ' LBP';
  return '$' + (v / 100).toFixed(2); // if backend uses cents for USD
}
