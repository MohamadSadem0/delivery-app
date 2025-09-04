import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { Tag } from '@/types/models/Tag';
import { apiListTags } from './tags.api';

type State = {
  status: 'idle' | 'loading' | 'error';
  list: Tag[];
  error?: string;
};

const initialState: State = {
  status: 'idle',
  list: [],
};

export const fetchTags = createAsyncThunk('tags/fetchAll', async (_, { rejectWithValue }) => {
  try {
    return await apiListTags();
  } catch (e: any) {
    return rejectWithValue(e?.response?.data?.message || e.message);
  }
});

const slice = createSlice({
  name: 'tags',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchTags.pending, s => { s.status = 'loading'; s.error = undefined; })
      .addCase(fetchTags.fulfilled, (s, a) => { s.status = 'idle'; s.list = a.payload as Tag[]; })
      .addCase(fetchTags.rejected, (s, a) => { s.status = 'error'; s.error = String(a.payload || 'Failed to load tags'); });
  },
});

export default slice.reducer;

