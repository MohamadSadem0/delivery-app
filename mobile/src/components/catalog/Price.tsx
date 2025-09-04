import React from 'react';
import Text from '@/components/ui/Text';
import { formatMoney } from '@/utils/money';

type Props = { amount: number; currency: string; size?: number; muted?: boolean };

export default function Price({ amount, currency, size = 16, muted }: Props) {
  return <Text style={{ fontSize: size }} muted={muted}>{formatMoney(amount, currency)}</Text>;
}


