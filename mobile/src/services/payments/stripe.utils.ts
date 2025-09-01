export function brandToEmoji(brand?: string) {
  switch ((brand || '').toLowerCase()) {
    case 'visa': return '💳';
    case 'mastercard': return '🟠';
    case 'amex': return '🔷';
    default: return '💳';
  }
}
