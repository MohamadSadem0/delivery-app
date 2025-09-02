import type { Review, ReviewSummary } from '@/types/models/Review';

export type ReviewsResponse = { data: Review[]; total?: number };
export type ReviewResponse = { data: Review };
export type SummaryResponse = { data: ReviewSummary };

export type CreateReviewPayload = {
  rating: 1|2|3|4|5;
  title?: string;
  body?: string;
  images?: string[];
  orderId?: number;
};

export type UpdateReviewPayload = Partial<CreateReviewPayload>;
