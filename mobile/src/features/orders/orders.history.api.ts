import { axiosInstance } from '@/api/axiosBase';
import { endpoints } from '@/api/endpoints';
import type { OrderHistoryFilters, OrderRow } from './history.types';
export async function apiListOrderHistory(params: Partial<OrderHistoryFilters> & { page?: number; pageSize?: number }): Promise<{ data: OrderRow[]; total?: number }> { const res = await axiosInstance.get(endpoints.orders.history, { params }); return res.data; }
