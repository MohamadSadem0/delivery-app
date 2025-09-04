import React from 'react';
import { Pressable, View } from 'react-native';
import { Image } from 'expo-image';
import Text from '@/components/ui/Text';
import Price from './Price';
import Card from '@/components/ui/Card';
import { useTheme } from '@/providers/ThemeProvider';
import type { Product } from '@/types/models/Product';
import { router } from 'expo-router';
import { routes } from '@/constants/routes';

type Props = { product: Product };

export default function ProductCard({ product }: Props) {
  const { radii, spacing } = useTheme();
  const img = product.imageUrl ?? require('@/../assets/images/placeholder-product.png');

  return (
    <Pressable onPress={() => router.push(routes.Catalog.Product(product.id))}>
      <Card style={{ padding: 0 }}>
        <Image
          source={img as any}
          contentFit="cover"
          style={{ width: '100%', height: 140, borderTopLeftRadius: radii.lg, borderTopRightRadius: radii.lg }}
        />
        <View style={{ padding: spacing.md }}>
          <Text numberOfLines={1} weight="semiBold">{product.name}</Text>
          <Price amount={product.price} currency={product.currency} />
        </View>
      </Card>
    </Pressable>
  );
}


