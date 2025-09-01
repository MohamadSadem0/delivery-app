import React from 'react';
import { Pressable } from 'react-native';
import Text from '@/components/ui/Text';
import { useTheme } from '@/providers/ThemeProvider';

type Props = { label: string; selected?: boolean; onPress?: () => void };

export default function CategoryChip({ label, selected, onPress }: Props) {
  const { colors, spacing, radii } = useTheme();
  return (
    <Pressable
      onPress={onPress}
      style={{
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
        backgroundColor: selected ? colors.primary : colors.surface,
        borderRadius: radii.pill,
        borderWidth: selected ? 0 : 1,
        borderColor: colors.border,
      }}
    >
      <Text style={{ color: selected ? '#fff' : colors.text }}>{label}</Text>
    </Pressable>
  );
}
