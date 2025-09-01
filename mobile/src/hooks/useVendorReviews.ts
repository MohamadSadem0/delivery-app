import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchVendorReviews } from '@/features/reviews/reviewsSlice';
import { selectVendorRatingSummary, selectVendorReviews, selectVendorReviewsStatus } from '@/features/reviews/reviews.selectors';

export function useVendorReviews(vendorId: number) {
  const dispatch = useAppDispatch();
  const list = useAppSelector(selectVendorReviews(vendorId));
  const summary = useAppSelector(selectVendorRatingSummary(vendorId));
  const status = useAppSelector(selectVendorReviewsStatus(vendorId));

  useEffect(() => { if (vendorId) dispatch(fetchVendorReviews(vendorId)); }, [vendorId, dispatch]);
  return { list, summary, status };
}
