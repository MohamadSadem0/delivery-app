import React, { useEffect } from 'react';
import Screen from '@/components/layout/Screen';
import Text from '@/components/ui/Text';
import ReviewList from '@/components/reviews/ReviewList';
import StarRating from '@/components/ratings/StarRating';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useLocalSearchParams } from 'expo-router';
import { fetchVendorReviews } from '@/features/reviews/reviewsSlice';
import { selectVendorRatingSummary, selectVendorReviews, selectVendorReviewsStatus } from '@/features/reviews/reviews.selectors';

export default function VendorReviewsScreen() {
  const { vendorId } = useLocalSearchParams<{ vendorId: string }>();
  const vid = Number(vendorId);
  const dispatch = useAppDispatch();
  const summary = useAppSelector(selectVendorRatingSummary(vid));
  const items = useAppSelector(selectVendorReviews(vid));
  const status = useAppSelector(selectVendorReviewsStatus(vid));

  useEffect(() => { if (vid) dispatch(fetchVendorReviews(vid)); }, [dispatch, vid]);

  return (
    <Screen>
      <Text style={{ fontSize: 22, marginBottom: 12 }} weight="semiBold">Vendor Reviews</Text>
      {summary ? (
        <>
          <StarRating value={summary.avg} size={18} />
          <Text muted>{summary.avg.toFixed(1)} · {summary.total} reviews</Text>
        </>
      ) : null}
      {status === 'loading' ? <Text>Loading…</Text> : <ReviewList data={items} />}
    </Screen>
  );
}
