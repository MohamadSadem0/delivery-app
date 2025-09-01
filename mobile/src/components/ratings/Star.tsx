import React from 'react';
import { Text } from 'react-native';
export default function Star({ filled, size = 18 }: { filled: boolean; size?: number }) {
  return <Text style={{ fontSize: size, lineHeight: size + 2 }}>{filled ? '★' : '☆'}</Text>;
}
