import React from 'react';
import { TextInput, View, TextInputProps } from 'react-native';
import Text from './Text';
import { useTheme } from '@/providers/ThemeProvider';

type Props = TextInputProps & {
  label?: string;
  errorText?: string;
};

export default function Input({ label, errorText, style, ...rest }: Props) {
  const { colors, spacing, radii } = useTheme();
  return (
    <View style={{ marginBottom: spacing.lg }}>
      {label ? <Text style={{ marginBottom: spacing.xs }}>{label}</Text> : null}
      <TextInput
        placeholderTextColor={colors.textMuted}
        style={[
          {
            borderWidth: 1,
            borderColor: errorText ? colors.danger : colors.border,
            borderRadius: radii.md,
            paddingHorizontal: spacing.md,
            paddingVertical: spacing.sm,
            color: colors.text,
            backgroundColor: colors.card,
          },
          style as any,
        ]}
        {...rest}
      />
      {errorText ? <Text style={{ color: colors.danger, marginTop: spacing.xs }}>{errorText}</Text> : null}
    </View>
  );
}
