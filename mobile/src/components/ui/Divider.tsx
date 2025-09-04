import React from 'react';
import { View } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';

export default function Divider() {
  const { colors } = useTheme();
  return <View style={{ height: 1, backgroundColor: colors.border, marginVertical: 8 }} />;
}


