import { axiosInstance } from '@/api/axiosBase';
import { endpoints } from '@/api/endpoints';
import type { Order } from '@/types/models/Order';
import type { Address } from '@/types/models/Address';
import type { PaymentMethod } from '@/types/models/Payment';

export async function apiCreateOrder(payload: {
  address: Address;
  paymentMethod: PaymentMethod;
  couponCode?: string | null;
}): Promise<Order> {
  const res = await axiosInstance.post(endpoints.orders.create, payload);
  return res.data;
}

export async function apiListOrders(): Promise<Order[]> {
  const res = await axiosInstance.get(endpoints.orders.list);
  return res.data;
}

export async function apiGetOrder(id: number | string): Promise<Order> {
  const res = await axiosInstance.get(endpoints.orders.detail(id));
  return res.data;
}

export async function apiTrackOrder(id: number | string): Promise<{ status: string; etaMinutes?: number } | null> {
  const res = await axiosInstance.get(endpoints.orders.track(id));
  return res.data;
}
