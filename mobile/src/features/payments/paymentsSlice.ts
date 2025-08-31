import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { SavedCard } from '@/types/models/Card';
import type { CreateIntentPayload } from '@/services/payments/types';
import { apiCreatePaymentIntent, apiListSavedCards, apiSaveCard, apiDeleteCard, apiSetDefaultCard } from './payments.api';

type PaymentsState = {
  status: 'idle' | 'loading' | 'error';
  method: 'cod' | 'card';
  cards: SavedCard[];
  error?: string;
  lastClientSecret?: string;
};

const initialState: PaymentsState = {
  status: 'idle',
  method: 'cod',
  cards: [],
};

export const createIntentThunk = createAsyncThunk('payments/createIntent', async (payload: CreateIntentPayload, { rejectWithValue }) => {
  try {
    return await apiCreatePaymentIntent(payload);
  } catch (e: any) {
    return rejectWithValue(e?.response?.data?.message || e.message);
  }
});

export const fetchCards = createAsyncThunk('payments/fetchCards', async (_, { rejectWithValue }) => {
  try {
    return await apiListSavedCards();
  } catch (e: any) {
    return rejectWithValue(e?.response?.data?.message || e.message);
  }
});

export const saveCardThunk = createAsyncThunk('payments/saveCard', async ({ paymentMethodId }: { paymentMethodId: string }, { rejectWithValue }) => {
  try {
    return await apiSaveCard({ paymentMethodId });
  } catch (e: any) {
    return rejectWithValue(e?.response?.data?.message || e.message);
  }
});

export const deleteCardThunk = createAsyncThunk('payments/deleteCard', async (id: string, { rejectWithValue }) => {
  try {
    await apiDeleteCard(id);
    return id;
  } catch (e: any) {
    return rejectWithValue(e?.response?.data?.message || e.message);
  }
});

export const setDefaultCardThunk = createAsyncThunk('payments/setDefault', async (id: string, { rejectWithValue }) => {
  try {
    await apiSetDefaultCard(id);
    return id;
  } catch (e: any) {
    return rejectWithValue(e?.response?.data?.message || e.message);
  }
});

const slice = createSlice({
  name: 'payments',
  initialState,
  reducers: {
    setMethod(state, action: PayloadAction<'cod' | 'card'>) { state.method = action.payload; },
  },
  extraReducers: builder => {
    builder
      .addCase(createIntentThunk.fulfilled, (state, action) => { state.lastClientSecret = (action.payload as any).clientSecret; })
      .addCase(fetchCards.fulfilled, (state, action) => { state.cards = action.payload as SavedCard[]; })
      .addCase(saveCardThunk.fulfilled, (state, action) => { state.cards.unshift(action.payload as SavedCard); })
      .addCase(deleteCardThunk.fulfilled, (state, action) => { state.cards = state.cards.filter(c => c.id !== (action.payload as string)); })
      .addCase(setDefaultCardThunk.fulfilled, (state, action) => {
        const id = action.payload as string;
        state.cards = state.cards.map(c => ({ ...c, isDefault: c.id === id }));
      });
  },
});

export const { setMethod } = slice.actions;
export default slice.reducer;
