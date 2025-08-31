import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { Promotion } from '@/types/models/Promotion';
import { apiGetPromotion, apiListPromotions } from './promos.api';

type State = {
  status: 'idle' | 'loading' | 'error';
  list: Promotion[];
  byId: Record<number, Promotion>;
  error?: string;
};

const initialState: State = { status: 'idle', list: [], byId: {} };

export const fetchPromos = createAsyncThunk('promos/fetchAll', async (_, { rejectWithValue }) => {
  try { return await apiListPromotions(); } catch (e: any) { return rejectWithValue(e?.response?.data?.message || e.message); }
});

export const fetchPromoById = createAsyncThunk('promos/fetchById', async (id: number, { rejectWithValue }) => {
  try { return await apiGetPromotion(id); } catch (e: any) { return rejectWithValue(e?.response?.data?.message || e.message); }
});

const slice = createSlice({
  name: 'promos',
  initialState,
  reducers: {},
  extraReducers: b => {
    b.addCase(fetchPromos.pending, s => { s.status = 'loading'; s.error = undefined; })
     .addCase(fetchPromos.fulfilled, (s, a) => { s.status = 'idle'; s.list = a.payload as Promotion[]; s.byId = {}; for (const p of s.list) s.byId[p.id] = p; })
     .addCase(fetchPromos.rejected, (s, a) => { s.status = 'error'; s.error = String(a.payload || 'Failed to load promotions'); })
     .addCase(fetchPromoById.fulfilled, (s, a) => { const p = a.payload as Promotion; s.byId[p.id] = p; });
  },
});

export default slice.reducer;
