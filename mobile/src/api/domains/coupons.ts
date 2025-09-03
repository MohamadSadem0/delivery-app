import { httpPost } from '@/api/client';
import { endpoints } from '@/api/endpoints';

export async function previewCoupon(code: string): Promise<{ valid: boolean; discount: number; }> {
  return httpPost(endpoints.coupons.preview, { code });
}
