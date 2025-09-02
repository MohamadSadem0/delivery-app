import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosInstance } from '@/api/axiosBase';
import { endpoints } from '@/api/endpoints';

type State = { acting: boolean; error?: string | null };
const initial: State = { acting: false };

export const markHelpful = createAsyncThunk('reviews/helpful', async (args: { reviewId: number; value: boolean }, { rejectWithValue }) => {
  try {
    if (args.value) { await axiosInstance.post(endpoints.reviews.helpful(args.reviewId)); }
    else { await axiosInstance.delete(endpoints.reviews.helpful(args.reviewId)); }
    return args;
  } catch (e: any) { return rejectWithValue(e?.response?.data?.message || e.message); }
});

const slice = createSlice({
  name: 'reviewHelpful',
  initialState: initial,
  reducers: {},
  extraReducers: b => {
    b.addCase(markHelpful.pending, (s) => { s.acting = true; s.error = null; });
    b.addCase(markHelpful.fulfilled, (s) => { s.acting = false; });
    b.addCase(markHelpful.rejected, (s, a) => { s.acting = false; s.error = String(a.payload || 'Failed'); });
  }
});
export default slice.reducer;
