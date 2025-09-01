import type { RootState } from '@/store';
import type { RatingSummary } from './reviews.types';

export const selectVendorReviews = (vendorId: number) => (s: RootState) => s.reviews.byVendor[vendorId]?.list || [];
export const selectVendorReviewsStatus = (vendorId: number) => (s: RootState) => s.reviews.byVendor[vendorId]?.status || 'idle';
export const selectVendorRatingSummary = (vendorId: number) => (s: RootState): RatingSummary | null => s.reviews.byVendor[vendorId]?.summary || null;
export const selectReviewSubmitting = (s: RootState) => s.reviews.submitting;
export const selectReviewSubmitError = (s: RootState) => s.reviews.submitError || null;
