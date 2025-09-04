import React from 'react';
import { Pressable, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';
import Text from './Text';
import { useTheme } from '@/providers/ThemeProvider';

type Props = {
  title: string;
  onPress?: () => void;
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  variant?: 'primary' | 'outline' | 'ghost' | 'solid';
};

export default function Button({ title, onPress, loading, disabled, style, textStyle, variant = 'primary' }: Props) {
  const { colors, spacing, radii } = useTheme();
  const effectiveVariant = variant === 'solid' ? 'primary' : variant;
  const bg =
    effectiveVariant === 'primary' ? colors.primary : effectiveVariant === 'outline' ? 'transparent' : 'transparent';
  const borderColor = effectiveVariant === 'outline' ? colors.border : 'transparent';
  const textColor = effectiveVariant === 'primary' ? '#fff' : colors.text;

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        {
          backgroundColor: bg,
          paddingVertical: spacing.md,
          paddingHorizontal: spacing.lg,
          borderRadius: radii.md,
          borderWidth: effectiveVariant === 'outline' ? 1 : 0,
          borderColor,
          alignItems: 'center',
          justifyContent: 'center',
          opacity: disabled ? 0.6 : 1,
        },
        style,
      ]}
    >
      {loading ? <ActivityIndicator /> : <Text style={[{ color: textColor } as any, textStyle]}>{title}</Text>}
    </Pressable>
  );
}


