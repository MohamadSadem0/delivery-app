import React from 'react';
import { View, Image, Pressable } from 'react-native';
import Text from '@/components/ui/Text';
import { useTheme } from '@/providers/ThemeProvider';
import type { ProductHit } from '@/types/models/Search';
import { navToProduct } from '@/utils/navigation';
import { formatPrice } from '@/utils/price';

export default function ProductGridItem({ item }: { item: ProductHit }) {
  const { colors, spacing, radii } = useTheme();
  return (
    <Pressable onPress={() => navToProduct(item.id)}>
      <View style={{ flex: 1, margin: spacing.sm }}>
        {item.image ? <Image source={{ uri: item.image }} style={{ width: '100%', height: 140, borderRadius: radii.md }} /> : null}
        <Text numberOfLines={2} style={{ marginTop: 6 }}>{item.name}</Text>
        <Text weight="semiBold">{formatPrice(item.price, item.currency)}</Text>
      </View>
    </Pressable>
  );
}


