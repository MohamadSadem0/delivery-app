import type { RootState } from '@/store';
import type { ReviewSummary } from '@/types/models/Review';

export const selectProductReviews = (productId: number) => (s: RootState) => s.reviews.product[productId]?.list.items || [];
export const selectProductReviewsStatus = (productId: number) => (s: RootState) => s.reviews.product[productId]?.list.status || 'idle';
export const selectProductSummary = (productId: number) => (s: RootState): ReviewSummary | null => s.reviews.product[productId]?.summary.data || null;

export const selectVendorReviews = (vendorId: number) => (s: RootState) => s.reviews.vendor[vendorId]?.list.items || [];
export const selectVendorReviewsStatus = (vendorId: number) => (s: RootState) => s.reviews.vendor[vendorId]?.list.status || 'idle';
export const selectVendorSummary = (vendorId: number) => (s: RootState): ReviewSummary | null => s.reviews.vendor[vendorId]?.summary.data || null;
