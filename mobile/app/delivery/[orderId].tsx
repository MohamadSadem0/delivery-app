import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import Screen from '@/components/layout/Screen';
import Text from '@/components/ui/Text';
import Button from '@/components/ui/Button';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchOrderById } from '@/features/orders/ordersSlice';
import { selectOrderById } from '@/features/orders/orders.selectors';
import OrderStatusBadge from '@/components/orders/OrderStatusBadge';
import Divider from '@/components/ui/Divider';
import OrderEta from '@/components/orders/OrderEta';

export default function OrderDetailTracking() {
  const { orderId } = useLocalSearchParams<{ orderId: string }>();
  const id = Number(orderId);
  const dispatch = useAppDispatch();
  const order = useAppSelector(selectOrderById(id));

  useEffect(() => {
    if (!order && !Number.isNaN(id)) dispatch(fetchOrderById(id));
  }, [id, order, dispatch]);

  if (!id) return <Screen><Text>Invalid order.</Text></Screen>;
  if (!order) return <Screen><Text>Loading…</Text></Screen>;

  return (
    <Screen>
      <Text style={{ fontSize: 22 }} weight="semiBold">Order #{order.code || order.id}</Text>
      <View style={{ height: 8 }} />
      <OrderStatusBadge status={order.status} />
      <Divider />
      <OrderEta orderId={id} destination={{ lat: order.address?.lat, lng: order.address?.lng }} />
      <Button title="Open map view" onPress={() => router.push(`/delivery/track/map/${id}`)} />
    </Screen>
  );
}
