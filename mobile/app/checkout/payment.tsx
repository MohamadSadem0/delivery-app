import React, { useState } from 'react';
import Screen from '@/components/layout/Screen';
import Text from '@/components/ui/Text';
import Button from '@/components/ui/Button';
import { useLocalSearchParams, router } from 'expo-router';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectCartItems, selectCartTotal, selectCartDiscount } from '@/features/cart/cart.selectors';
import { clearCart } from '@/features/cart/cartSlice';
import { createOrderThunk } from '@/features/orders/ordersSlice';

export default function PaymentScreen() {
  const params = useLocalSearchParams();
  const total = useAppSelector(selectCartTotal);
  const discount = useAppSelector(selectCartDiscount);
  const items = useAppSelector(selectCartItems);
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
    const res = await dispatch(createOrderThunk({ address, paymentMethod: 'cod', couponCode: undefined }));
    setLoading(false);
    if ((res as any).type.endsWith('fulfilled')) {
      dispatch(clearCart());
      router.replace('/checkout/confirmation');
    }
  };

  return (
    <Screen>
      <Text style={{ fontSize: 22, marginBottom: 12 }} weight="semiBold">Payment</Text>
      <Text>Amount due: {total.toFixed(0)} LBP</Text>
      {discount ? <Text>Includes discount: -{discount.toFixed(0)} LBP</Text> : null}
      <Text style={{ marginTop: 12 }}>Method: Cash on Delivery</Text>
      <Button title="Place order" onPress={placeOrder} loading={loading} />
    </Screen>
  );
}
