import { axiosInstance } from '@/api/axiosBase';
import { endpoints } from '@/api/endpoints';
import type { Coupon } from '@/types/models/Coupon';

export async function apiApplyCoupon(code: string, payload: any = {}): Promise<{ coupon: Coupon; discountAmount: number }> {
  const res = await axiosInstance.post(endpoints.coupons.apply, { code, ...payload });
  return res.data;
}

export async function apiRemoveCoupon(): Promise<{ ok: true }> {
  const res = await axiosInstance.post(endpoints.coupons.remove);
  return res.data;
}

export async function apiListMyCoupons(): Promise<Coupon[]> {
  const res = await axiosInstance.get(endpoints.coupons.my);
  return res.data;
}

export async function apiValidateCoupon(code: string): Promise<{ valid: boolean; coupon?: Coupon; reason?: string }> {
  const res = await axiosInstance.post(endpoints.coupons.validate, { code });
  return res.data;
}

