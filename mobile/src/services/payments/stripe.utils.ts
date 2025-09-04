export function brandToEmoji(brand?: string) {
  switch ((brand || '').toLowerCase()) {
    case 'visa': return 'ðŸ’³';
    case 'mastercard': return 'ðŸŸ ';
    case 'amex': return 'ðŸ”·';
    default: return 'ðŸ’³';
  }
}

