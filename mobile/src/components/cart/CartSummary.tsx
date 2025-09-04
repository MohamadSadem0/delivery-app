import React from 'react';
import { View } from 'react-native';
import Text from '@/components/ui/Text';
import Button from '@/components/ui/Button';
import { useTheme } from '@/providers/ThemeProvider';
import { useAppSelector } from '@/store/hooks';
import { selectCartSubtotal, selectCartDeliveryFee, selectCartDiscount, selectCartTotal } from '@/features/cart/cart.selectors';
import { router } from 'expo-router';
import { routes } from '@/constants/routes';

export default function CartSummary() {
  const { spacing } = useTheme();
  const sub = useAppSelector(selectCartSubtotal);
  const fee = useAppSelector(selectCartDeliveryFee);
  const disc = useAppSelector(selectCartDiscount);
  const tot = useAppSelector(selectCartTotal);

  return (
    <View style={{ gap: spacing.sm, marginTop: spacing.md }}>
      <Row label="Subtotal" value={sub} />
      <Row label="Delivery" value={fee} />
      <Row label="Discount" value={-disc} />
      <Row label="Total" value={tot} bold />
      <Button title="Checkout" onPress={() => router.push(routes.Checkout.Address)} />
    </View>
  );
}

function Row({ label, value, bold = false }: { label: string; value: number; bold?: boolean }) {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      <Text weight={bold ? 'semiBold' : 'regular'}>{label}</Text>
      <Text weight={bold ? 'semiBold' : 'regular'}>{value.toFixed(0)} LBP</Text>
    </View>
  );
}


