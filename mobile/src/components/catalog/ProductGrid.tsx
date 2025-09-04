import React, { useMemo } from 'react';
import { FlatList, View } from 'react-native';
import ProductCard from './ProductCard';
import type { Product } from '@/types/models/Product';
import { useTheme } from '@/providers/ThemeProvider';

type Props = { data: Product[] };

export default function ProductGrid({ data }: Props) {
  const { spacing } = useTheme();
  const keyExtractor = (item: Product) => String(item.id);
  const numColumns = 2;
  const itemStyle = useMemo(() => ({ width: '100%' }), []);

  return (
    <FlatList
      data={data}
      keyExtractor={keyExtractor}
      numColumns={numColumns}
      columnWrapperStyle={{ gap: spacing.md }}
      contentContainerStyle={{ gap: spacing.md, paddingBottom: spacing['3xl'] }}
      renderItem={({ item }) => (
        <View style={{ flex: 1 }}>
          <ProductCard product={item} />
        </View>
      )}
    />
  );
}


