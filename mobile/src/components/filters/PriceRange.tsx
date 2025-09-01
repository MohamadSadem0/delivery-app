import React, { useState } from 'react';
import { View, TextInput } from 'react-native';
import Text from '@/components/ui/Text';
import { useTheme } from '@/providers/ThemeProvider';

type Props = { min?: number | null; max?: number | null; onChange: (v: { min?: number | null; max?: number | null }) => void };

export default function PriceRange({ min, max, onChange }: Props) {
  const { spacing, colors, radii } = useTheme();
  const [minV, setMinV] = useState(min ?? '' as any);
  const [maxV, setMaxV] = useState(max ?? '' as any);

  const inputStyle = { borderWidth: 1, borderColor: colors.border, backgroundColor: colors.card, paddingHorizontal: spacing.md, paddingVertical: spacing.sm, borderRadius: radii.md, color: colors.text, width: 100 };

  return (
    <View style={{ flexDirection: 'row', gap: spacing.sm, alignItems: 'center' }}>
      <Text>LBP</Text>
      <TextInput keyboardType="number-pad" placeholder="min" placeholderTextColor={colors.textMuted} value={String(minV)} onChangeText={t => { setMinV(t); onChange({ min: t ? Number(t) : null, max: maxV ? Number(maxV) : null }); }} style={inputStyle} />
      <Text>—</Text>
      <TextInput keyboardType="number-pad" placeholder="max" placeholderTextColor={colors.textMuted} value={String(maxV)} onChangeText={t => { setMaxV(t); onChange({ min: minV ? Number(minV) : null, max: t ? Number(t) : null }); }} style={inputStyle} />
    </View>
  );
}
