import { axiosInstance } from '@/api/axiosBase';
import { endpoints } from '@/api/endpoints';

export async function applyCouponApi(code: string): Promise<{ discountAmount: number }> {
  const res = await axiosInstance.post(endpoints.cart.applyCoupon, { code });
  return res.data;
}

