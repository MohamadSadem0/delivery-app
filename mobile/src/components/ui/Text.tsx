import React from 'react';
import { Text as RNText, TextProps } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';

type Props = TextProps & { muted?: boolean; weight?: 'regular' | 'semiBold' };

export default function Text({ style, muted, weight = 'regular', ...rest }: Props) {
  const { colors, typography } = useTheme();
  return (
    <RNText
      style={[
        { color: muted ? colors.textMuted : colors.text, fontFamily: typography.family[weight === 'semiBold' ? 'semiBold' : 'regular'] },
        style,
      ]}
      {...rest}
    />
  );
}
