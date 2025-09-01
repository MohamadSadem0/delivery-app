import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import Screen from '@/components/layout/Screen';
import CategoryChip from '@/components/catalog/CategoryChip';
import Text from '@/components/ui/Text';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchCategories, fetchProducts } from '@/features/catalog/catalogSlice';
import { selectCategories } from '@/features/catalog/catalog.selectors';

export default function CategoriesScreen() {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const [selected, setSelected] = useState<number | null>(null);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <Screen>
      <Text style={{ fontSize: 22, marginBottom: 12 }} weight="semiBold">Categories</Text>
      <FlatList
        horizontal
        contentContainerStyle={{ gap: 8 }}
        data={categories}
        keyExtractor={c => String(c.id)}
        renderItem={({ item }) => (
          <CategoryChip
            label={item.name}
            selected={selected === item.id}
            onPress={() => {
              const s = selected === item.id ? null : item.id;
              setSelected(s);
              dispatch(fetchProducts({ page: 1, pageSize: 20, categoryId: s ?? undefined }));
            }}
          />
        )}
      />
      <View style={{ height: 16 }} />
    </Screen>
  );
}
