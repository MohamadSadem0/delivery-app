import React, { useMemo, useState } from 'react';
import { View, TextInput, Pressable } from 'react-native';
import Button from '@/components/ui/Button';
import Text from '@/components/ui/Text';
import { useTheme } from '@/providers/ThemeProvider';
import { useAppSelector } from '@/store/hooks';
import { selectWalletMethods } from '@/features/wallet/wallet.selectors';

export default function TopUpWithdrawForm({ mode, onSubmit, disabled }: { mode: 'topup' | 'withdraw'; onSubmit: (v: { amount: number; methodId?: number }) => void; disabled?: boolean }) {
  const { colors, spacing, radii } = useTheme();
  const methods = useAppSelector(selectWalletMethods);
  const [amount, setAmount] = useState('');
  const [methodId, setMethodId] = useState<number | undefined>(methods.find(m => m.isDefault)?.id);
  const isTopUp = mode === 'topup';
  const usable = useMemo(() => methods.filter(m => (isTopUp ? m.type === 'card' : m.type !== 'card')), [isTopUp, methods]);
  const amt = parseFloat(amount || '0');

  const input = { borderWidth: 1, borderColor: colors.border, backgroundColor: colors.card, paddingHorizontal: spacing.md, paddingVertical: spacing.sm, borderRadius: radii.md, color: colors.text } as const;

  return (
    <View style={{ gap: spacing.md }}>
      <TextInput value={amount} onChangeText={setAmount} placeholder="Amount" keyboardType="decimal-pad" placeholderTextColor={colors.textMuted} style={input} />
      {isTopUp ? (
        <View>
          <Text muted>Select card</Text>
          {usable.map(m => (
            <Pressable key={m.id} onPress={() => setMethodId(m.id)} style={{ paddingVertical: spacing.sm }}>
              <Text>{m.brand?.toUpperCase() || m.label} •••• {m.last4}</Text>
              {methodId === m.id ? <Text muted>Selected</Text> : null}
            </Pressable>
          ))}
        </View>
      ) : null}
      <Button title={isTopUp ? 'Top up' : 'Withdraw'} onPress={() => onSubmit({ amount: amt, methodId })} disabled={amt <= 0 || (isTopUp && !methodId) || disabled} />
    </View>
  );
}
