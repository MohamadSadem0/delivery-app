import React from 'react';
import { View, Pressable } from 'react-native';
import Text from '@/components/ui/Text';
import { useTheme } from '@/providers/ThemeProvider';

export default function RatingFilter({ value, onChange }: { value: number | null; onChange: (v: number | null) => void }) {
  const { spacing, colors, radii } = useTheme();
  const stars = [5,4,3,2,1];
  return (
    <View style={{ flexDirection: 'row', gap: spacing.sm }}>
      {stars.map(s => (
        <Pressable key={s} onPress={() => onChange(value === s ? null : s)} style={{ paddingHorizontal: spacing.md, paddingVertical: spacing.sm, borderRadius: radii.pill, borderWidth: 1, borderColor: value === s ? colors.primary : colors.border }}>
          <Text style={{ color: value === s ? colors.primary : colors.text }}>{'★'.repeat(s)}+</Text>
        </Pressable>
      ))}
    </View>
  );
}
