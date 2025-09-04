import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { OrderTrackState } from './tracking.types';
import { apiGetCourierLocation, apiGetOrderPath } from './tracking.api';

const initialState: OrderTrackState = {
  path: [],
  loading: false,
};

export const fetchCourierLocation = createAsyncThunk('tracking/location', async (orderId: number, { rejectWithValue }) => {
  try {
    return await apiGetCourierLocation(orderId);
  } catch (e: any) {
    return rejectWithValue(e?.response?.data?.message || e.message);
  }
});

export const fetchOrderPath = createAsyncThunk('tracking/path', async (orderId: number, { rejectWithValue }) => {
  try {
    return await apiGetOrderPath(orderId);
  } catch (e: any) {
    return rejectWithValue(e?.response?.data?.message || e.message);
  }
});

const slice = createSlice({
  name: 'tracking',
  initialState,
  reducers: {
    resetTracking: () => initialState,
    setOrderId(state, { payload }: { payload: number }) {
      state.orderId = payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCourierLocation.pending, state => { state.loading = true; state.error = undefined; })
      .addCase(fetchCourierLocation.fulfilled, (state, action) => {
        state.loading = false;
        const loc = action.payload as any;
        state.lastLocation = loc;
        if (loc?.lat && loc?.lng) state.path.push({ lat: loc.lat, lng: loc.lng, ts: loc.updatedAt || new Date().toISOString() });
      })
      .addCase(fetchCourierLocation.rejected, (state, action) => {
        state.loading = false;
        state.error = String(action.payload || 'Failed to fetch location');
      })
      .addCase(fetchOrderPath.fulfilled, (state, action) => {
        const payload = action.payload as any;
        if (Array.isArray(payload?.points)) state.path = payload.points;
      });
  },
});

export const { resetTracking, setOrderId } = slice.actions;
export default slice.reducer;

