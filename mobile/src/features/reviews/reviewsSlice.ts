import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { Review, ReviewSummary } from '@/types/models/Review';
import { apiListProductReviews, apiGetProductSummary, apiCreateProductReview, apiUpdateProductReview, apiDeleteProductReview } from './productReviews.api';
import { apiListVendorReviews, apiGetVendorSummary, apiCreateVendorReview, apiUpdateVendorReview, apiDeleteVendorReview } from './vendorReviews.api';

type ListBucket = { items: Review[]; page: number; status: 'idle'|'loading'|'error'; error?: string | null; total?: number };
type SummaryBucket = { data: ReviewSummary | null; status: 'idle'|'loading'|'error'; error?: string | null };

type State = {
  product: Record<number, { list: ListBucket; summary: SummaryBucket }>;
  vendor: Record<number, { list: ListBucket; summary: SummaryBucket }>;
  acting: boolean;
  actionError?: string | null;
};

const emptyList: ListBucket = { items: [], page: 1, status: 'idle', total: 0 };
const emptySummary: SummaryBucket = { data: null, status: 'idle' };
const initialState: State = { product: {}, vendor: {}, acting: false };

// Product thunks
export const fetchProductReviews = createAsyncThunk('reviews/product/list', async ({ productId, page = 1 }: { productId: number; page?: number }, { rejectWithValue }) => {
  try { const r = await apiListProductReviews(productId, page); return { productId, ...r, page }; }
  catch (e: any) { return rejectWithValue({ productId, message: e?.response?.data?.message || e.message }); }
});
export const fetchProductSummary = createAsyncThunk('reviews/product/summary', async (productId: number, { rejectWithValue }) => {
  try { const r = await apiGetProductSummary(productId); return { productId, ...r }; }
  catch (e: any) { return rejectWithValue({ productId, message: e?.response?.data?.message || e.message }); }
});
export const createProductReview = createAsyncThunk('reviews/product/create', async (args: { productId: number; payload: any }, { rejectWithValue }) => {
  try { const r = await apiCreateProductReview(args.productId, args.payload); return { productId: args.productId, review: r.data }; }
  catch (e: any) { return rejectWithValue(e?.response?.data?.message || e.message); }
});
export const updateProductReview = createAsyncThunk('reviews/product/update', async (args: { reviewId: number; payload: any }, { rejectWithValue }) => {
  try { const r = await apiUpdateProductReview(args.reviewId, args.payload); return r.data; }
  catch (e: any) { return rejectWithValue(e?.response?.data?.message || e.message); }
});
export const deleteProductReview = createAsyncThunk('reviews/product/delete', async (reviewId: number, { rejectWithValue }) => {
  try { await apiDeleteProductReview(reviewId); return reviewId; }
  catch (e: any) { return rejectWithValue(e?.response?.data?.message || e.message); }
});

// Vendor thunks
export const fetchVendorReviews = createAsyncThunk('reviews/vendor/list', async ({ vendorId, page = 1 }: { vendorId: number; page?: number }, { rejectWithValue }) => {
  try { const r = await apiListVendorReviews(vendorId, page); return { vendorId, ...r, page }; }
  catch (e: any) { return rejectWithValue({ vendorId, message: e?.response?.data?.message || e.message }); }
});
export const fetchVendorSummary = createAsyncThunk('reviews/vendor/summary', async (vendorId: number, { rejectWithValue }) => {
  try { const r = await apiGetVendorSummary(vendorId); return { vendorId, ...r }; }
  catch (e: any) { return rejectWithValue({ vendorId, message: e?.response?.data?.message || e.message }); }
});
export const createVendorReview = createAsyncThunk('reviews/vendor/create', async (args: { vendorId: number; payload: any }, { rejectWithValue }) => {
  try { const r = await apiCreateVendorReview(args.vendorId, args.payload); return { vendorId: args.vendorId, review: r.data }; }
  catch (e: any) { return rejectWithValue(e?.response?.data?.message || e.message); }
});
export const updateVendorReview = createAsyncThunk('reviews/vendor/update', async (args: { reviewId: number; payload: any }, { rejectWithValue }) => {
  try { const r = await apiUpdateVendorReview(args.reviewId, args.payload); return r.data; }
  catch (e: any) { return rejectWithValue(e?.response?.data?.message || e.message); }
});
export const deleteVendorReview = createAsyncThunk('reviews/vendor/delete', async (reviewId: number, { rejectWithValue }) => {
  try { await apiDeleteVendorReview(reviewId); return reviewId; }
  catch (e: any) { return rejectWithValue(e?.response?.data?.message || e.message); }
});

