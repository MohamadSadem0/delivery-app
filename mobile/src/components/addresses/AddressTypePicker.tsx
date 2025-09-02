import React from 'react';
import { View, Pressable } from 'react-native';
import Text from '@/components/ui/Text';
import { useTheme } from '@/providers/ThemeProvider';
import type { AddressType } from '@/types/models/Address';

export default function AddressTypePicker({ value, onChange }: { value: AddressType; onChange: (t: AddressType) => void }) {
  const { colors, spacing, radii } = useTheme();
  const options: AddressType[] = ['home', 'work', 'other'];
  return (
    <View style={{ flexDirection: 'row', gap: spacing.sm }}>
      {options.map(t => (
        <Pressable key={t} onPress={() => onChange(t)}
          style={{ paddingVertical: spacing.sm, paddingHorizontal: spacing.md, borderRadius: radii.pill,
                   borderWidth: 1, borderColor: colors.border, backgroundColor: value === t ? colors.card : 'transparent' }}>
          <Text style={{ textTransform: 'capitalize' }}>{t}</Text>
        </Pressable>
      ))}
    </View>
  );
}
