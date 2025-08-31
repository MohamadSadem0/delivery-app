import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import Screen from '@/components/layout/Screen';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchProductById } from '@/features/catalog/catalogSlice';
import { selectProductById } from '@/features/catalog/catalog.selectors';
import Text from '@/components/ui/Text';
import Price from '@/components/catalog/Price';
import Button from '@/components/ui/Button';
import FavoriteButton from '@/components/common/FavoriteButton';
import { Image } from 'expo-image';
import { useTheme } from '@/providers/ThemeProvider';
import { addItem } from '@/features/cart/cartSlice';

export default function ProductDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const pid = Number(id);
  const dispatch = useAppDispatch();
  const product = useAppSelector(selectProductById(pid));
  const { radii, spacing } = useTheme();

  useEffect(() => {
    if (!product && !Number.isNaN(pid)) dispatch(fetchProductById(pid));
  }, [pid, product, dispatch]);

  if (!pid) return <Screen><Text>Invalid product.</Text></Screen>;
  if (!product) return <Screen><Text>Loading…</Text></Screen>;

  const onAdd = () => {
    dispatch(addItem({
      productId: product.id,
      vendorId: product.vendorId ?? null,
      name: product.name,
      imageUrl: product.imageUrl ?? null,
      unitPrice: product.price,
      currency: product.currency,
      qty: 1,
    }));
  };

  return (
    <Screen>
      <Image
        source={product.imageUrl ?? require('@/../assets/images/placeholder-product.png')}
        style={{ width: '100%', height: 220, borderRadius: radii.lg }}
        contentFit="cover"
      />
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: spacing.sm }}>
        <Text style={{ fontSize: 24 }} weight="semiBold">{product.name}</Text>
        <FavoriteButton productId={product.id} />
      </View>
      <Price amount={product.price} currency={product.currency} size={18} />
      {product.description ? <Text style={{ marginTop: 12 }}>{product.description}</Text> : null}
      <View style={{ height: spacing.lg }} />
      <Button title="Add to cart" onPress={onAdd} />
    </Screen>
  );
}
