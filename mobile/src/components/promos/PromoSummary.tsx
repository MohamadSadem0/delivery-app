import React from 'react';
import { View } from 'react-native';
import Text from '@/components/ui/Text';
import { useAppSelector } from '@/store/hooks';
import { selectAppliedPromo } from '@/features/promos/promos.selectors';

export default function PromoSummary() {
  const applied = useAppSelector(selectAppliedPromo);
  if (!applied) return null;
  return (
    <View style={{ paddingVertical: 4 }}>
      <Text>-{Math.round(applied.amountOff)} {applied.currency} ({applied.label || applied.code})</Text>
    </View>
  );
}


