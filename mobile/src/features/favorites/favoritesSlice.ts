import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { FavoriteProduct, FavoriteVendor } from '@/types/models/Favorite';
import { apiAddFavProduct, apiAddFavVendor, apiListFavProducts, apiListFavVendors, apiRemoveFavProduct, apiRemoveFavVendor } from './favorites.api';

type State = {
  products: { items: FavoriteProduct[]; status: 'idle'|'loading'|'error'; error?: string | null };
  vendors: { items: FavoriteVendor[]; status: 'idle'|'loading'|'error'; error?: string | null };
  acting: boolean;
  actionError?: string | null;
};

const initialState: State = {
  products: { items: [], status: 'idle' },
  vendors: { items: [], status: 'idle' },
  acting: false,
};

export const fetchFavProducts = createAsyncThunk('favorites/fetchProducts', async (_, { rejectWithValue }) => {
  try { return (await apiListFavProducts()).data; }
  catch (e: any) { return rejectWithValue(e?.response?.data?.message || e.message); }
});

export const fetchFavVendors = createAsyncThunk('favorites/fetchVendors', async (_, { rejectWithValue }) => {
  try { return (await apiListFavVendors()).data; }
  catch (e: any) { return rejectWithValue(e?.response?.data?.message || e.message); }
});

export const toggleFavProduct = createAsyncThunk('favorites/toggleProduct', async (args: { productId: number; isFav: boolean; favId?: number }, { rejectWithValue }) => {
  try {
    if (args.isFav) { await apiRemoveFavProduct(args.favId || args.productId); return { removed: true, productId: args.productId }; }
    const r = await apiAddFavProduct(args.productId); return { added: true, productId: args.productId, id: r.id };
  } catch (e: any) { return rejectWithValue(e?.response?.data?.message || e.message); }
});

export const toggleFavVendor = createAsyncThunk('favorites/toggleVendor', async (args: { vendorId: number; isFav: boolean; favId?: number }, { rejectWithValue }) => {
  try {
    if (args.isFav) { await apiRemoveFavVendor(args.favId || args.vendorId); return { removed: true, vendorId: args.vendorId }; }
    const r = await apiAddFavVendor(args.vendorId); return { added: true, vendorId: args.vendorId, id: r.id };
  } catch (e: any) { return rejectWithValue(e?.response?.data?.message || e.message); }
});

const slice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    upsertFavProduct(state, a: PayloadAction<FavoriteProduct>) {
      const x = a.payload; const i = state.products.items.findIndex(p => p.productId === x.productId);
      if (i >= 0) state.products.items[i] = { ...state.products.items[i], ...x }; else state.products.items.unshift(x);
    },
    removeFavProductLocal(state, a: PayloadAction<number>) {
      state.products.items = state.products.items.filter(p => p.productId !== a.payload);
    },
    upsertFavVendor(state, a: PayloadAction<FavoriteVendor>) {
      const x = a.payload; const i = state.vendors.items.findIndex(v => v.vendorId === x.vendorId);
      if (i >= 0) state.vendors.items[i] = { ...state.vendors.items[i], ...x }; else state.vendors.items.unshift(x);
    },
    removeFavVendorLocal(state, a: PayloadAction<number>) {
      state.vendors.items = state.vendors.items.filter(v => v.vendorId !== a.payload);
    },
  },
  extraReducers: b => {
    b.addCase(fetchFavProducts.pending, (s) => { s.products.status = 'loading'; s.products.error = null; });
    b.addCase(fetchFavProducts.fulfilled, (s, a) => { s.products.status = 'idle'; s.products.items = a.payload as FavoriteProduct[]; });
    b.addCase(fetchFavProducts.rejected, (s, a) => { s.products.status = 'error'; s.products.error = String(a.payload || 'Failed'); });

    b.addCase(fetchFavVendors.pending, (s) => { s.vendors.status = 'loading'; s.vendors.error = null; });
    b.addCase(fetchFavVendors.fulfilled, (s, a) => { s.vendors.status = 'idle'; s.vendors.items = a.payload as FavoriteVendor[]; });
    b.addCase(fetchFavVendors.rejected, (s, a) => { s.vendors.status = 'error'; s.vendors.error = String(a.payload || 'Failed'); });

    b.addCase(toggleFavProduct.pending, (s) => { s.acting = true; s.actionError = null; });
    b.addCase(toggleFavProduct.fulfilled, (s, a) => { s.acting = false; const { added, removed, productId } = a.payload as any;
      if (removed) s.products.items = s.products.items.filter(p => p.productId !== productId);
    });
    b.addCase(toggleFavProduct.rejected, (s, a) => { s.acting = false; s.actionError = String(a.payload || 'Failed'); });

    b.addCase(toggleFavVendor.pending, (s) => { s.acting = true; s.actionError = null; });
    b.addCase(toggleFavVendor.fulfilled, (s, a) => { s.acting = false; const { removed, vendorId } = a.payload as any;
      if (removed) s.vendors.items = s.vendors.items.filter(v => v.vendorId !== vendorId);
    });
    b.addCase(toggleFavVendor.rejected, (s, a) => { s.acting = false; s.actionError = String(a.payload || 'Failed'); });
  },
});

export const { upsertFavProduct, removeFavProductLocal, upsertFavVendor, removeFavVendorLocal } = slice.actions;
export default slice.reducer;
