import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { RefundRequest } from '@/types/models/Refund';
import { apiListRefunds, apiRequestRefund } from './refunds.api';

type State = {
  list: { items: RefundRequest[]; status: 'idle'|'loading'|'error'; error?: string | null };
  acting: boolean;
  actionError?: string | null;
};

const initialState: State = {
  list: { items: [], status: 'idle' },
  acting: false,
};

export const fetchRefunds = createAsyncThunk('refunds/list', async (_, { rejectWithValue }) => {
  try { return (await apiListRefunds()).data; }
  catch (e: any) { return rejectWithValue(e?.response?.data?.message || e.message); }
});

export const submitRefund = createAsyncThunk('refunds/submit', async (args: { orderId: number; amount: number; currency: 'LBP'|'USD'; method: 'wallet'|'original'|'store_credit'; reason: string; note?: string }, { rejectWithValue }) => {
  try { const r = await apiRequestRefund(args.orderId, { amount: args.amount, currency: args.currency, method: args.method, reason: args.reason, note: args.note }); return r.refund; }
  catch (e: any) { return rejectWithValue(e?.response?.data?.message || e.message); }
});

const slice = createSlice({
  name: 'refunds',
  initialState,
  reducers: {},
  extraReducers: b => {
    b.addCase(fetchRefunds.pending, (s) => { s.list.status = 'loading'; s.list.error = null; });
    b.addCase(fetchRefunds.fulfilled, (s, a) => { s.list.status = 'idle'; s.list.items = a.payload as RefundRequest[]; });
    b.addCase(fetchRefunds.rejected, (s, a) => { s.list.status = 'error'; s.list.error = String(a.payload || 'Failed'); });

    b.addCase(submitRefund.pending, (s) => { s.acting = true; s.actionError = null; });
    b.addCase(submitRefund.fulfilled, (s, a) => { s.acting = false; s.list.items.unshift(a.payload as RefundRequest); });
    b.addCase(submitRefund.rejected, (s, a) => { s.acting = false; s.actionError = String(a.payload || 'Failed'); });
  }
});

export default slice.reducer;

