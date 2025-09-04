import React, { useEffect } from 'react';
import { useLocalSearchParams } from 'expo-router';
import Screen from '@/components/layout/Screen';
import Text from '@/components/ui/Text';
import VendorHeader from '@/components/vendor/VendorHeader';
import ProductGrid from '@/components/catalog/ProductGrid';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchVendorById } from '@/features/vendors/vendorsSlice';
import { selectVendorById } from '@/features/vendors/vendors.selectors';
import { fetchProducts } from '@/features/catalog/catalogSlice';
import { selectProducts } from '@/features/catalog/catalog.selectors';

export default function VendorDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const vid = Number(id);
  const dispatch = useAppDispatch();
  const vendor = useAppSelector(selectVendorById(vid));
  const products = useAppSelector(selectProducts);

  useEffect(() => {
    if (!vendor && !Number.isNaN(vid)) dispatch(fetchVendorById(vid));
  }, [vid, vendor, dispatch]);

  useEffect(() => {
    if (!Number.isNaN(vid)) dispatch(fetchProducts({ page: 1, pageSize: 20, vendorId: vid }));
  }, [vid, dispatch]);

  if (!vid) return <Screen><Text>Invalid vendor.</Text></Screen>;
  if (!vendor) return <Screen><Text>Loading…</Text></Screen>;

  return (
    <Screen>
      <VendorHeader vendor={vendor} />
      <Text style={{ fontSize: 18, marginVertical: 12 }} weight="semiBold">Products</Text>
      <ProductGrid data={products} />
    </Screen>
  );
}
