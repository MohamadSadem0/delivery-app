import React from 'react';
import { View } from 'react-native';
import RatingStars from './RatingStars';
import Text from '@/components/ui/Text';

export default function SummaryHeader({ avg, count }: { avg: number; count: number }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <RatingStars value={avg} size={18} />
      <Text style={{ marginLeft: 8 }}>{avg.toFixed(1)} · {count} reviews</Text>
    </View>
  );
}
