import React from 'react';
import { View } from 'react-native';
import Text from '@/components/ui/Text';

export default function RefundLineItem({ label, amount, currency }: { label: string; amount: number; currency: 'LBP'|'USD' }) {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 6 }}>
      <Text>{label}</Text>
      <Text>âˆ’{Math.round(amount)} {currency}</Text>
    </View>
  );
}


