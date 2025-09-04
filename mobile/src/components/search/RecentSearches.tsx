import React from 'react';
import { View, Pressable } from 'react-native';
import Text from '@/components/ui/Text';
import { useTheme } from '@/providers/ThemeProvider';
import { useRecentSearches } from '@/services/searchHistory';

export default function RecentSearches({ onSelect }: { onSelect: (q: string) => void }) {
  const { colors, spacing } = useTheme();
  const { items, clear } = useRecentSearches();
  if (items.length === 0) return null;
  return (
    <View style={{ paddingHorizontal: spacing.md, paddingVertical: spacing.sm }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text muted>Recent searches</Text>
        <Pressable onPress={clear}><Text muted>Clear</Text></Pressable>
      </View>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: spacing.sm }}>
        {items.map((q, i) => (
          <Pressable key={i} onPress={() => onSelect(q)}>
            <View style={{ paddingVertical: 6, paddingHorizontal: 10, borderRadius: 16, backgroundColor: colors.card }}>
              <Text>{q}</Text>
            </View>
          </Pressable>
        ))}
      </View>
    </View>
  );
}


