import React, { useEffect } from 'react';
import Screen from '@/components/layout/Screen';
import Text from '@/components/ui/Text';
import CategoryGrid from '@/components/categories/CategoryGrid';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchCategories } from '@/features/categories/categoriesSlice';
import { selectCategories, selectCategoriesStatus } from '@/features/categories/categories.selectors';

export default function CategoriesIndex() {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const status = useAppSelector(selectCategoriesStatus);

  useEffect(() => { dispatch(fetchCategories()); }, [dispatch]);

  return (
    <Screen>
      <Text style={{ fontSize: 22, marginBottom: 12 }} weight="semiBold">Categories</Text>
      {status === 'loading' ? <Text>Loading…</Text> : <CategoryGrid data={categories} />}
    </Screen>
  );
}
