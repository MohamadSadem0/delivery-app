import type { CartItem } from './cart.types';

export function subtotal(items: CartItem[]) {
  return items.reduce((sum, it) => sum + it.unitPrice * it.qty, 0);
}

export function total(items: CartItem[], deliveryFee: number, discount = 0) {
  return Math.max(0, subtotal(items) + deliveryFee - discount);
}
