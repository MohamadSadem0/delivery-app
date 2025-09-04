import React, { PropsWithChildren } from 'react';
import { SafeAreaView, ViewStyle } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';

type Props = PropsWithChildren<{ style?: ViewStyle; padded?: boolean }>;

export default function Screen({ children, style, padded = true }: Props) {
  const { colors, spacing } = useTheme();
  return (
    <SafeAreaView style={[{ flex: 1, backgroundColor: colors.background, padding: padded ? spacing.lg : 0 }, style]}>
      {children}
    </SafeAreaView>
  );
}


