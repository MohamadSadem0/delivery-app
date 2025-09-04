import React from 'react';
import { FlatList } from 'react-native';
import VendorCard from './VendorCard';
import type { Vendor } from '@/types/models/Vendor';

export default function VendorCarousel({ data }: { data: Vendor[] }) {
  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={data}
      keyExtractor={v => String(v.id)}
      renderItem={({ item }) => <VendorCard vendor={item} />}
      ItemSeparatorComponent={() => <></>}
    />
  );
}


