import React, { useEffect } from 'react';
import Screen from '@/components/layout/Screen';
import ProductGrid from '@/components/catalog/ProductGrid';
import Text from '@/components/ui/Text';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchProducts, fetchCategories } from '@/features/catalog/catalogSlice';
import { selectProducts, selectCatalogStatus } from '@/features/catalog/catalog.selectors';

export default function HomeTab() {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);
  const status = useAppSelector(selectCatalogStatus);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchProducts({ page: 1, pageSize: 20 }));
  }, [dispatch]);

  return (
    <Screen>
      <Text style={{ fontSize: 22, marginBottom: 12 }} weight="semiBold">Featured products</Text>
      {status === 'loading' ? <Text>Loading…</Text> : <ProductGrid data={products} />}
    </Screen>
  );
}
