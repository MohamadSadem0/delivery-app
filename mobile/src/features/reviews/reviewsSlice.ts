import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Review } from '@/types/models/Review';
import type { RatingSummary } from './reviews.types';
import { apiListVendorReviews, apiSubmitOrderReview } from './reviews.api';

type VendorBucket = { list: Review[]; summary: RatingSummary | null; status: 'idle' | 'loading' | 'error'; error?: string };
type State = {
  byVendor: Record<number, VendorBucket>;
  submitting: boolean;
  submitError?: string | null;
};

const initialVendorBucket: VendorBucket = { list: [], summary: null, status: 'idle' };
const initialState: State = { byVendor: {}, submitting: false };

export const fetchVendorReviews = createAsyncThunk('reviews/fetchVendor', async (vendorId: number, { rejectWithValue }) => {
  try { return { vendorId, ...(await apiListVendorReviews(vendorId)) }; }
  catch (e: any) { return rejectWithValue({ vendorId, message: e?.response?.data?.message || e.message }); }
});

export const submitOrderReview = createAsyncThunk('reviews/submit', async (args: { orderId: number; vendorId: number; rating: number; comment?: string }, { rejectWithValue }) => {
  const { orderId, vendorId, rating, comment } = args;
  try {
    const res = await apiSubmitOrderReview(orderId, { rating, comment });
    return { vendorId, review: res.review };
  } catch (e: any) {
    return rejectWithValue(e?.response?.data?.message || e.message);
  }
});

const slice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    upsertReview(state, action: PayloadAction<{ vendorId: number; review: Review }>) {
      const { vendorId, review } = action.payload;
      const bucket = state.byVendor[vendorId] || (state.byVendor[vendorId] = { ...initialVendorBucket });
      const idx = bucket.list.findIndex(r => r.id === review.id);
      if (idx >= 0) bucket.list[idx] = review;
      else bucket.list.unshift(review);
      // naive summary update
      if (bucket.summary) {
        bucket.summary.total += 1;
        bucket.summary.counts[review.rating as 1|2|3|4|5] = (bucket.summary.counts[review.rating as 1|2|3|4|5] || 0) + 1;
        const sum = (1*bucket.summary.counts[1]) + (2*bucket.summary.counts[2]) + (3*bucket.summary.counts[3]) + (4*bucket.summary.counts[4]) + (5*bucket.summary.counts[5]);
        bucket.summary.avg = sum / bucket.summary.total;
      }
    },
  },
  extraReducers: b => {
    b.addCase(fetchVendorReviews.pending, (s, a) => {
      const vendorId = a.meta.arg as number;
      s.byVendor[vendorId] = s.byVendor[vendorId] || { ...initialVendorBucket };
      s.byVendor[vendorId].status = 'loading';
      s.byVendor[vendorId].error = undefined;
    });
    b.addCase(fetchVendorReviews.fulfilled, (s, a) => {
      const { vendorId, data, summary } = a.payload as any;
      s.byVendor[vendorId] = { list: data, summary, status: 'idle' };
    });
    b.addCase(fetchVendorReviews.rejected, (s, a) => {
      const { vendorId, message } = (a.payload as any) || {};
      if (vendorId != null) {
        s.byVendor[vendorId] = s.byVendor[vendorId] || { ...initialVendorBucket };
        s.byVendor[vendorId].status = 'error';
        s.byVendor[vendorId].error = message || 'Failed to load reviews';
      }
    });
    b.addCase(submitOrderReview.pending, (s) => { s.submitting = true; s.submitError = null; });
    b.addCase(submitOrderReview.fulfilled, (s, a) => {
      s.submitting = false;
      const { vendorId, review } = a.payload as any;
      const bucket = s.byVendor[vendorId] || (s.byVendor[vendorId] = { ...initialVendorBucket });
      bucket.list.unshift(review);
    });
    b.addCase(submitOrderReview.rejected, (s, a) => { s.submitting = false; s.submitError = String(a.payload || 'Failed to submit'); });
  },
});

export const { upsertReview } = slice.actions;
export default slice.reducer;
