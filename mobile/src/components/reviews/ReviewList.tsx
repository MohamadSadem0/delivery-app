import React from 'react';
import { FlatList } from 'react-native';
import type { Review } from '@/types/models/Review';
import ReviewItem from './ReviewItem';

export default function ReviewList({ data }: { data: Review[] }) {
  return (
    <FlatList
      data={data}
      keyExtractor={(r) => String(r.id)}
      renderItem={({ item }) => <ReviewItem item={item} />}
    />
  );
}
