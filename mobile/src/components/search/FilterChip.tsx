import React from 'react';
import { Pressable, View } from 'react-native';
import Text from '@/components/ui/Text';
import { useTheme } from '@/providers/ThemeProvider';

export default function FilterChip({ label, active, onPress }: { label: string; active?: boolean; onPress?: () => void }) {
  const { colors, spacing, radii } = useTheme();
  return (
    <Pressable onPress={onPress}>
      <View style={{ paddingVertical: 6, paddingHorizontal: 10, borderRadius: radii.pill, backgroundColor: active ? colors.primary : colors.card, marginRight: spacing.sm }}>
        <Text style={{ color: active ? 'white' : colors.text }}>{label}</Text>
      </View>
    </Pressable>
  );
}
