import React from 'react';
import { FlatList } from 'react-native';
import PromoBanner from './PromoBanner';
import type { Promotion } from '@/types/models/Promotion';

export default function PromoBannerCarousel({ data }: { data: Promotion[] }) {
  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={data}
      keyExtractor={p => String(p.id)}
      renderItem={({ item }) => <PromoBanner title={item.title} subtitle={item.subtitle || undefined} cta={'Shop'} />}
    />
  );
}


