import React from 'react';
import { View, Image, Pressable } from 'react-native';
import Text from '@/components/ui/Text';
import { useTheme } from '@/providers/ThemeProvider';
import type { FavoriteProduct } from '@/types/models/Favorite';
import WishlistButton from './WishlistButton';
import { router } from 'expo-router';

export default function FavoriteProductCard({ item }: { item: FavoriteProduct }) {
  const { spacing, colors, radii } = useTheme();
  return (
    <Pressable onPress={() => router.push(`/products/${item.productId}`)}>
      <View style={{ backgroundColor: colors.card, borderRadius: radii.xl, padding: spacing.md, marginBottom: spacing.md }}>
        {item.thumbnail ? <Image source={{ uri: item.thumbnail }} style={{ width: '100%', height: 160, borderRadius: radii.lg }} /> : null}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: spacing.sm }}>
          <Text weight="semiBold" numberOfLines={1} style={{ flex: 1, marginRight: spacing.sm }}>{item.name}</Text>
          <WishlistButton productId={item.productId} />
        </View>
        <Text muted>{item.vendorName || ''}</Text>
        {item.price != null ? <Text style={{ marginTop: spacing.xs }}>{Math.round(item.price)} {item.currency}</Text> : null}
      </View>
    </Pressable>
  );
}


