import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import Screen from '@/components/layout/Screen';
import Text from '@/components/ui/Text';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchOrderById } from '@/features/orders/ordersSlice';
import { selectOrderById } from '@/features/orders/orders.selectors';
import OrderStatusBadge from '@/components/orders/OrderStatusBadge';
import Divider from '@/components/ui/Divider';

export default function OrderDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const oid = Number(id);
  const dispatch = useAppDispatch();
  const order = useAppSelector(selectOrderById(oid));

  useEffect(() => {
    if (!order && !Number.isNaN(oid)) dispatch(fetchOrderById(oid));
  }, [oid, order, dispatch]);

  if (!oid) return <Screen><Text>Invalid order.</Text></Screen>;
  if (!order) return <Screen><Text>Loading…</Text></Screen>;

  return (
    <Screen>
      <Text style={{ fontSize: 22 }} weight="semiBold">Order #{order.code || order.id}</Text>
      <View style={{ height: 8 }} />
      <OrderStatusBadge status={order.status} />
      <Divider />
      <Text weight="semiBold">Items</Text>
      {order.items.map((it, idx) => (
        <View key={idx} style={{ marginVertical: 6 }}>
          <Text>{it.name} × {it.qty}</Text>
          <Text muted>{it.unitPrice.toFixed(0)} {it.currency}</Text>
        </View>
      ))}
      <Divider />
      <Text>Subtotal: {order.subtotal.toFixed(0)} {order.currency}</Text>
      <Text>Delivery: {order.deliveryFee.toFixed(0)} {order.currency}</Text>
      <Text>Discount: -{order.discount.toFixed(0)} {order.currency}</Text>
      <Text weight="semiBold">Total: {order.total.toFixed(0)} {order.currency}</Text>
    </Screen>
  );
}
