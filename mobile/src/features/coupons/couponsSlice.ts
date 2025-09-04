import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Coupon } from '@/types/models/Coupon';
import { apiApplyCoupon, apiRemoveCoupon, apiListMyCoupons, apiValidateCoupon } from './coupons.api';

type State = {
  status: 'idle' | 'loading' | 'error';
  applied?: Coupon | null;
  discountAmount: number;
  myCoupons: Coupon[];
  error?: string;
};

const initialState: State = {
  status: 'idle',
  applied: null,
  discountAmount: 0,
  myCoupons: [],
};

export const applyCouponThunk = createAsyncThunk('coupons/apply', async ({ code, payload }: { code: string; payload?: any }, { rejectWithValue }) => {
  try {
    const res = await apiApplyCoupon(code, payload || {});
    return res;
  } catch (e: any) {
    return rejectWithValue(e?.response?.data?.message || e.message);
  }
});

export const removeCouponThunk = createAsyncThunk('coupons/remove', async (_, { rejectWithValue }) => {
  try {
    await apiRemoveCoupon();
    return true;
  } catch (e: any) {
    return rejectWithValue(e?.response?.data?.message || e.message);
  }
});

export const fetchMyCoupons = createAsyncThunk('coupons/my', async (_, { rejectWithValue }) => {
  try {
    return await apiListMyCoupons();
  } catch (e: any) {
    return rejectWithValue(e?.response?.data?.message || e.message);
  }
});

export const validateCouponThunk = createAsyncThunk('coupons/validate', async (code: string, { rejectWithValue }) => {
  try {
    return await apiValidateCoupon(code);
  } catch (e: any) {
    return rejectWithValue(e?.response?.data?.message || e.message);
  }
});

const slice = createSlice({
  name: 'coupons',
  initialState,
  reducers: {
    clearLocal(state) { state.applied = null; state.discountAmount = 0; },
    setLocal(state, action: PayloadAction<{ coupon: Coupon; discountAmount: number }>) {
      state.applied = action.payload.coupon;
      state.discountAmount = action.payload.discountAmount;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(applyCouponThunk.pending, (s) => { s.status = 'loading'; s.error = undefined; })
      .addCase(applyCouponThunk.fulfilled, (s, a) => {
        s.status = 'idle';
        s.applied = (a.payload as any).coupon;
        s.discountAmount = (a.payload as any).discountAmount || 0;
      })
      .addCase(applyCouponThunk.rejected, (s, a) => { s.status = 'error'; s.error = String(a.payload || 'Failed to apply coupon'); })
      .addCase(removeCouponThunk.fulfilled, (s) => { s.applied = null; s.discountAmount = 0; })
      .addCase(fetchMyCoupons.fulfilled, (s, a) => { s.myCoupons = a.payload as any; });
  },
});

export const { clearLocal, setLocal } = slice.actions;
export default slice.reducer;

