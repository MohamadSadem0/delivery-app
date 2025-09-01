import { axiosInstance } from '@/api/axiosBase';
import { endpoints } from '@/api/endpoints';
import type { CourierLocation } from '@/types/models/Courier';

export async function apiGetCourierLocation(orderId: number): Promise<CourierLocation | null> {
  // Expect backend: GET /orders/:id/location => { lat, lng, bearing?, speedKmh?, updatedAt }
  const res = await axiosInstance.get(endpoints.orders.location(orderId));
  return res.data;
}

export async function apiGetOrderPath(orderId: number): Promise<{ points: { lat: number; lng: number; ts: string }[] }> {
  // Optional: GET /orders/:id/path => { points: [...] }
  const res = await axiosInstance.get(endpoints.orders.path(orderId));
  return res.data;
}
