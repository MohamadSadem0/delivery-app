import React, { useEffect, useState } from 'react';
import Screen from '@/components/layout/Screen';
import Text from '@/components/ui/Text';
import Button from '@/components/ui/Button';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchCancelReasons, submitCancellation } from '@/features/orders/cancel/cancelSlice';
import { selectCancelReasons, selectCancelReasonsStatus, selectCancellationActing, selectCancellationError } from '@/features/orders/cancel/cancel.selectors';
import ReasonSelector from '@/components/orders/ReasonSelector';
import { useLocalSearchParams, router } from 'expo-router';
import { View, TextInput } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';

export default function CancelOrderScreen() {
  const { orderId } = useLocalSearchParams<{ orderId: string }>();
  const id = Number(orderId);
  const dispatch = useAppDispatch();
  const reasons = useAppSelector(selectCancelReasons(id));
  const reasonsStatus = useAppSelector(selectCancelReasonsStatus(id));
  const acting = useAppSelector(selectCancellationActing(id));
  const error = useAppSelector(selectCancellationError(id));
  const [selected, setSelected] = useState<string>();
  const [note, setNote] = useState('');
  const { colors, spacing, radii } = useTheme();

  useEffect(() => { if (id) dispatch(fetchCancelReasons(id)); }, [dispatch, id]);

  if (!id) return <Screen><Text>Invalid order</Text></Screen>;

  const canSubmit = !!selected && (reasons.find(r => r.code === selected)?.requiresNote ? note.trim().length >= 5 : true);

  return (
    <Screen>
      <Text style={{ fontSize: 22, marginBottom: 12 }} weight="semiBold">Cancel order #{id}</Text>
      {reasonsStatus === 'loading' ? <Text>Loading reasons…</Text> : <ReasonSelector reasons={reasons} selected={selected} onChange={setSelected} />}
      <View style={{ height: spacing.md }} />
      <Text muted>Extra details (optional)</Text>
      <TextInput
        value={note}
        onChangeText={setNote}
        placeholder="Tell us more…"
        placeholderTextColor={colors.textMuted}
        style={{ borderWidth: 1, borderColor: colors.border, backgroundColor: colors.card, borderRadius: radii.md, padding: spacing.md, minHeight: 88 }}
        multiline
      />
      {error ? <Text style={{ color: 'red', marginTop: spacing.sm }}>{error}</Text> : null}
      <View style={{ flexDirection: 'row', gap: spacing.sm, marginTop: spacing.lg }}>
        <Button title="Submit" onPress={async () => { await dispatch(submitCancellation({ orderId: id, reasonCode: selected!, note }) as any); router.back(); }} disabled={!canSubmit || acting} />
        <Button title="Keep order" variant="outline" onPress={() => router.back()} />
      </View>
    </Screen>
  );
}
