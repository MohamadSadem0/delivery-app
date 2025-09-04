import React from 'react';
import { FlatList } from 'react-native';
import type { Coupon } from '@/types/models/Promo';
import CouponCard from './CouponCard';

export default function CouponList({ data, onApply }: { data: Coupon[]; onApply?: (code: string) => void }) {
  return (
    <FlatList
      data={data}
      keyExtractor={(c) => String(c.id)}
      renderItem={({ item }) => <CouponCard item={item} onApply={onApply} />}
    />
  );
}


