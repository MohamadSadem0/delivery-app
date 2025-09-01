import React from 'react';
import { View, Pressable } from 'react-native';
import Text from '@/components/ui/Text';
import { useTheme } from '@/providers/ThemeProvider';
import type { Coupon } from '@/types/models/Coupon';

export default function CouponRow({ item, onUse }: { item: Coupon; onUse?: () => void }) {
  const { spacing, colors, radii } = useTheme();
  return (
    <Pressable onPress={onUse}>
      <View style={{ paddingVertical: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border }}>
        <Text weight="semiBold">{item.code}</Text>
        {item.description ? <Text muted>{item.description}</Text> : null}
        {item.endsAt ? <Text muted>Valid until {new Date(item.endsAt).toLocaleDateString()}</Text> : null}
      </View>
    </Pressable>
  );
}
