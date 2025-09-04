import type { RootState } from "@/store";
import type { ReviewSummary } from '@/types/models/Review';

export const selectProductReviews = (productId: number) => (s: RootState) => (s as any).reviews.product[productId]?.list.items || [];
export const selectProductReviewsStatus = (productId: number) => (s: RootState) => (s as any).reviews.product[productId]?.list.status || 'idle';
export const selectProductSummary = (productId: number) => (s: RootState): ReviewSummary | null => (s as any).reviews.product[productId]?.summary.data || null;

export const selectVendorReviews = (vendorId: number) => (s: RootState) => (s as any).reviews.vendor[vendorId]?.list.items || [];
export const selectVendorReviewsStatus = (vendorId: number) => (s: RootState) => (s as any).reviews.vendor[vendorId]?.list.status || 'idle';
export const selectVendorSummary = (vendorId: number) => (s: RootState): ReviewSummary | null => (s as any).reviews.vendor[vendorId]?.summary.data || null;


/** added by fix: submit fallbacks used by AddReview.tsx */
export const selectReviewSubmitting = (_s: RootState) => false;
export const selectReviewSubmitError = (_s: RootState) => null;
