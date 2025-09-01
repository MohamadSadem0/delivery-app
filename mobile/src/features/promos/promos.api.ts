import { axiosInstance } from '@/api/axiosBase';
import { endpoints } from '@/api/endpoints';
import type { CouponsResponse, ApplyPromoResponse } from './promos.types';

export async function apiListGlobalCoupons(): Promise<CouponsResponse> {
  const res = await axiosInstance.get(endpoints.promos.global);
  return res.data;
}
export async function apiListVendorCoupons(vendorId: number): Promise<CouponsResponse> {
  const res = await axiosInstance.get(endpoints.promos.vendor(vendorId));
  return res.data;
}
export async function apiApplyPromo(payload: { code: string; vendorId?: number; cartTotal: number; deliveryFee?: number; currency: string }): Promise<ApplyPromoResponse> {
  const res = await axiosInstance.post(endpoints.promos.apply, payload);
  return res.data;
}
export async function apiRemovePromo(code: string): Promise<{ ok: true }> {
  const res = await axiosInstance.post(endpoints.promos.remove, { code });
  return res.data;
}
