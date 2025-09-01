import React from 'react';
import { View } from 'react-native';
import Text from '@/components/ui/Text';
import Button from '@/components/ui/Button';
import { useTheme } from '@/providers/ThemeProvider';
import type { Coupon } from '@/types/models/Promo';

export default function CouponCard({ item, onApply }: { item: Coupon; onApply?: (code: string) => void }) {
  const { spacing, colors, radii } = useTheme();
  return (
    <View style={{ backgroundColor: colors.card, borderRadius: radii.xl, padding: spacing.lg, marginBottom: spacing.md }}>
      <Text weight="semiBold">{item.title}</Text>
      {item.description ? <Text muted style={{ marginTop: spacing.xs }}>{item.description}</Text> : null}
      <Text muted style={{ marginTop: spacing.xs }}>{item.type === 'percentage' ? `${item.value}% off` : `-${Math.round(item.value)} ${item.currency || ''}`}</Text>
      <View style={{ flexDirection: 'row', gap: spacing.sm, marginTop: spacing.sm }}>
        <Button title="Apply" onPress={() => onApply && onApply(item.code)} />
        <Text muted>Code: {item.code}</Text>
      </View>
    </View>
  );
}
