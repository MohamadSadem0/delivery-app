import React, { PropsWithChildren } from 'react';
import { View } from 'react-native';
import Text from '@/components/ui/Text';
import { useTheme } from '@/providers/ThemeProvider';

type Props = PropsWithChildren<{ title: string; subtitle?: string }>

export default function EmptyState({ title, subtitle, children }: Props) {
  const { spacing } = useTheme();
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', padding: spacing.xl }}>
      <Text style={{ fontSize: 18 }} weight="semiBold">{title}</Text>
      {subtitle ? <Text muted style={{ marginTop: spacing.xs, textAlign: 'center' }}>{subtitle}</Text> : null}
      {children}
    </View>
  );
}
