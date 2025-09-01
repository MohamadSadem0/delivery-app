import { axiosInstance } from '@/api/axiosBase';
import { endpoints } from '@/api/endpoints';
import type { CancelReasonsResponse, CancelResponse, CancellationDetailResponse } from './cancel.types';

export async function apiGetCancelReasons(orderId: number): Promise<CancelReasonsResponse> {
  const res = await axiosInstance.get(endpoints.cancellation.reasons(orderId));
  return res.data;
}

export async function apiCancelOrder(orderId: number, payload: { reasonCode: string; note?: string }): Promise<CancelResponse> {
  const res = await axiosInstance.post(endpoints.cancellation.create(orderId), payload);
  return res.data;
}

export async function apiGetCancellation(orderId: number): Promise<CancellationDetailResponse> {
  const res = await axiosInstance.get(endpoints.cancellation.detail(orderId));
  return res.data;
}
