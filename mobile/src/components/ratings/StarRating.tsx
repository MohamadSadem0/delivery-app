import React, { memo } from 'react';
import { View } from 'react-native';
import Star from './Star';

function _StarRating({ value, size = 16 }: { value: number; size?: number }) {
  const v = Math.round(value);
  return (
    <View style={{ flexDirection: 'row' }}>
      {[1,2,3,4,5].map(i => <Star key={i} filled={i <= v} size={size} />)}
    </View>
  );
}
export default memo(_StarRating);
