import { axiosInstance } from '@/api/axiosBase';
import { endpoints } from '@/api/endpoints';
import type { OrderTrackingSnapshot } from '@/types/models/Tracking';

export async function apiGetTracking(orderId: number): Promise<{ data: OrderTrackingSnapshot }> {
  const res = await axiosInstance.get(endpoints.tracking.current(orderId));
  return res.data;
}

export async function apiGetRoute(orderId: number): Promise<{ route: OrderTrackingSnapshot['route'] }> {
  const res = await axiosInstance.get(endpoints.tracking.route(orderId));
  return res.data;
}
