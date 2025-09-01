import React from 'react';
import Screen from '@/components/layout/Screen';
import Text from '@/components/ui/Text';
import ApplyCouponField from '@/components/coupons/ApplyCouponField';

export default function CheckoutCouponScreen() {
  return (
    <Screen>
      <Text style={{ fontSize: 22, marginBottom: 12 }} weight="semiBold">Apply a coupon</Text>
      <ApplyCouponField />
    </Screen>
  );
}
