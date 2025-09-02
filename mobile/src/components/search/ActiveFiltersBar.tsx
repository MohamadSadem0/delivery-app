import React from 'react';
import { View, Pressable } from 'react-native';
import Text from '@/components/ui/Text';
import { useTheme } from '@/providers/ThemeProvider';

export default function ActiveFiltersBar({ labels, onClearOne, onClearAll }: { labels: string[]; onClearOne: (label: string)=>void; onClearAll: ()=>void }) {
  const { colors, spacing, radii } = useTheme();
  if (labels.length === 0) return null;
  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, paddingHorizontal: spacing.md, paddingVertical: spacing.sm }}>
      {labels.map((l, i) => (
        <Pressable key={i} onPress={() => onClearOne(l)}>
          <View style={{ paddingVertical: 6, paddingHorizontal: 10, borderRadius: radii.pill, backgroundColor: colors.card }}>
            <Text>{l} ✕</Text>
          </View>
        </Pressable>
      ))}
      <Pressable onPress={onClearAll}><Text muted>Clear all</Text></Pressable>
    </View>
  );
}
