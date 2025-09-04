import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { Promotion } from '@/types/models/Promotion';
import { apiGetPromotion } from './promotions.api';

type State = { byId: Record<number, Promotion | undefined>; status: 'idle'|'loading'|'error'; error?: string|null; };
const initial: State = { byId: {}, status: 'idle' };

export const fetchPromotionById = createAsyncThunk('promotions/fetchById', async (id: number, { rejectWithValue }) => {
  try { return await apiGetPromotion(id); }
  catch (e: any) { return rejectWithValue(e?.response?.data?.message || e.message); }
});

const slice = createSlice({
  name: 'promotions',
  initialState: initial,
  reducers: {},
  extraReducers: b => {
    b.addCase(fetchPromotionById.pending, (s) => { s.status = 'loading'; s.error = null; });
    b.addCase(fetchPromotionById.fulfilled, (s, a) => { s.status = 'idle'; const p = a.payload as Promotion; s.byId[p.id] = p; });
    b.addCase(fetchPromotionById.rejected, (s, a) => { s.status = 'error'; s.error = String(a.payload || 'Failed to load'); });
  }
});

export default slice.reducer;

