import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { CartItem, CartState } from './cart.types';

const initialState: CartState = {
  items: [],
  currency: 'LBP',
  deliveryFee: 0,
  coupon: null,
};

const findIndex = (items: CartItem[], productId: number) => items.findIndex(i => i.productId === productId);

const slice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const idx = findIndex(state.items, action.payload.productId);
      if (idx >= 0) {
        state.items[idx].qty += action.payload.qty;
      } else {
        state.items.push(action.payload);
      }
    },
    setQuantity(state, action: PayloadAction<{ productId: number; qty: number }>) {
      const idx = findIndex(state.items, action.payload.productId);
      if (idx >= 0) {
        state.items[idx].qty = Math.max(0, action.payload.qty);
        if (state.items[idx].qty === 0) {
          state.items.splice(idx, 1);
        }
      }
    },
    removeItem(state, action: PayloadAction<number>) {
      const idx = findIndex(state.items, action.payload);
      if (idx >= 0) state.items.splice(idx, 1);
    },
    clearCart(state) {
      state.items = [];
      state.coupon = null;
      state.deliveryFee = 0;
    },
    setCurrency(state, action: PayloadAction<string>) {
      state.currency = action.payload;
    },
    setDeliveryFee(state, action: PayloadAction<number>) {
      state.deliveryFee = Math.max(0, action.payload);
    },
    applyCoupon(state, action: PayloadAction<{ code: string; discountAmount: number }>) {
      state.coupon = action.payload;
    },
  },
});

export const {
  addItem,
  removeItem,
  setQuantity,
  clearCart,
  setCurrency,
  setDeliveryFee,
  applyCoupon,
} = slice.actions;

export default slice.reducer;
