import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiFlagReview } from './moderation.api';

type State = { acting: boolean; error?: string | null; ok?: boolean };
const initial: State = { acting: false };

export const flagReview = createAsyncThunk('reviews/flag', async (args: { reviewId: number; reason: string; note?: string }, { rejectWithValue }) => {
  try { await apiFlagReview(args.reviewId, { reason: args.reason, note: args.note }); return true; }
  catch (e: any) { return rejectWithValue(e?.response?.data?.message || e.message); }
});

const slice = createSlice({
  name: 'moderation',
  initialState: initial,
  reducers: {},
  extraReducers: b => {
    b.addCase(flagReview.pending, (s) => { s.acting = true; s.error = null; s.ok = false; });
    b.addCase(flagReview.fulfilled, (s) => { s.acting = false; s.ok = true; });
    b.addCase(flagReview.rejected, (s, a) => { s.acting = false; s.error = String(a.payload || 'Failed'); s.ok = false; });
  }
});
export default slice.reducer;
