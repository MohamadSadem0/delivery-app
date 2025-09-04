import React from 'react';
import { Pressable } from 'react-native';
import Text from '@/components/ui/Text';
import { useTheme } from '@/providers/ThemeProvider';

type Props = { label: string; active?: boolean; onPress?: () => void };

export default function FilterChip({ label, active, onPress }: Props) {
  const { colors, spacing, radii } = useTheme();
  return (
    <Pressable
      onPress={onPress}
      style={{
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
        borderRadius: radii.pill,
        backgroundColor: active ? colors.primary : colors.surface,
        borderWidth: active ? 0 : 1,
        borderColor: colors.border,
      }}
    >
      <Text style={{ color: active ? '#fff' : colors.text }}>{label}</Text>
    </Pressable>
  );
}


