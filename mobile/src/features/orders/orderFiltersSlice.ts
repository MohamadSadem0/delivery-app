import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { OrderHistoryFilters } from './history.types';
const initialState: OrderHistoryFilters = { status: null, vendorId: null, fromDate: null, toDate: null, query: null };
const slice = createSlice({ name: 'orderFilters', initialState, reducers: { setFilters(_, action: PayloadAction<OrderHistoryFilters>) { return action.payload; }, clear() { return initialState; }, }, });
export const { setFilters, clear } = slice.actions; export default slice.reducer;
