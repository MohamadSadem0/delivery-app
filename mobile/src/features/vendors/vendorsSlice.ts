import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { Vendor } from '@/types/models/Vendor';
import { apiListVendors, apiGetVendor } from './vendors.api';

export type VendorsState = {
  status: 'idle' | 'loading' | 'error';
  list: Vendor[];
  byId: Record<number, Vendor>;
  error?: string;
};

const initialState: VendorsState = {
  status: 'idle',
  list: [],
  byId: {},
};

export const fetchVendors = createAsyncThunk('vendors/fetchAll', async (_, { rejectWithValue }) => {
  try {
    return await apiListVendors();
  } catch (e: any) {
    return rejectWithValue(e?.response?.data?.message || e.message);
  }
});

export const fetchVendorById = createAsyncThunk('vendors/fetchById', async (id: number, { rejectWithValue }) => {
  try {
    return await apiGetVendor(id);
  } catch (e: any) {
    return rejectWithValue(e?.response?.data?.message || e.message);
  }
});

const slice = createSlice({
  name: 'vendors',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchVendors.pending, state => { state.status = 'loading'; state.error = undefined; })
      .addCase(fetchVendors.fulfilled, (state, action) => {
        state.status = 'idle';
        state.list = ((action.payload as any)?.items ?? []) as Vendor[];
        state.byId = {};
        for (const v of state.list) state.byId[v.id] = v;
      })
      .addCase(fetchVendors.rejected, (state, action) => {
        state.status = 'error';
        state.error = String(action.payload || 'Failed to load vendors');
      })
      .addCase(fetchVendorById.fulfilled, (state, action) => {
        const v = action.payload as Vendor;
        state.byId[v.id] = v;
      });
  },
});

export default slice.reducer;

