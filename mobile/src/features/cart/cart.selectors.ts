import type { RootState } from '@/store';
import { subtotal as calcSub, total as calcTotal } from './cart.utils';

export const selectCart = (s: RootState) => s.cart;
export const selectCartItems = (s: RootState) => s.cart.items;
export const selectCartCount = (s: RootState) => s.cart.items.reduce((n, it) => n + it.qty, 0);
export const selectCartSubtotal = (s: RootState) => calcSub(s.cart.items);
export const selectCartDeliveryFee = (s: RootState) => s.cart.deliveryFee;
export const selectCartDiscount = (s: RootState) => s.cart.coupon?.discountAmount ?? 0;
export const selectCartTotal = (s: RootState) => calcTotal(s.cart.items, s.cart.deliveryFee, s.cart.coupon?.discountAmount ?? 0);
