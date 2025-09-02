import React from 'react';
import { FlatList } from 'react-native';
import type { Address } from '@/types/models/Address';
import AddressCard from './AddressCard';

export default function AddressList({
  data, onEdit, onDelete, onMakeDefault
}: { data: Address[]; onEdit: (id: number) => void; onDelete: (id: number) => void; onMakeDefault: (id: number) => void }) {
  return (
    <FlatList
      data={data}
      keyExtractor={(a) => String(a.id)}
      renderItem={({ item }) => (
        <AddressCard
          item={item}
          onEdit={() => onEdit(item.id)}
          onDelete={() => onDelete(item.id)}
          onMakeDefault={() => onMakeDefault(item.id)}
        />
      )}
    />
  );
}
