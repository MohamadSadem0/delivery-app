import React from 'react';
import { Pressable, View } from 'react-native';
import Text from '@/components/ui/Text';
import OrderStatusBadge from './OrderStatusBadge';
import { useTheme } from '@/providers/ThemeProvider';
import type { Order } from '@/types/models/Order';
import Card from '@/components/ui/Card';
import { router } from 'expo-router';

export default function OrderCard({ order }: { order: Order }) {
  const { spacing } = useTheme();

  return (
    <Pressable onPress={() => router.push(`/orders/${order.id}`)}>
      <Card>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text weight="semiBold">Order #{order.code || order.id}</Text>
          <OrderStatusBadge status={order.status} />
        </View>
        <View style={{ height: spacing.xs }} />
        <Text muted>{new Date(order.createdAt).toLocaleString()}</Text>
        <Text>Total: {order.total.toFixed(0)} {order.currency}</Text>
      </Card>
    </Pressable>
  );
}


