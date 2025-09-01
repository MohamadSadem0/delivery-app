import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { WalletBalance, WalletTransaction, PaymentMethod } from '@/types/models/Payment';
import { apiAddCard, apiGetWalletBalance, apiListPaymentMethods, apiListWalletTransactions, apiRemoveMethod, apiSetDefaultMethod, apiTopUp, apiWithdraw } from './wallet.api';

type TxBucket = { items: WalletTransaction[]; status: 'idle' | 'loading' | 'error'; error?: string | null; page: number; nextCursor?: string | null };
type MethodsState = { items: PaymentMethod[]; status: 'idle' | 'loading' | 'error'; error?: string | null };
type BalanceState = { data: WalletBalance | null; status: 'idle' | 'loading' | 'error'; error?: string | null };

type State = {
  balance: BalanceState;
  transactions: TxBucket;
  methods: MethodsState;
  acting: boolean; // for add/remove/setDefault/topup/withdraw
  actionError?: string | null;
};

const initialState: State = {
  balance: { data: null, status: 'idle' },
  transactions: { items: [], status: 'idle', page: 1 },
  methods: { items: [], status: 'idle' },
  acting: false,
};

export const fetchBalance = createAsyncThunk('wallet/balance', async (_, { rejectWithValue }) => {
  try { return (await apiGetWalletBalance()).balance; }
  catch (e: any) { return rejectWithValue(e?.response?.data?.message || e.message); }
});

export const fetchTransactions = createAsyncThunk('wallet/transactions', async (args: { page?: number; pageSize?: number; cursor?: string } | undefined, { rejectWithValue }) => {
  try { const r = await apiListWalletTransactions(args); return r; }
  catch (e: any) { return rejectWithValue(e?.response?.data?.message || e.message); }
});

export const fetchMethods = createAsyncThunk('wallet/methods', async (_, { rejectWithValue }) => {
  try { const r = await apiListPaymentMethods(); return r.data; }
  catch (e: any) { return rejectWithValue(e?.response?.data?.message || e.message); }
});

export const addCardThunk = createAsyncThunk('wallet/addCard', async (payload: { number: string; expMonth: number; expYear: number; cvc: string; holderName?: string }, { rejectWithValue }) => {
  try { const r = await apiAddCard(payload); return r.method; }
  catch (e: any) { return rejectWithValue(e?.response?.data?.message || e.message); }
});

export const removeMethodThunk = createAsyncThunk('wallet/removeMethod', async (id: number, { rejectWithValue }) => {
  try { await apiRemoveMethod(id); return id; }
  catch (e: any) { return rejectWithValue(e?.response?.data?.message || e.message); }
});

export const setDefaultMethodThunk = createAsyncThunk('wallet/setDefault', async (id: number, { rejectWithValue }) => {
  try { await apiSetDefaultMethod(id); return id; }
  catch (e: any) { return rejectWithValue(e?.response?.data?.message || e.message); }
});

export const topUpThunk = createAsyncThunk('wallet/topUp', async (payload: { amount: number; methodId: number }, { rejectWithValue }) => {
  try { await apiTopUp(payload.amount, payload.methodId); return payload; }
  catch (e: any) { return rejectWithValue(e?.response?.data?.message || e.message); }
});

export const withdrawThunk = createAsyncThunk('wallet/withdraw', async (amount: number, { rejectWithValue }) => {
  try { await apiWithdraw(amount); return amount; }
  catch (e: any) { return rejectWithValue(e?.response?.data?.message || e.message); }
});

const slice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    prependTransactions(state, a: PayloadAction<WalletTransaction[]>) {
      state.transactions.items = [...a.payload, ...state.transactions.items];
    },
  },
  extraReducers: b => {
    b.addCase(fetchBalance.pending, (s) => { s.balance.status = 'loading'; s.balance.error = null; });
    b.addCase(fetchBalance.fulfilled, (s, a) => { s.balance.status = 'idle'; s.balance.data = a.payload as WalletBalance; });
    b.addCase(fetchBalance.rejected, (s, a) => { s.balance.status = 'error'; s.balance.error = String(a.payload || 'Failed'); });

    b.addCase(fetchTransactions.pending, (s) => { s.transactions.status = 'loading'; s.transactions.error = null; });
    b.addCase(fetchTransactions.fulfilled, (s, a) => {
      const { data, nextCursor } = a.payload as any;
      const page = (a.meta.arg as any)?.page || 1;
      s.transactions.items = page > 1 ? [...s.transactions.items, ...data] : data;
      s.transactions.page = page;
      s.transactions.nextCursor = nextCursor;
      s.transactions.status = 'idle';
    });
    b.addCase(fetchTransactions.rejected, (s, a) => { s.transactions.status = 'error'; s.transactions.error = String(a.payload || 'Failed'); });

    b.addCase(fetchMethods.pending, (s) => { s.methods.status = 'loading'; s.methods.error = null; });
    b.addCase(fetchMethods.fulfilled, (s, a) => { s.methods.status = 'idle'; s.methods.items = a.payload as PaymentMethod[]; });
    b.addCase(fetchMethods.rejected, (s, a) => { s.methods.status = 'error'; s.methods.error = String(a.payload || 'Failed'); });

    b.addCase(addCardThunk.pending, (s) => { s.acting = true; s.actionError = null; });
    b.addCase(addCardThunk.fulfilled, (s, a) => { s.acting = false; s.methods.items.unshift(a.payload as PaymentMethod); });
    b.addCase(addCardThunk.rejected, (s, a) => { s.acting = false; s.actionError = String(a.payload || 'Failed'); });

    b.addCase(removeMethodThunk.fulfilled, (s, a) => { s.methods.items = s.methods.items.filter(m => m.id !== (a.payload as number)); });
    b.addCase(setDefaultMethodThunk.fulfilled, (s, a) => {
      const id = a.payload as number;
      s.methods.items = s.methods.items.map(m => ({ ...m, isDefault: m.id === id }));
    });

    b.addCase(topUpThunk.pending, (s) => { s.acting = true; s.actionError = null; });
    b.addCase(topUpThunk.fulfilled, (s) => { s.acting = false; });
    b.addCase(topUpThunk.rejected, (s, a) => { s.acting = false; s.actionError = String(a.payload || 'Failed'); });

    b.addCase(withdrawThunk.pending, (s) => { s.acting = true; s.actionError = null; });
    b.addCase(withdrawThunk.fulfilled, (s) => { s.acting = false; });
    b.addCase(withdrawThunk.rejected, (s, a) => { s.acting = false; s.actionError = String(a.payload || 'Failed'); });
  },
});

export const { prependTransactions } = slice.actions;
export default slice.reducer;
