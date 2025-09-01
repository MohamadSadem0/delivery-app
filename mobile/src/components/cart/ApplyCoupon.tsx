import React, { useState } from 'react';
import { View } from 'react-native';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Text from '@/components/ui/Text';
import { useTheme } from '@/providers/ThemeProvider';
import { applyCouponApi } from '@/features/cart/cart.api';
import { useAppDispatch } from '@/store/hooks';
import { applyCoupon } from '@/features/cart/cartSlice';

export default function ApplyCoupon() {
  const { spacing } = useTheme();
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  const onApply = async () => {
    setLoading(true); setError(null);
    try {
      const res = await applyCouponApi(code);
      dispatch(applyCoupon({ code, discountAmount: res.discountAmount }));
    } catch (e: any) {
      setError(e?.response?.data?.message || 'Invalid coupon');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ marginTop: spacing.md }}>
      <Input placeholder="Coupon code" value={code} onChangeText={setCode} />
      {error ? <Text style={{ color: 'red' }}>{error}</Text> : null}
      <Button title="Apply" onPress={onApply} loading={loading} />
    </View>
  );
}
