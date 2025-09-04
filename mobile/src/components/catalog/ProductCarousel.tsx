import React from 'react';
import { FlatList, View } from 'react-native';
import ProductCard from '@/components/catalog/ProductCard';
import type { Product } from '@/types/models/Product';

export default function ProductCarousel({ data }: { data: Product[] }) {
  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={data}
      keyExtractor={p => String(p.id)}
      renderItem={({ item }) => <View style={{ width: 200, marginRight: 12 }}><ProductCard product={item} /></View>}
    />
  );
}


