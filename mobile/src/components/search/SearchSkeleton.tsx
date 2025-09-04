import React from 'react';
import { View } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';

export default function SearchSkeleton() {
  const { colors, spacing, radii } = useTheme();
  return (
    <View style={{ padding: spacing.md }}>
      {Array.from({ length: 6 }).map((_, i) => (
        <View key={i} style={{ height: 72, backgroundColor: colors.card, borderRadius: radii.md, marginBottom: spacing.md }} />
      ))}
    </View>
  );
}


