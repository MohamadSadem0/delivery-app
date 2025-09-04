import React, { useState } from 'react';
import Screen from '@/components/layout/Screen';
import Text from '@/components/ui/Text';
import Button from '@/components/ui/Button';
import RefundMethodPicker from '@/components/orders/RefundMethodPicker';
import { useTheme } from '@/providers/ThemeProvider';
import { View, TextInput } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { submitRefund } from '@/features/orders/refunds/refundsSlice';
import { selectRefundsActing, selectRefundsError } from '@/features/orders/refunds/refunds.selectors';

export default function RequestRefundScreen() {
  const { orderId, currency = 'LBP' } = useLocalSearchParams<{ orderId: string; currency?: 'LBP'|'USD' }>();
  const id = Number(orderId);
  const { colors, spacing, radii } = useTheme();
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState<'wallet'|'original'|'store_credit'>('wallet');
  const [reason, setReason] = useState('');
  const [note, setNote] = useState('');
  const dispatch = useAppDispatch();
  const acting = useAppSelector(selectRefundsActing);
  const error = useAppSelector(selectRefundsError);

  const amt = parseFloat(amount || '0');
  const canSubmit = id && amt > 0 && reason.trim().length >= 3;

  return (
    <Screen>
      <Text style={{ fontSize: 22, marginBottom: 12 }} weight="semiBold">Request refund</Text>
      <View style={{ gap: spacing.md }}>
        <View>
          <Text muted>Amount</Text>
          <TextInput value={amount} onChangeText={setAmount} placeholder="0" keyboardType="decimal-pad" placeholderTextColor={colors.textMuted} style={{ borderWidth: 1, borderColor: colors.border, backgroundColor: colors.card, borderRadius: radii.md, padding: spacing.md }} />
          <Text muted style={{ marginTop: 4 }}>Currency: {currency}</Text>
        </View>
        <View>
          <Text muted>Refund to</Text>
          <RefundMethodPicker value={method} onChange={setMethod} />
        </View>
        <View>
          <Text muted>Reason</Text>
          <TextInput value={reason} onChangeText={setReason} placeholder="e.g., Item missing, spoiled, wrong orderâ€¦" placeholderTextColor={colors.textMuted} style={{ borderWidth: 1, borderColor: colors.border, backgroundColor: colors.card, borderRadius: radii.md, padding: spacing.md }} />
        </View>
        <View>
          <Text muted>Extra details (optional)</Text>
          <TextInput value={note} onChangeText={setNote} placeholder="Describe the issueâ€¦" placeholderTextColor={colors.textMuted} style={{ borderWidth: 1, borderColor: colors.border, backgroundColor: colors.card, borderRadius: radii.md, padding: spacing.md, minHeight: 88 }} multiline />
        </View>
        {error ? <Text style={{ color: 'red' }}>{error}</Text> : null}
        <Button title="Submit" onPress={async () => { await dispatch(submitRefund({ orderId: id, amount: amt, currency: currency as any, method, reason, note }) as any); router.back(); }} disabled={!canSubmit || acting} />
      </View>
    </Screen>
  );
}


