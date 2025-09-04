import React from 'react';
import { View, Pressable } from 'react-native';
import Text from '@/components/ui/Text';
import { useTheme } from '@/providers/ThemeProvider';
import type { RefundMethod } from '@/types/models/Refund';

export default function RefundMethodPicker({ value, onChange }: { value: RefundMethod; onChange: (m: RefundMethod) => void }) {
  const { colors, spacing, radii } = useTheme();
  const methods: RefundMethod[] = ['wallet', 'original', 'store_credit'];
  return (
    <View style={{ flexDirection: 'row', gap: spacing.sm }}>
      {methods.map(m => (
        <Pressable key={m} onPress={() => onChange(m)} style={{ paddingVertical: spacing.sm, paddingHorizontal: spacing.md, borderRadius: radii.pill, borderWidth: 1, borderColor: colors.border, backgroundColor: value === m ? colors.card : 'transparent' }}>
          <Text style={{ textTransform: 'capitalize' }}>{m.replace('_', ' ')}</Text>
        </Pressable>
      ))}
    </View>
  );
}


