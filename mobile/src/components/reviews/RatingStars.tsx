import React from 'react';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function RatingStars({ value, size = 16 }: { value: number; size?: number }) {
  const full = Math.floor(value);
  const half = value - full >= 0.5;
  return (
    <View style={{ flexDirection: 'row' }}>
      {Array.from({ length: 5 }).map((_, i) => {
        const name = i < full ? 'star' : (i === full && half ? 'star-half' : 'star-outline');
        return <Ionicons key={i} name={name as any} size={size} color="#FFD54F" style={{ marginRight: 2 }} />;
      })}
    </View>
  );
}


