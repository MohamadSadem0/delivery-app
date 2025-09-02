import { axiosInstance } from '@/api/axiosBase';
import { endpoints } from '@/api/endpoints';
import type { CreateReviewPayload, UpdateReviewPayload, ReviewsResponse, ReviewResponse, SummaryResponse } from './reviews.types';

export async function apiListVendorReviews(vendorId: number, page = 1): Promise<ReviewsResponse> {
  const res = await axiosInstance.get(endpoints.reviews.vendor.list(vendorId), { params: { page } });
  return res.data;
}
export async function apiGetVendorSummary(vendorId: number): Promise<SummaryResponse> {
  const res = await axiosInstance.get(endpoints.reviews.vendor.summary(vendorId));
  return res.data;
}
export async function apiCreateVendorReview(vendorId: number, payload: CreateReviewPayload): Promise<ReviewResponse> {
  const res = await axiosInstance.post(endpoints.reviews.vendor.create(vendorId), payload);
  return res.data;
}
export async function apiUpdateVendorReview(reviewId: number, payload: UpdateReviewPayload): Promise<ReviewResponse> {
  const res = await axiosInstance.put(endpoints.reviews.update(reviewId), payload);
  return res.data;
}
export async function apiDeleteVendorReview(reviewId: number): Promise<{ ok: true }> {
  const res = await axiosInstance.delete(endpoints.reviews.remove(reviewId));
  return res.data;
}
