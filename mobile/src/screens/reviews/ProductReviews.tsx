import React, { useEffect, useState } from 'react';
import Screen from '@/components/layout/Screen';
import Text from '@/components/ui/Text';
import RatingStars from '@/components/reviews/RatingStars';
import RatingDistribution from '@/components/reviews/RatingDistribution';
import ReviewCard from '@/components/reviews/ReviewCard';
import ReviewsEmpty from '@/components/reviews/ReviewsEmpty';
import ReviewForm from '@/components/reviews/ReviewForm';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchProductReviews, fetchProductSummary, createProductReview, deleteProductReview } from '@/features/reviews/reviewsSlice';
import { selectProductReviews, selectProductReviewsStatus, selectProductSummary } from '@/features/reviews/reviews.selectors';
import { FlatList, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function ProductReviewsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const productId = Number(id);
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectProductReviews(productId));
  const status = useAppSelector(selectProductReviewsStatus(productId));
  const summary = useAppSelector(selectProductSummary(productId));
  const [page, setPage] = useState(1);

  useEffect(() => { if (productId) { dispatch(fetchProductSummary(productId)); dispatch(fetchProductReviews({ productId, page: 1 }) as any); } }, [dispatch, productId]);

  return (
    <Screen>
      <Text weight="semiBold" style={{ fontSize: 22, marginBottom: 8 }}>Product reviews</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
        <RatingStars value={summary?.avg || 0} size={18} />
        <Text style={{ marginLeft: 8 }}>{(summary?.avg || 0).toFixed(1)} · {summary?.count || 0} reviews</Text>
      </View>
      <RatingDistribution summary={summary} />
      <View style={{ height: 12 }} />
      <ReviewForm onSubmit={(v) => dispatch(createProductReview({ productId, payload: v }) as any)} />
      <View style={{ height: 16 }} />
      {status === 'loading' && !items.length ? <Text>Loading…</Text> : (
        <FlatList
          data={items}
          keyExtractor={(x) => String(x.id)}
          renderItem={({ item }) => <ReviewCard item={item} onDelete={() => dispatch(deleteProductReview(item.id) as any)} />}
          ListEmptyComponent={<ReviewsEmpty />}
          onEndReachedThreshold={0.6}
          onEndReached={() => { const next = page + 1; setPage(next); dispatch(fetchProductReviews({ productId, page: next }) as any); }}
        />
      )}
    </Screen>
  );
}
