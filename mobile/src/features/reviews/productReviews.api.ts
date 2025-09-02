import { axiosInstance } from '@/api/axiosBase';
import { endpoints } from '@/api/endpoints';
import type { CreateReviewPayload, UpdateReviewPayload, ReviewsResponse, ReviewResponse, SummaryResponse } from './reviews.types';

export async function apiListProductReviews(productId: number, page = 1): Promise<ReviewsResponse> {
  const res = await axiosInstance.get(endpoints.reviews.product.list(productId), { params: { page } });
  return res.data;
}
export async function apiGetProductSummary(productId: number): Promise<SummaryResponse> {
  const res = await axiosInstance.get(endpoints.reviews.product.summary(productId));
  return res.data;
}
export async function apiCreateProductReview(productId: number, payload: CreateReviewPayload): Promise<ReviewResponse> {
  const res = await axiosInstance.post(endpoints.reviews.product.create(productId), payload);
  return res.data;
}
export async function apiUpdateProductReview(reviewId: number, payload: UpdateReviewPayload): Promise<ReviewResponse> {
  const res = await axiosInstance.put(endpoints.reviews.update(reviewId), payload);
  return res.data;
}
export async function apiDeleteProductReview(reviewId: number): Promise<{ ok: true }> {
  const res = await axiosInstance.delete(endpoints.reviews.remove(reviewId));
  return res.data;
}
