import React from 'react';
import { View } from 'react-native';
import Text from '@/components/ui/Text';

export default function RatingStars({ value, size = 14 }: { value: number; size?: number }) {
  const full = Math.floor(value);
  const half = value - full >= 0.5;
  const stars = '★★★★★'.slice(0, full) + (half ? '½' : '');
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Text style={{ fontSize: size }}>{stars}</Text>
      <Text style={{ marginLeft: 4 }} muted>{value.toFixed(1)}</Text>
    </View>
  );
}
