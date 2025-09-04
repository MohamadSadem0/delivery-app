import { axiosInstance } from '@/api/axiosBase';
import { endpoints } from '@/api/endpoints';
import type { Review } from '@/types/models/Review';
import type { ReviewSummary } from "@/types/models/Review";

export type VendorReviewsResponse = { data: Review[]; summary: ReviewSummary };
export async function apiListVendorReviews(vendorId: number | string): Promise<VendorReviewsResponse> {
  const res = await axiosInstance.get(endpoints.reviews.vendor.list(vendorId));
  return res.data;
}

export async function apiSubmitOrderReview(orderId: number | string, payload: { rating: number; comment?: string }): Promise<{ ok: true; review: Review }> {
  const res = await axiosInstance.post(endpoints.reviews.create(orderId), payload);
  return res.data;
}

