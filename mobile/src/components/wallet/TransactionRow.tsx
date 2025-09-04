import React from 'react';
import { View } from 'react-native';
import Text from '@/components/ui/Text';
import { useTheme } from '@/providers/ThemeProvider';
import type { WalletTransaction } from '@/types/models/Payment';

export default function TransactionRow({ item }: { item: WalletTransaction }) {
  const { spacing, colors } = useTheme();
  const sign = item.direction === 'in' ? '+' : '-';
  const tone = item.direction === 'in' ? '#0a0' : '#a00';
  return (
    <View style={{ paddingVertical: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border }}>
      <Text weight="semiBold">{item.description || item.type}</Text>
      <Text muted style={{ marginTop: 2 }}>{new Date(item.createdAt).toLocaleString()} Â· {item.status || 'completed'}</Text>
      <Text style={{ marginTop: spacing.xs, color: tone }}>{sign}{Math.round(item.amount).toLocaleString()} {item.currency}</Text>
    </View>
  );
}


