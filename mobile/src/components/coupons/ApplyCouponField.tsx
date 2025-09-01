import { View, TextInput } from 'react-native';
import Button from '@/components/ui/Button';
import Text from '@/components/ui/Text';
import { useTheme } from '@/providers/ThemeProvider';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { applyCouponThunk, removeCouponThunk } from '@/features/coupons/couponsSlice';
import { selectAppliedCoupon, selectCouponDiscount } from '@/features/coupons/coupons.selectors';
import { useState } from 'react';

export default function ApplyCouponField({ contextPayload }: { contextPayload?: any }) {
  const { colors, spacing, radii } = useTheme();
  const [code, setCode] = useState('');
  const dispatch = useAppDispatch();
  const applied = useAppSelector(selectAppliedCoupon);
  const discount = useAppSelector(selectCouponDiscount);

  const inputStyle = { borderWidth: 1, borderColor: colors.border, backgroundColor: colors.card, paddingHorizontal: spacing.md, paddingVertical: spacing.sm, borderRadius: radii.md, color: colors.text, flex: 1 } as const;

  return (
    <View>
      {applied ? (
        <View style={{ marginVertical: spacing.sm }}>
          <Text>Coupon <Text weight="semiBold">{applied.code}</Text> applied. Discount: {discount.toFixed(0)} {applied.currency || ''}</Text>
          <Button title="Remove coupon" variant="outline" onPress={() => dispatch(removeCouponThunk())} />
        </View>
      ) : (
        <View style={{ flexDirection: 'row', gap: spacing.sm, alignItems: 'center' }}>
          <TextInput
            placeholder="Enter coupon"
            placeholderTextColor={colors.textMuted}
            value={code}
            onChangeText={setCode}
            style={inputStyle}
            autoCapitalize="characters"
          />
          <Button title="Apply" onPress={() => dispatch(applyCouponThunk({ code: code.trim(), payload: contextPayload }))} />
        </View>
      )}
    </View>
  );
}
