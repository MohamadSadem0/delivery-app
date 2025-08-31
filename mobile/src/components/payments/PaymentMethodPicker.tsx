import React from 'react';
import { View, Pressable } from 'react-native';
import Text from '@/components/ui/Text';
import { useTheme } from '@/providers/ThemeProvider';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectPaymentMethod } from '@/features/payments/payments.selectors';
import { setMethod } from '@/features/payments/paymentsSlice';

function Option({ label, selected, onPress }: { label: string; selected: boolean; onPress: () => void }) {
  const { colors, spacing, radii } = useTheme();
  return (
    <Pressable
      onPress={onPress}
      style={{ padding: spacing.md, borderWidth: 1, borderColor: selected ? colors.primary : colors.border, borderRadius: radii.md }}
    >
      <Text style={{ color: selected ? colors.primary : colors.text }}>{label}</Text>
    </Pressable>
  );
}

export default function PaymentMethodPicker() {
  const { spacing } = useTheme();
  const dispatch = useAppDispatch();
  const method = useAppSelector(selectPaymentMethod);

  return (
    <View style={{ flexDirection: 'row', gap: spacing.md }}>
      <Option label="Cash on Delivery" selected={method === 'cod'} onPress={() => dispatch(setMethod('cod'))} />
      <Option label="Card" selected={method === 'card'} onPress={() => dispatch(setMethod('card'))} />
    </View>
  );
}
