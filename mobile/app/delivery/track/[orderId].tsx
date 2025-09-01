import React, { useEffect } from 'react';
import { useLocalSearchParams } from 'expo-router';
import Screen from '@/components/layout/Screen';
import Text from '@/components/ui/Text';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { trackOrderThunk, fetchOrderById } from '@/features/orders/ordersSlice';
import { selectOrderById } from '@/features/orders/orders.selectors';

export default function TrackOrder() {
  const { orderId } = useLocalSearchParams<{ orderId: string }>();
  const id = Number(orderId);
  const dispatch = useAppDispatch();
  const order = useAppSelector(selectOrderById(id));

  useEffect(() => {
    if (!order && !Number.isNaN(id)) dispatch(fetchOrderById(id));
  }, [id, order, dispatch]);

  useEffect(() => {
    if (!Number.isNaN(id)) {
      const t = setInterval(() => dispatch(trackOrderThunk(id)), 10000);
      return () => clearInterval(t);
    }
  }, [id, dispatch]);

  if (!id) return <Screen><Text>Invalid order.</Text></Screen>;
  if (!order) return <Screen><Text>Loading…</Text></Screen>;

  return (
    <Screen>
      <Text style={{ fontSize: 22 }} weight="semiBold">Tracking Order #{order.code || order.id}</Text>
      <Text style={{ marginTop: 8 }}>Status: {order.status}</Text>
    </Screen>
  );
}
