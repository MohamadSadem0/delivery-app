import React, { useMemo, useState } from 'react';
import { View, TextInput } from 'react-native';
import Button from '@/components/ui/Button';
import Text from '@/components/ui/Text';
import { useTheme } from '@/providers/ThemeProvider';

function luhnValid(num: string) {
  const s = num.replace(/\s+/g, '');
  let sum = 0, dbl = false;
  for (let i = s.length - 1; i >= 0; i--) {
    let d = parseInt(s[i], 10);
    if (dbl) { d *= 2; if (d > 9) d -= 9; }
    sum += d; dbl = !dbl;
  }
  return sum % 10 === 0;
}

export default function AddCardForm({ onSubmit, disabled }: { onSubmit: (v: { number: string; expMonth: number; expYear: number; cvc: string; holderName?: string }) => void; disabled?: boolean }) {
  const { colors, spacing, radii } = useTheme();
  const [number, setNumber] = useState('');
  const [exp, setExp] = useState(''); // MM/YY
  const [cvc, setCvc] = useState('');
  const [holder, setHolder] = useState('');

  const input = { borderWidth: 1, borderColor: colors.border, backgroundColor: colors.card, paddingHorizontal: spacing.md, paddingVertical: spacing.sm, borderRadius: radii.md, color: colors.text } as const;
  const [mm, yy] = useMemo(() => { const m = exp.split('/'); return [parseInt(m[0]||'0',10), 2000 + parseInt(m[1]||'0',10)]; }, [exp]);
  const valid = number.replace(/\s+/g,'').length >= 13 && luhnValid(number) && mm >= 1 && mm <= 12 && yy >= 2024 && cvc.length >= 3;

  return (
    <View style={{ gap: spacing.sm }}>
      <TextInput value={holder} onChangeText={setHolder} placeholder="Card holder name" placeholderTextColor={colors.textMuted} style={input} />
      <TextInput value={number} onChangeText={setNumber} placeholder="Card number" keyboardType="number-pad" placeholderTextColor={colors.textMuted} style={input} />
      <View style={{ flexDirection: 'row', gap: spacing.sm }}>
        <TextInput value={exp} onChangeText={setExp} placeholder="MM/YY" keyboardType="number-pad" placeholderTextColor={colors.textMuted} style={[input, { flex: 1 }]} />
        <TextInput value={cvc} onChangeText={setCvc} placeholder="CVC" keyboardType="number-pad" placeholderTextColor={colors.textMuted} style={[input, { flex: 1 }]} />
      </View>
      <Button title="Add card" onPress={() => onSubmit({ number: number.replace(/\s+/g,''), expMonth: mm, expYear: yy, cvc, holderName: holder.trim() })} disabled={!valid || disabled} />
    </View>
  );
}
