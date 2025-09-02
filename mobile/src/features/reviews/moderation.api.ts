import { axiosInstance } from '@/api/axiosBase';
import { endpoints } from '@/api/endpoints';

export async function apiFlagReview(reviewId: number, payload: { reason: string; note?: string }) {
  const res = await axiosInstance.post(endpoints.reviews.flag(reviewId), payload);
  return res.data; // { ok: true }
}
