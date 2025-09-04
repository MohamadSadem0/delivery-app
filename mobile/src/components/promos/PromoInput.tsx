import React, { useState } from 'react';
import { View, TextInput } from 'react-native';
import Text from '@/components/ui/Text';
import Button from '@/components/ui/Button';
import { useTheme } from '@/providers/ThemeProvider';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { applyPromoThunk, removePromoThunk } from '@/features/promos/promosSlice';
import { selectAppliedPromo, selectApplyingPromo, selectApplyPromoError } from '@/features/promos/promos.selectors';
import { MAX_PROMO_CODE_LEN } from '@/constants/promos';

type Props = { vendorId?: number; cartTotal: number; deliveryFee?: number; currency: 'LBP'|'USD' };

export default function PromoInput({ vendorId, cartTotal, deliveryFee, currency }: Props) {
  const { colors, spacing, radii } = useTheme();
  const dispatch = useAppDispatch();
  const applied = useAppSelector(selectAppliedPromo);
  const applying = useAppSelector(selectApplyingPromo);
  const error = useAppSelector(selectApplyPromoError);
  const [code, setCode] = useState('');

  const input = { borderWidth: 1, borderColor: colors.border, backgroundColor: colors.card, paddingHorizontal: spacing.md, paddingVertical: spacing.sm, borderRadius: radii.md, color: colors.text, flex: 1 } as const;

  return (
    <View style={{ gap: spacing.sm }}>
      <Text weight="semiBold">Promo code</Text>
      {applied ? (
        <View style={{ flexDirection: 'row', gap: spacing.sm, alignItems: 'center' }}>
          <Text>{applied.label || applied.code} â€” âˆ’{Math.round(applied.amountOff)} {applied.currency}</Text>
          <Button title="Remove" variant="outline" onPress={() => dispatch(removePromoThunk(applied.code) as any)} />
        </View>
      ) : (
        <View style={{ flexDirection: 'row', gap: spacing.sm }}>
          <TextInput
            value={code}
            onChangeText={(t) => setCode(t.slice(0, MAX_PROMO_CODE_LEN).toUpperCase())}
            placeholder="ENTER CODE"
            placeholderTextColor={colors.textMuted}
            autoCapitalize="characters"
            style={input}
          />
          <Button title={applying ? 'Applyingâ€¦' : 'Apply'} onPress={() => dispatch(applyPromoThunk({ code: code.trim(), vendorId, cartTotal, deliveryFee, currency }) as any)} disabled={!code.trim() || applying} />
        </View>
      )}
      {error ? <Text style={{ color: 'red' }}>{error}</Text> : null}
    </View>
  );
}