const slice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {},
  extraReducers: (b) => {
    // Product lists
    b.addCase(fetchProductReviews.pending, (s, a) => {
      const productId = (a.meta.arg as any).productId;
      s.product[productId] = s.product[productId] || { list: { ...emptyList }, summary: { ...emptySummary } };
      s.product[productId].list.status = 'loading';
    });
    b.addCase(fetchProductReviews.fulfilled, (s, a) => {
      const { productId, data, page, total } = a.payload as any;
      const bucket = s.product[productId] = s.product[productId] || { list: { ...emptyList }, summary: { ...emptySummary } };
      bucket.list.status = 'idle'; bucket.list.page = page; bucket.list.total = total ?? data.length;
      bucket.list.items = page > 1 ? [...bucket.list.items, ...data] : data;
    });
    b.addCase(fetchProductReviews.rejected, (s, a) => {
      const productId = (a.payload as any)?.productId;
      const bucket = s.product[productId] = s.product[productId] || { list: { ...emptyList }, summary: { ...emptySummary } };
      bucket.list.status = 'error'; bucket.list.error = (a.payload as any)?.message || 'Failed';
    });

    // Product summary
    b.addCase(fetchProductSummary.pending, (s, a) => {
      const productId = a.meta.arg as number;
      s.product[productId] = s.product[productId] || { list: { ...emptyList }, summary: { ...emptySummary } };
      s.product[productId].summary.status = 'loading';
    });
    b.addCase(fetchProductSummary.fulfilled, (s, a) => {
      const { productId, data } = a.payload as any;
      const bucket = s.product[productId] = s.product[productId] || { list: { ...emptyList }, summary: { ...emptySummary } };
      bucket.summary.status = 'idle'; bucket.summary.data = data as ReviewSummary;
    });
    b.addCase(fetchProductSummary.rejected, (s, a) => {
      const productId = (a.payload as any)?.productId;
      const bucket = s.product[productId] = s.product[productId] || { list: { ...emptyList }, summary: { ...emptySummary } };
      bucket.summary.status = 'error'; bucket.summary.error = (a.payload as any)?.message || 'Failed';
    });

    // Vendor lists
    b.addCase(fetchVendorReviews.pending, (s, a) => {
      const vendorId = (a.meta.arg as any).vendorId;
      s.vendor[vendorId] = s.vendor[vendorId] || { list: { ...emptyList }, summary: { ...emptySummary } };
      s.vendor[vendorId].list.status = 'loading';
    });
    b.addCase(fetchVendorReviews.fulfilled, (s, a) => {
      const { vendorId, data, page, total } = a.payload as any;
      const bucket = s.vendor[vendorId] = s.vendor[vendorId] || { list: { ...emptyList }, summary: { ...emptySummary } };
      bucket.list.status = 'idle'; bucket.list.page = page; bucket.list.total = total ?? data.length;
      bucket.list.items = page > 1 ? [...bucket.list.items, ...data] : data;
    });
    b.addCase(fetchVendorReviews.rejected, (s, a) => {
      const vendorId = (a.payload as any)?.vendorId;
      const bucket = s.vendor[vendorId] = s.vendor[vendorId] || { list: { ...emptyList }, summary: { ...emptySummary } };
      bucket.list.status = 'error'; bucket.list.error = (a.payload as any)?.message || 'Failed';
    });

    // Vendor summary
    b.addCase(fetchVendorSummary.pending, (s, a) => {
      const vendorId = a.meta.arg as number;
      s.vendor[vendorId] = s.vendor[vendorId] || { list: { ...emptyList }, summary: { ...emptySummary } };
      s.vendor[vendorId].summary.status = 'loading';
    });
    b.addCase(fetchVendorSummary.fulfilled, (s, a) => {
      const { vendorId, data } = a.payload as any;
      const bucket = s.vendor[vendorId] = s.vendor[vendorId] || { list: { ...emptyList }, summary: { ...emptySummary } };
      bucket.summary.status = 'idle'; bucket.summary.data = data as ReviewSummary;
    });
    b.addCase(fetchVendorSummary.rejected, (s, a) => {
      const vendorId = (a.payload as any)?.vendorId;
      const bucket = s.vendor[vendorId] = s.vendor[vendorId] || { list: { ...emptyList }, summary: { ...emptySummary } };
      bucket.summary.status = 'error'; bucket.summary.error = (a.payload as any)?.message || 'Failed';
    });

    // Create / update / delete
    b.addCase(createProductReview.fulfilled, (s, a) => {
      const { productId, review } = a.payload as any;
      const bucket = s.product[productId]; if (bucket) { bucket.list.items.unshift(review); }
    });
    b.addCase(updateProductReview.fulfilled, (s, a) => {
      const upd = a.payload as Review;
      if (upd.target.type === 'product') {
        const bucket = s.product[upd.target.id]; if (bucket) {
          const i = bucket.list.items.findIndex(x => x.id === upd.id); if (i >= 0) bucket.list.items[i] = upd;
        }
      }
    });
    b.addCase(deleteProductReview.fulfilled, (s, a) => {
      const id = a.payload as number;
      Object.values(s.product).forEach(b => b.list.items = b.list.items.filter(x => x.id != id));
    });

    b.addCase(createVendorReview.fulfilled, (s, a) => {
      const { vendorId, review } = a.payload as any;
      const bucket = s.vendor[vendorId]; if (bucket) { bucket.list.items.unshift(review); }
    });
    b.addCase(updateVendorReview.fulfilled, (s, a) => {
      const upd = a.payload as Review;
      if (upd.target.type === 'vendor') {
        const bucket = s.vendor[upd.target.id]; if (bucket) {
          const i = bucket.list.items.findIndex(x => x.id === upd.id); if (i >= 0) bucket.list.items[i] = upd;
        }
      }
    });
    b.addCase(deleteVendorReview.fulfilled, (s, a) => {
      const id = a.payload as number;
      Object.values(s.vendor).forEach(b => b.list.items = b.list.items.filter(x => x.id != id));
    });
  }
});

export default slice.reducer;
