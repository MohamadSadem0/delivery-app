import React, { useState } from 'react';
import Screen from '@/components/layout/Screen';
import Text from '@/components/ui/Text';
import Button from '@/components/ui/Button';
import PaymentMethodPicker from '@/components/payments/PaymentMethodPicker';
import { useLocalSearchParams, router } from 'expo-router';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectCartItems, selectCartTotal, selectCartDiscount } from '@/features/cart/cart.selectors';
import { clearCart } from '@/features/cart/cartSlice';
import { createOrderThunk } from '@/features/orders/ordersSlice';
import { selectPaymentMethod } from '@/features/payments/payments.selectors';
import { createIntentThunk } from '@/features/payments/paymentsSlice';

export default function PaymentScreen() {
  const params = useLocalSearchParams();
  const total = useAppSelector(selectCartTotal);
  const discount = useAppSelector(selectCartDiscount);
  const items = useAppSelector(selectCartItems);
  const method = useAppSelector(selectPaymentMethod);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  const placeOrder = async () => {
    setLoading(true);
    const address = {
      fullName: String(params.fullName || ''),
      phone: String(params.phone || ''),
      city: String(params.city || ''),
      street: String(params.street || ''),
      building: String(params.building || ''),
      notes: String(params.notes || ''),
    };

    // If paying by card, request a payment intent first
    if (method === 'card') {
      const res = await dispatch(createIntentThunk({ amount: Math.round(total), currency: 'LBP' }));
      if ((res as any).type.endsWith('rejected')) {
        setLoading(false); return;
      }
      // In production: confirm via Stripe SDK using clientSecret
      // Then pass payment intent id to backend within createOrderThunk payload
    }

    const r = await dispatch(createOrderThunk({ address, paymentMethod: method, couponCode: undefined } as any));
    setLoading(false);
    if ((r as any).type.endsWith('fulfilled')) {
      dispatch(clearCart());
      router.replace('/checkout/confirmation');
    }
  };

  return (
    <Screen>
      <Text style={{ fontSize: 22, marginBottom: 12 }} weight="semiBold">Payment</Text>
      <Text>Amount due: {total.toFixed(0)} LBP</Text>
      {discount ? <Text>Includes discount: -{discount.toFixed(0)} LBP</Text> : null}
      <Text style={{ marginTop: 12, marginBottom: 8 }}>Choose payment method:</Text>
      <PaymentMethodPicker />
      <Button title={method === 'card' ? 'Pay & place order' : 'Place order'} onPress={placeOrder} loading={loading} />
    </Screen>
  );
}

