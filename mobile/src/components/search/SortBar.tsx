import React from 'react';
import { View } from 'react-native';
import Text from '@/components/ui/Text';
import FilterChip from './FilterChip';
import { SEARCH_SORTS } from '@/constants/search';
import { useTheme } from '@/providers/ThemeProvider';

export default function SortBar({ current, onChange }: { current: string; onChange: (k: string) => void }) {
  const { spacing } = useTheme();
  return (
    <View style={{ flexDirection: 'row', paddingHorizontal: spacing.md, paddingVertical: spacing.sm }}>
      {SEARCH_SORTS.map(s => (
        <FilterChip key={s.key as string} label={s.label} active={current === s.key} onPress={() => onChange(s.key as any)} />
      ))}
    </View>
  );
}
