import React, { useState } from 'react';
import { View, TextInput } from 'react-native';
import Text from '@/components/ui/Text';
import { useTheme } from '@/providers/ThemeProvider';

type Props = {
  onChange?: (value: { number: string; exp: string; cvc: string }) => void;
};

export default function CardFieldLite({ onChange }: Props) {
  const { colors, spacing, radii } = useTheme();
  const [number, setNumber] = useState('');
  const [exp, setExp] = useState('');
  const [cvc, setCvc] = useState('');

  const inputStyle = {
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radii.md,
    color: colors.text,
    marginBottom: spacing.sm,
  } as const;

  return (
    <View>
      <Text muted>Development-only card inputs (replace with Stripe CardField in production)</Text>
      <TextInput placeholder="Card number" placeholderTextColor={colors.textMuted} keyboardType="number-pad" value={number} onChangeText={(t) => { setNumber(t); onChange?.({ number: t, exp, cvc }); }} style={inputStyle} />
      <TextInput placeholder="MM/YY" placeholderTextColor={colors.textMuted} keyboardType="number-pad" value={exp} onChangeText={(t) => { setExp(t); onChange?.({ number, exp: t, cvc }); }} style={inputStyle} />
      <TextInput placeholder="CVC" placeholderTextColor={colors.textMuted} keyboardType="number-pad" value={cvc} onChangeText={(t) => { setCvc(t); onChange?.({ number, exp, cvc: t }); }} style={inputStyle} />
    </View>
  );
}
