import React from 'react';
import { View } from 'react-native';
import Text from '@/components/ui/Text';
import { useTheme } from '@/providers/ThemeProvider';
import type { OrderStatus } from '@/types/models/Order';

const COLORS: Record<OrderStatus, string> = {
  pending: '#d1d5db',
  confirmed: '#60a5fa',
  preparing: '#f59e0b',
  out_for_delivery: '#34d399',
  delivered: '#10b981',
  cancelled: '#ef4444',
};

export default function OrderStatusBadge({ status }: { status: OrderStatus }) {
  const { spacing, radii, colors } = useTheme();
  const bg = COLORS[status] || colors.border;
  return (
    <View style={{ backgroundColor: bg, paddingHorizontal: spacing.sm, paddingVertical: spacing.xs, borderRadius: radii.pill }}>
      <Text style={{ color: '#fff' }}>{status.replaceAll('_', ' ')}</Text>
    </View>
  );
}


