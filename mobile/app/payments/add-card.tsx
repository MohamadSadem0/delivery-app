import React, { useState } from 'react';
import Screen from '@/components/layout/Screen';
import Text from '@/components/ui/Text';
import Button from '@/components/ui/Button';
import CardFieldLite from '@/components/payments/CardFieldLite';
import { useAppDispatch } from '@/store/hooks';
import { saveCardThunk } from '@/features/payments/paymentsSlice';
import { router } from 'expo-router';

export default function AddCardScreen() {
  const dispatch = useAppDispatch();
  const [paymentMethodId, setPaymentMethodId] = useState<string | null>(null);

  // In production, use Stripe SDK to create a payment method id and set it here.
  const fakeCreatePaymentMethod = async () => {
    // Simulate an id
    const id = 'pm_' + Math.random().toString(36).slice(2);
    setPaymentMethodId(id);
    return id;
  };

  const onSave = async () => {
    const id = paymentMethodId || await fakeCreatePaymentMethod();
    const res = await dispatch(saveCardThunk({ paymentMethodId: id } as any));
    if ((res as any).type.endsWith('fulfilled')) {
      router.back();
    }
  };

  return (
    <Screen>
      <Text style={{ fontSize: 22, marginBottom: 12 }} weight="semiBold">Add card</Text>
      <CardFieldLite onChange={() => {}} />
      <Button title="Save card" onPress={onSave} />
    </Screen>
  );
}

