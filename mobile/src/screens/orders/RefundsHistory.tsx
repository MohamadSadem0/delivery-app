import React, { useEffect } from 'react';
import Screen from '@/components/layout/Screen';
import Text from '@/components/ui/Text';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchRefunds } from '@/features/orders/refunds/refundsSlice';
import { selectRefunds, selectRefundsStatus } from '@/features/orders/refunds/refunds.selectors';
import { FlatList, View } from 'react-native';

export default function RefundsHistoryScreen() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectRefunds);
  const status = useAppSelector(selectRefundsStatus);

  useEffect(() => { dispatch(fetchRefunds()); }, [dispatch]);

  return (
    <Screen>
      <Text style={{ fontSize: 22, marginBottom: 12 }} weight="semiBold">Refund requests</Text>
      {status === 'loading' ? <Text>Loading…</Text> : (
        <FlatList
          data={items}
          keyExtractor={(x) => String(x.id)}
          renderItem={({ item }) => (
            <View style={{ paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#ddd' }}>
              <Text>Order #{item.orderId}</Text>
              <Text muted>Status: {item.status}</Text>
              <Text>Amount: {Math.round(item.amount)} {item.currency} · Method: {item.method.replace('_',' ')}</Text>
              <Text muted>{new Date(item.createdAt).toLocaleString()}</Text>
            </View>
          )}
        />
      )}
    </Screen>
  );
}
