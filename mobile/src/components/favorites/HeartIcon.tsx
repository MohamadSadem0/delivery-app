import React from 'react';
import { Ionicons } from '@expo/vector-icons';

export default function HeartIcon({ filled, size = 22, color }: { filled?: boolean; size?: number; color?: string }) {
  return <Ionicons name={filled ? 'heart' : 'heart-outline'} size={size} color={color || (filled ? '#e53935' : '#555')} />;
}
