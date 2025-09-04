import React from 'react';
import { View } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';

type Props = { height?: number; width?: number | string; radius?: number; style?: any };

export default function Skeleton({ height = 16, width = '100%', radius, style }: Props) {
  const { colors, radii } = useTheme();
  return <View style={[{ height, width, backgroundColor: colors.surface, borderRadius: radius ?? radii.md, opacity: 0.6 }, style]} />;
}


