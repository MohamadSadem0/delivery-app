import React, { useEffect } from 'react';
import Screen from '@/components/layout/Screen';
import Text from '@/components/ui/Text';
import ProductGrid from '@/components/catalog/ProductGrid';
import { useLocalSearchParams } from 'expo-router';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectCategoryById } from '@/features/categories/categories.selectors';
import { fetchCategoryById } from '@/features/categories/categoriesSlice';
import { fetchProducts } from '@/features/catalog/catalogSlice';
import { selectProducts } from '@/features/catalog/catalog.selectors';

export default function CategoryProducts() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const cid = Number(id);
  const dispatch = useAppDispatch();
  const category = useAppSelector(selectCategoryById(cid));
  const products = useAppSelector(selectProducts);

  useEffect(() => {
    if (!category && !Number.isNaN(cid)) dispatch(fetchCategoryById(cid));
  }, [cid, category, dispatch]);

  useEffect(() => {
    if (!Number.isNaN(cid)) dispatch(fetchProducts({ page: 1, pageSize: 20, categoryId: cid }));
  }, [cid, dispatch]);

  if (!cid) return <Screen><Text>Invalid category.</Text></Screen>;

  return (
    <Screen>
      <Text style={{ fontSize: 22, marginBottom: 12 }} weight="semiBold">{category?.name ?? 'Category'}</Text>
      <ProductGrid data={products} />
    </Screen>
  );
}
