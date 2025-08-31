import React, { useEffect } from 'react';
import { FlatList } from 'react-native';
import Screen from '@/components/layout/Screen';
import Text from '@/components/ui/Text';
import OrderCard from '@/components/orders/OrderCard';
import EmptyState from '@/components/common/EmptyState';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchOrders } from '@/features/orders/ordersSlice';
import { selectOrders, selectOrdersStatus } from '@/features/orders/orders.selectors';

export default function OrdersTab() {
  const dispatch = useAppDispatch();
  const orders = useAppSelector(selectOrders);
  const status = useAppSelector(selectOrdersStatus);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  if (status === 'loading') {
    return <Screen><Text>Loading…</Text></Screen>;
  }

  if (!orders.length) {
    return (
      <Screen>
        <EmptyState title="No orders yet" subtitle="Your past orders will show up here." />
      </Screen>
    );
  }

  return (
    <Screen>
      <FlatList
        data={orders}
        keyExtractor={o => String(o.id)}
        renderItem={({ item }) => <OrderCard order={item} />}
      />
    </Screen>
  );
}
