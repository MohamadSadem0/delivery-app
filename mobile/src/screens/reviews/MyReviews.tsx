import React from 'react';
import Screen from '@/components/layout/Screen';
import Text from '@/components/ui/Text';
import { useAppSelector } from '@/store/hooks';
import { FlatList } from 'react-native';
import ReviewCard from '@/components/reviews/ReviewCard';

export default function MyReviewsScreen() {
  const items = useAppSelector((s) => (s as any).me?.reviews || []);
  return (
    <Screen>
      <Text weight="semiBold" style={{ fontSize: 22, marginBottom: 8 }}>My reviews</Text>
      <FlatList data={items} keyExtractor={(x:any)=>String(x.id)} renderItem={({ item }) => <ReviewCard item={item} />} />
    </Screen>
  );
}


