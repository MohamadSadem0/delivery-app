import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { Category } from '@/types/models/Category';
import { apiListCategories, apiGetCategory } from './categories.api';

type State = {
  status: 'idle' | 'loading' | 'error';
  list: Category[];
  byId: Record<number, Category>;
  error?: string;
};

const initialState: State = {
  status: 'idle',
  list: [],
  byId: {},
};

export const fetchCategories = createAsyncThunk('categories/fetchAll', async (_, { rejectWithValue }) => {
  try {
    return await apiListCategories();
  } catch (e: any) {
    return rejectWithValue(e?.response?.data?.message || e.message);
  }
});

export const fetchCategoryById = createAsyncThunk('categories/fetchById', async (id: number, { rejectWithValue }) => {
  try {
    return await apiGetCategory(id);
  } catch (e: any) {
    return rejectWithValue(e?.response?.data?.message || e.message);
  }
});

const slice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchCategories.pending, s => { s.status = 'loading'; s.error = undefined; })
      .addCase(fetchCategories.fulfilled, (s, a) => {
        s.status = 'idle';
        s.list = a.payload as Category[];
        s.byId = {};
        for (const c of s.list) s.byId[c.id] = c;
      })
      .addCase(fetchCategories.rejected, (s, a) => { s.status = 'error'; s.error = String(a.payload || 'Failed to load categories'); })
      .addCase(fetchCategoryById.fulfilled, (s, a) => {
        const c = a.payload as Category;
        s.byId[c.id] = c;
      });
  },
});

export default slice.reducer;

