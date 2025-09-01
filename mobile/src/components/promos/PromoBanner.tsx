import React from 'react';
import { View } from 'react-native';
import Text from '@/components/ui/Text';
import Button from '@/components/ui/Button';
import { useTheme } from '@/providers/ThemeProvider';

export default function PromoBanner({ title, subtitle, cta, onPress }: { title: string; subtitle?: string; cta?: string; onPress?: () => void }) {
  const { colors, radii, spacing } = useTheme();
  return (
    <View style={{ backgroundColor: colors.card, borderRadius: radii.xl, padding: spacing.lg, marginVertical: spacing.md }}>
      <Text weight="semiBold" style={{ fontSize: 18 }}>{title}</Text>
      {subtitle ? <Text muted style={{ marginTop: 4 }}>{subtitle}</Text> : null}
      {onPress ? <Button title={cta || 'View'} onPress={onPress} style={{ marginTop: spacing.sm }} /> : null}
    </View>
  );
}
