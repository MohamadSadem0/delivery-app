import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { FavoritesState } from './favorites.types';

const initialState: FavoritesState = {
  productIds: [],
  vendorIds: [],
};

function toggle(list: number[], id: number) {
  const i = list.indexOf(id);
  if (i >= 0) list.splice(i, 1);
  else list.push(id);
}

const slice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleProductFav(state, action: PayloadAction<number>) {
      toggle(state.productIds, action.payload);
    },
    toggleVendorFav(state, action: PayloadAction<number>) {
      toggle(state.vendorIds, action.payload);
    },
  },
});

export const { toggleProductFav, toggleVendorFav } = slice.actions;
export default slice.reducer;
