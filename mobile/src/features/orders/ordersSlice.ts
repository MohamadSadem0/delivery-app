import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { Order } from '@/types/models/Order';
import type { Address } from '@/types/models/Address';
import type { PaymentMethod } from '@/types/models/Payment';
import { apiCreateOrder, apiGetOrder, apiListOrders, apiTrackOrder } from './orders.api';

export type OrdersState = {
  status: 'idle' | 'loading' | 'error';
  list: Order[];
  byId: Record<number, Order>;
  lastCreatedId?: number;
  error?: string;
};

const initialState: OrdersState = {
  status: 'idle',
  list: [],
  byId: {},
};

export const createOrderThunk = createAsyncThunk(
  'orders/create',
  async (payload: { address: Address; paymentMethod: PaymentMethod; couponCode?: string | null }, { rejectWithValue }) => {
    try {
      const order = await apiCreateOrder(payload);
      return order;
    } catch (e: any) {
      return rejectWithValue(e?.response?.data?.message || e.message);
    }
  }
);

export const fetchOrders = createAsyncThunk('orders/fetchAll', async (_, { rejectWithValue }) => {
  try {
    const data = await apiListOrders();
    return data;
  } catch (e: any) {
    return rejectWithValue(e?.response?.data?.message || e.message);
  }
});

export const fetchOrderById = createAsyncThunk('orders/fetchById', async (id: number, { rejectWithValue }) => {
  try {
    const order = await apiGetOrder(id);
    return order;
  } catch (e: any) {
    return rejectWithValue(e?.response?.data?.message || e.message);
  }
});

export const trackOrderThunk = createAsyncThunk('orders/track', async (id: number, { rejectWithValue }) => {
  try {
    const status = await apiTrackOrder(id);
    return { id, status };
  } catch (e: any) {
    return rejectWithValue(e?.response?.data?.message || e.message);
  }
});

const slice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(createOrderThunk.pending, state => {
        state.status = 'loading';
        state.error = undefined;
      })
      .addCase(createOrderThunk.fulfilled, (state, action) => {
        state.status = 'idle';
        const order = action.payload as Order;
        state.lastCreatedId = order.id;
        state.byId[order.id] = order;
        state.list = [order, ...state.list];
      })
      .addCase(createOrderThunk.rejected, (state, action) => {
        state.status = 'error';
        state.error = String(action.payload || 'Failed to create order');
      })
      .addCase(fetchOrders.pending, state => {
        state.status = 'loading';
        state.error = undefined;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = 'idle';
        const list = action.payload as Order[];
        state.list = list;
        state.byId = {};
        for (const o of list) state.byId[o.id] = o;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = 'error';
        state.error = String(action.payload || 'Failed to load orders');
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        const o = action.payload as Order;
        state.byId[o.id] = o;
      })
      .addCase(trackOrderThunk.fulfilled, (state, action) => {
        const { id, status } = action.payload as { id: number; status: any };
        const o = state.byId[id];
        if (o && status?.status) {
          o.status = status.status as any;
        }
      });
  },
});

export default slice.reducer;
