import type { RootState } from '@/store';

export const selectOrders = (s: RootState) => s.orders.list;
export const selectOrderById = (id: number) => (s: RootState) => s.orders.byId[id] ?? null;
export const selectOrdersStatus = (s: RootState) => s.orders.status;
export const selectLastCreatedOrderId = (s: RootState) => s.orders.lastCreatedId;
