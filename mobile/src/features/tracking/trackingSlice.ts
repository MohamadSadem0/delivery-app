import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { OrderTrackingSnapshot } from '@/types/models/Tracking';
import { apiGetRoute, apiGetTracking } from './tracking.api';

type Bucket = {
  snapshot: OrderTrackingSnapshot | null;
  status: 'idle' | 'loading' | 'error';
  error?: string | null;
};

type State = { byOrder: Record<number, Bucket> };

const initialBucket: Bucket = { snapshot: null, status: 'idle' };
const initialState: State = { byOrder: {} };

export const fetchTracking = createAsyncThunk('tracking/fetch', async (orderId: number, { rejectWithValue }) => {
  try { const r = await apiGetTracking(orderId); return r.data; }
  catch (e: any) { return rejectWithValue(e?.response?.data?.message || e.message); }
});

export const fetchRoute = createAsyncThunk('tracking/route', async (orderId: number, { rejectWithValue }) => {
  try { const r = await apiGetRoute(orderId); return { orderId, route: r.route }; }
  catch (e: any) { return rejectWithValue(e?.response?.data?.message || e.message); }
});

const slice = createSlice({
  name: 'tracking',
  initialState,
  reducers: {},
  extraReducers: (b) => {
    b.addCase(fetchTracking.pending, (s, a) => {
      const orderId = a.meta.arg as number;
      s.byOrder[orderId] = s.byOrder[orderId] || { ...initialBucket };
      s.byOrder[orderId].status = 'loading';
      s.byOrder[orderId].error = null;
    });
    b.addCase(fetchTracking.fulfilled, (s, a) => {
      const snap = a.payload as OrderTrackingSnapshot;
      s.byOrder[snap.orderId] = s.byOrder[snap.orderId] || { ...initialBucket };
      s.byOrder[snap.orderId].snapshot = snap;
      s.byOrder[snap.orderId].status = 'idle';
    });
    b.addCase(fetchTracking.rejected, (s, a) => {
      const orderId = a.meta.arg as number;
      s.byOrder[orderId] = s.byOrder[orderId] || { ...initialBucket };
      s.byOrder[orderId].status = 'error';
      s.byOrder[orderId].error = String(a.payload || 'Failed to load tracking');
    });

    b.addCase(fetchRoute.fulfilled, (s, a) => {
      const { orderId, route } = a.payload as any;
      const bucket = s.byOrder[orderId] || (s.byOrder[orderId] = { ...initialBucket });
      if (bucket.snapshot) bucket.snapshot.route = route;
      else bucket.snapshot = { orderId, vendor: { latitude: 0, longitude: 0 }, customer: { latitude: 0, longitude: 0 }, route, updatedAt: new Date().toISOString(), status: 'unknown' } as any;
    });
  },
});

export default slice.reducer;
