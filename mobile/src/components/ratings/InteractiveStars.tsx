import React from 'react';
import { View, Pressable } from 'react-native';
import Star from './Star';

export default function InteractiveStars({ value, onChange, size = 22 }: { value: number; onChange: (v: number) => void; size?: number }) {
  return (
    <View style={{ flexDirection: 'row' }}>
      {[1,2,3,4,5].map(i => (
        <Pressable key={i} onPress={() => onChange(i)} hitSlop={8}><Star filled={i <= value} size={size} /></Pressable>
      ))}
    </View>
  );
}


