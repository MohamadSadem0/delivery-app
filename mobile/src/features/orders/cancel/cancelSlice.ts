import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { CancelReason, CancellationRequest } from '@/types/models/OrderCancel';
import { apiCancelOrder, apiGetCancelReasons, apiGetCancellation } from './cancel.api';

type Bucket = {
  reasons: { items: CancelReason[]; status: 'idle'|'loading'|'error'; error?: string | null };
  request: { data: CancellationRequest | null; status: 'idle'|'loading'|'error'; error?: string | null };
  acting: boolean;
  actionError?: string | null;
};

type State = { byOrder: Record<number, Bucket> };

const emptyBucket: Bucket = { reasons: { items: [], status: 'idle' }, request: { data: null, status: 'idle' }, acting: false };
const initialState: State = { byOrder: {} };

export const fetchCancelReasons = createAsyncThunk('cancel/reasons', async (orderId: number, { rejectWithValue }) => {
  try { return { orderId, data: (await apiGetCancelReasons(orderId)).data }; }
  catch (e: any) { return rejectWithValue({ orderId, message: e?.response?.data?.message || e.message }); }
});

export const submitCancellation = createAsyncThunk('cancel/submit', async (args: { orderId: number; reasonCode: string; note?: string }, { rejectWithValue }) => {
  try { const r = await apiCancelOrder(args.orderId, { reasonCode: args.reasonCode, note: args.note }); return { orderId: args.orderId, data: r.cancellation }; }
  catch (e: any) { return rejectWithValue({ orderId: args.orderId, message: e?.response?.data?.message || e.message }); }
});

export const fetchCancellation = createAsyncThunk('cancel/detail', async (orderId: number, { rejectWithValue }) => {
  try { const r = await apiGetCancellation(orderId); return { orderId, data: r.data }; }
  catch (e: any) { return rejectWithValue({ orderId, message: e?.response?.data?.message || e.message }); }
});

const slice = createSlice({
  name: 'cancellation',
  initialState,
  reducers: {},
  extraReducers: b => {
    b.addCase(fetchCancelReasons.pending, (s, a) => {
      const id = a.meta.arg as number;
      s.byOrder[id] = s.byOrder[id] || JSON.parse(JSON.stringify(emptyBucket));
      s.byOrder[id].reasons.status = 'loading'; s.byOrder[id].reasons.error = null;
    });
    b.addCase(fetchCancelReasons.fulfilled, (s, a) => {
      const { orderId, data } = a.payload as any;
      s.byOrder[orderId] = s.byOrder[orderId] || JSON.parse(JSON.stringify(emptyBucket));
      s.byOrder[orderId].reasons.items = data; s.byOrder[orderId].reasons.status = 'idle';
    });
    b.addCase(fetchCancelReasons.rejected, (s, a) => {
      const { orderId, message } = (a.payload as any) || {};
      s.byOrder[orderId] = s.byOrder[orderId] || JSON.parse(JSON.stringify(emptyBucket));
      s.byOrder[orderId].reasons.status = 'error'; s.byOrder[orderId].reasons.error = message || 'Failed';
    });

    b.addCase(submitCancellation.pending, (s, a) => {
      const id = (a.meta.arg as any).orderId;
      s.byOrder[id] = s.byOrder[id] || JSON.parse(JSON.stringify(emptyBucket));
      s.byOrder[id].acting = true; s.byOrder[id].actionError = null;
    });
    b.addCase(submitCancellation.fulfilled, (s, a) => {
      const { orderId, data } = a.payload as any;
      s.byOrder[orderId] = s.byOrder[orderId] || JSON.parse(JSON.stringify(emptyBucket));
      s.byOrder[orderId].acting = false; s.byOrder[orderId].request.data = data;
    });
    b.addCase(submitCancellation.rejected, (s, a) => {
      const { orderId, message } = (a.payload as any) || {};
      s.byOrder[orderId] = s.byOrder[orderId] || JSON.parse(JSON.stringify(emptyBucket));
      s.byOrder[orderId].acting = false; s.byOrder[orderId].actionError = message || 'Failed';
    });

    b.addCase(fetchCancellation.pending, (s, a) => {
      const id = a.meta.arg as number;
      s.byOrder[id] = s.byOrder[id] || JSON.parse(JSON.stringify(emptyBucket));
      s.byOrder[id].request.status = 'loading'; s.byOrder[id].request.error = null;
    });
    b.addCase(fetchCancellation.fulfilled, (s, a) => {
      const { orderId, data } = a.payload as any;
      s.byOrder[orderId] = s.byOrder[orderId] || JSON.parse(JSON.stringify(emptyBucket));
      s.byOrder[orderId].request.data = data; s.byOrder[orderId].request.status = 'idle';
    });
    b.addCase(fetchCancellation.rejected, (s, a) => {
      const { orderId, message } = (a.payload as any) || {};
      s.byOrder[orderId] = s.byOrder[orderId] || JSON.parse(JSON.stringify(emptyBucket));
      s.byOrder[orderId].request.status = 'error'; s.byOrder[orderId].request.error = message || 'Failed';
    });
  }
});

export default slice.reducer;

