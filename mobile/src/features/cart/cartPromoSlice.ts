import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { PromoApplication } from '@/types/models/Promo';

type State = { promo: PromoApplication | null };
const initialState: State = { promo: null };

const slice = createSlice({
  name: 'cartPromo',
  initialState,
  reducers: {
    setCartPromo(state, a: PayloadAction<PromoApplication | null>) { state.promo = a.payload; },
    clearCartPromo(state) { state.promo = null; },
  },
});

export const { setCartPromo, clearCartPromo } = slice.actions;
export default slice.reducer;
