import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { CatalogFilters, VendorFilters } from '@/types/filters/FilterTypes';

type DiscoveryState = {
  catalog: CatalogFilters;
  vendors: VendorFilters;
};

const initialState: DiscoveryState = {
  catalog: { sort: 'relevance' },
  vendors: { sort: 'rating_desc' },
};

const slice = createSlice({
  name: 'discovery',
  initialState,
  reducers: {
    setCatalogFilters(state, action: PayloadAction<Partial<CatalogFilters>>) {
      state.catalog = { ...state.catalog, ...action.payload };
    },
    resetCatalogFilters(state) {
      state.catalog = { sort: 'relevance' };
    },
    setVendorFilters(state, action: PayloadAction<Partial<VendorFilters>>) {
      state.vendors = { ...state.vendors, ...action.payload };
    },
    resetVendorFilters(state) {
      state.vendors = { sort: 'rating_desc' };
    },
  },
});

export const { setCatalogFilters, resetCatalogFilters, setVendorFilters, resetVendorFilters } = slice.actions;
export default slice.reducer;

