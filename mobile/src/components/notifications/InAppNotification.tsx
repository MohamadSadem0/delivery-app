import React from 'react';
import { View } from 'react-native';
import Text from '@/components/ui/Text';
import { useTheme } from '@/providers/ThemeProvider';

export default function InAppNotification({ title, body }: { title: string; body?: string }) {
  const { colors, spacing, radii } = useTheme();
  return (
    <View style={{ position: 'absolute', top: spacing.lg, left: spacing.lg, right: spacing.lg, backgroundColor: colors.card, borderRadius: radii.xl, padding: spacing.md, shadowColor: '#000', shadowOpacity: 0.15, shadowRadius: 12, elevation: 3 }}>
      <Text weight="semiBold">{title}</Text>
      {body ? <Text muted>{body}</Text> : null}
    </View>
  );
}


