import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Coupon, PromoApplication } from '@/types/models/Promo';
import { apiApplyPromo, apiListGlobalCoupons, apiListVendorCoupons, apiRemovePromo } from './promos.api';

type State = {
  global: { items: Coupon[]; status: 'idle'|'loading'|'error'; error?: string | null };
  byVendor: Record<number, { items: Coupon[]; status: 'idle'|'loading'|'error'; error?: string | null }>;
  applying: boolean;
  applyError?: string | null;
  applied?: PromoApplication | null;
};

const initialState: State = {
  global: { items: [], status: 'idle' },
  byVendor: {},
  applying: false,
  applied: null,
};

export const fetchGlobalCoupons = createAsyncThunk('promos/global', async (_, { rejectWithValue }) => {
  try { return (await apiListGlobalCoupons()).data; }
  catch (e: any) { return rejectWithValue(e?.response?.data?.message || e.message); }
});

export const fetchVendorCoupons = createAsyncThunk('promos/vendor', async (vendorId: number, { rejectWithValue }) => {
  try { return { vendorId, data: (await apiListVendorCoupons(vendorId)).data }; }
  catch (e: any) { return rejectWithValue({ vendorId, message: e?.response?.data?.message || e.message }); }
});

export const applyPromoThunk = createAsyncThunk('promos/apply', async (payload: { code: string; vendorId?: number; cartTotal: number; deliveryFee?: number; currency: string }, { rejectWithValue }) => {
  try { return await apiApplyPromo(payload); }
  catch (e: any) { return rejectWithValue(e?.response?.data?.message || e.message); }
});

export const removePromoThunk = createAsyncThunk('promos/remove', async (code: string, { rejectWithValue }) => {
  try { return (await apiRemovePromo(code)); }
  catch (e: any) { return rejectWithValue(e?.response?.data?.message || e.message); }
});

const slice = createSlice({
  name: 'promos',
  initialState,
  reducers: {
    clearApplied(state) { state.applied = null; state.applyError = null; },
    setApplied(state, a: PayloadAction<PromoApplication | null>) { state.applied = a.payload; },
  },
  extraReducers: b => {
    b.addCase(fetchGlobalCoupons.pending, (s) => { s.global.status = 'loading'; s.global.error = null; });
    b.addCase(fetchGlobalCoupons.fulfilled, (s, a) => { s.global.status = 'idle'; s.global.items = a.payload as Coupon[]; });
    b.addCase(fetchGlobalCoupons.rejected, (s, a) => { s.global.status = 'error'; s.global.error = String(a.payload || 'Failed to load'); });

    b.addCase(fetchVendorCoupons.pending, (s, a) => {
      const id = a.meta.arg as number;
      s.byVendor[id] = s.byVendor[id] || { items: [], status: 'idle' };
      s.byVendor[id].status = 'loading'; s.byVendor[id].error = null;
    });
    b.addCase(fetchVendorCoupons.fulfilled, (s, a) => {
      const { vendorId, data } = a.payload as any;
      s.byVendor[vendorId] = { items: data, status: 'idle' };
    });
    b.addCase(fetchVendorCoupons.rejected, (s, a) => {
      const { vendorId, message } = (a.payload as any) || {};
      if (vendorId != null) {
        s.byVendor[vendorId] = s.byVendor[vendorId] || { items: [], status: 'idle' };
        s.byVendor[vendorId].status = 'error'; s.byVendor[vendorId].error = message || 'Failed to load';
      }
    });

    b.addCase(applyPromoThunk.pending, (s) => { s.applying = true; s.applyError = null; });
    b.addCase(applyPromoThunk.fulfilled, (s, a) => { s.applying = false; s.applied = (a.payload as any).promo as PromoApplication; });
    b.addCase(applyPromoThunk.rejected, (s, a) => { s.applying = false; s.applyError = String(a.payload || 'Failed to apply'); });

    b.addCase(removePromoThunk.fulfilled, (s) => { s.applied = null; });
  },
});

export const { clearApplied, setApplied } = slice.actions;
export default slice.reducer;
