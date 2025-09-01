import React from 'react';
import { View, Pressable } from 'react-native';
import { Image } from 'expo-image';
import Text from '@/components/ui/Text';
import Price from '@/components/catalog/Price';
import Quantity from '@/components/ui/Quantity';
import Divider from '@/components/ui/Divider';
import { useTheme } from '@/providers/ThemeProvider';
import { useAppDispatch } from '@/store/hooks';
import { setQuantity, removeItem } from '@/features/cart/cartSlice';
import type { CartItem } from '@/features/cart/cart.types';

type Props = { item: CartItem };

export default function CartItemRow({ item }: Props) {
  const { spacing, radii, colors } = useTheme();
  const dispatch = useAppDispatch();

  return (
    <View style={{ paddingVertical: spacing.md }}>
      <View style={{ flexDirection: 'row', gap: spacing.md }}>
        <Image
          source={item.imageUrl ?? require('@/../assets/images/placeholder-product.png')}
          style={{ width: 72, height: 72, borderRadius: radii.md }}
          contentFit="cover"
        />
        <View style={{ flex: 1, justifyContent: 'space-between' }}>
          <Text numberOfLines={2} weight="semiBold">{item.name}</Text>
          <Price amount={item.unitPrice} currency={item.currency} />
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Quantity value={item.qty} onChange={q => dispatch(setQuantity({ productId: item.productId, qty: q }))} />
            <Pressable onPress={() => dispatch(removeItem(item.productId))}>
              <Text style={{ color: colors.danger }}>Remove</Text>
            </Pressable>
          </View>
        </View>
      </View>
      <Divider />
    </View>
  );
}
