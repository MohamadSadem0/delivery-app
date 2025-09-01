import React, { PropsWithChildren } from 'react';
import { View, ViewStyle } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';

type Props = PropsWithChildren<{ style?: ViewStyle }>;

export default function Card({ children, style }: Props) {
  const { colors, radii, shadows } = useTheme();
  return (
    <View
      style={[
        {
          backgroundColor: colors.card,
          borderRadius: radii.lg,
          padding: 16,
          ...(shadows.md as any),
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}
