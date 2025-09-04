import { axiosInstance } from '@/api/axiosBase';
import { endpoints } from '@/api/endpoints';
import type { RefundsResponse, RefundResponse } from './refunds.types';

export async function apiListRefunds(): Promise<RefundsResponse> {
  const res = await axiosInstance.get(endpoints.refunds.list);
  return res.data;
}

export async function apiRequestRefund(orderId: number, payload: { amount: number; currency: 'LBP'|'USD'; method: 'wallet'|'original'|'store_credit'; reason: string; note?: string }): Promise<RefundResponse> {
  const res = await axiosInstance.post(endpoints.refunds.create(orderId), payload);
  return res.data;
}

