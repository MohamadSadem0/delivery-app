import React from 'react';
import { FlatList, View } from 'react-native';
import Screen from '@/components/layout/Screen';
import Text from '@/components/ui/Text';
import CartItemRow from '@/components/cart/CartItemRow';
import CartSummary from '@/components/cart/CartSummary';
import ApplyCoupon from '@/components/cart/ApplyCoupon';
import { useAppSelector } from '@/store/hooks';
import { selectCartItems } from '@/features/cart/cart.selectors';

export default function CartTab() {
  const items = useAppSelector(selectCartItems);

  return (
    <Screen>
      <Text style={{ fontSize: 22, marginBottom: 12 }} weight="semiBold">Your cart</Text>
      {items.length === 0 ? (
        <Text muted>Your cart is empty.</Text>
      ) : (
        <>
          <FlatList
            data={items}
            keyExtractor={i => String(i.productId)}
            renderItem={({ item }) => <CartItemRow item={item} />}
          />
          <ApplyCoupon />
          <View style={{ height: 12 }} />
          <CartSummary />
        </>
      )}
    </Screen>
  );
}

