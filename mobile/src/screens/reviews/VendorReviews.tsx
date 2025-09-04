import React, { useEffect, useState } from 'react';
import Screen from '@/components/layout/Screen';
import Text from '@/components/ui/Text';
import RatingStars from '@/components/reviews/RatingStars';
import RatingDistribution from '@/components/reviews/RatingDistribution';
import ReviewCard from '@/components/reviews/ReviewCard';
import ReviewsEmpty from '@/components/reviews/ReviewsEmpty';
import ReviewForm from '@/components/reviews/ReviewForm';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchVendorReviews, fetchVendorSummary, createVendorReview, deleteVendorReview } from '@/features/reviews/reviewsSlice';
import { selectVendorReviews, selectVendorReviewsStatus, selectVendorSummary } from '@/features/reviews/reviews.selectors';
import { FlatList, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function VendorReviewsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const vendorId = Number(id);
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectVendorReviews(vendorId));
  const status = useAppSelector(selectVendorReviewsStatus(vendorId));
  const summary = useAppSelector(selectVendorSummary(vendorId));
  const [page, setPage] = useState(1);

  useEffect(() => { if (vendorId) { dispatch(fetchVendorSummary(vendorId)); dispatch(fetchVendorReviews({ vendorId, page: 1 }) as any); } }, [dispatch, vendorId]);

  return (
    <Screen>
      <Text weight="semiBold" style={{ fontSize: 22, marginBottom: 8 }}>Vendor reviews</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
        <RatingStars value={summary?.avg || 0} size={18} />
        <Text style={{ marginLeft: 8 }}>{(summary?.avg || 0).toFixed(1)} Â· {summary?.count || 0} reviews</Text>
      </View>
      <RatingDistribution summary={summary} />
      <View style={{ height: 12 }} />
      <ReviewForm onSubmit={(v) => dispatch(createVendorReview({ vendorId, payload: v }) as any)} />
      <View style={{ height: 16 }} />
      {status === 'loading' && !items.length ? <Text>Loadingâ€¦</Text> : (
        <FlatList
          data={items}
          keyExtractor={(x) => String(x.id)}
          renderItem={({ item }) => <ReviewCard item={item} onDelete={() => dispatch(deleteVendorReview(item.id) as any)} />}
          ListEmptyComponent={<ReviewsEmpty />}
          onEndReachedThreshold={0.6}
          onEndReached={() => { const next = page + 1; setPage(next); dispatch(fetchVendorReviews({ vendorId, page: next }) as any); }}
        />
      )}
    </Screen>
  );
}


