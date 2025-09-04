import React from 'react';
import { View } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import Text from '@/components/ui/Text';

export default function RatingBar({ label, pct }: { label: string; pct: number }) {
  const { colors, radii, spacing } = useTheme();
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
      <Text style={{ width: 28 }}>{label}</Text>
      <View style={{ flex: 1, height: 8, borderRadius: radii.pill, backgroundColor: colors.border, overflow: 'hidden', marginHorizontal: spacing.sm }}>
        <View style={{ width: `${Math.min(100, Math.max(0, pct))}%`, height: '100%', backgroundColor: '#FFD54F' }} />
      </View>
      <Text muted>{Math.round(pct)}%</Text>
    </View>
  );
}


