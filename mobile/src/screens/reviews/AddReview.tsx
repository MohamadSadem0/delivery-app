import React from 'react';
import Screen from '@/components/layout/Screen';
import Text from '@/components/ui/Text';
import ReviewForm from '@/components/reviews/ReviewForm';
import { useLocalSearchParams, router } from 'expo-router';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { submitOrderReview } from '@/features/reviews/reviewsSlice';
import { selectReviewSubmitting, selectReviewSubmitError } from '@/features/reviews/reviews.selectors';

export default function AddReviewScreen() {
  const { orderId, vendorId } = useLocalSearchParams<{ orderId: string; vendorId?: string }>();
  const dispatch = useAppDispatch();
  const submitting = useAppSelector(selectReviewSubmitting);
  const error = useAppSelector(selectReviewSubmitError);

  const onSubmit = async ({ rating, comment }: { rating: number; comment: string }) => {
    await dispatch(submitOrderReview({ orderId: Number(orderId), vendorId: Number(vendorId), rating, comment } as any));
    router.back();
  };

  return (
    <Screen>
      <Text style={{ fontSize: 22, marginBottom: 12 }} weight="semiBold">Add a review</Text>
      {error ? <Text style={{ color: 'red' }}>{error}</Text> : null}
      <ReviewForm onSubmit={onSubmit} submitting={submitting} />
    </Screen>
  );
}
