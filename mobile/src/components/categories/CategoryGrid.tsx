import React from 'react';
import { FlatList } from 'react-native';
import type { Category } from '@/types/models/Category';
import CategoryPill from './CategoryPill';

export default function CategoryGrid({ data }: { data: Category[] }) {
  return (
    <FlatList
      data={data}
      keyExtractor={c => String(c.id)}
      renderItem={({ item }) => <CategoryPill item={item} />}
      numColumns={4}
      columnWrapperStyle={{ justifyContent: 'space-between' }}
    />
  );
}


