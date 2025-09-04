import { axiosInstance } from '@/api/axiosBase';
import { endpoints } from '@/api/endpoints';

export async function apiGetInvoicePdfUrl(orderId: number | string): Promise<{ url: string }> {
  const res = await axiosInstance.get<{ url: string }>(endpoints.orders.invoice(orderId));
  return res.data;
}

