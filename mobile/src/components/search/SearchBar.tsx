import React, { useState, useEffect } from 'react';
import { TextInput, View } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';

type Props = { value: string; onChange: (v: string) => void; placeholder?: string };

export default function SearchBar({ value, onChange, placeholder = 'Search products' }: Props) {
  const { colors, spacing, radii } = useTheme();
  const [text, setText] = useState(value);

  useEffect(() => {
    const t = setTimeout(() => onChange(text), 300);
    return () => clearTimeout(t);
  }, [text]);

  return (
    <View style={{ marginBottom: spacing.md }}>
      <TextInput
        value={text}
        onChangeText={setText}
        placeholder={placeholder}
        placeholderTextColor={colors.textMuted}
        style={{
          borderWidth: 1,
          borderColor: colors.border,
          backgroundColor: colors.card,
          paddingHorizontal: spacing.md,
          paddingVertical: spacing.sm,
          borderRadius: radii.md,
          color: colors.text,
        }}
      />
    </View>
  );
}
