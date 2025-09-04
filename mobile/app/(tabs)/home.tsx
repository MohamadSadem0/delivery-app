import React, { useEffect, useState } from 'react';
import Screen from '@/components/layout/Screen';
import Text from '@/components/ui/Text';
import HomeHeader from '@/components/home/HomeHeader';
import CategoryGrid from '@/components/categories/CategoryGrid';
import VendorCarousel from '@/components/vendor/VendorCarousel';
import ProductCarousel from '@/components/catalog/ProductCarousel';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchCategories } from '@/features/categories/categoriesSlice';
import { selectCategories } from '@/features/categories/categories.selectors';
import { apiListVendors } from '@/features/vendors/vendors.api';
import type { Vendor } from '@/types/models/Vendor';
import type { Product } from '@/types/models/Product';
import { axiosInstance } from '@/api/axiosBase';
import { endpoints } from '@/api/endpoints';

export default function HomeScreen() {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const [topVendors, setTopVendors] = useState<Vendor[]>([]);
  const [featured, setFeatured] = useState<Product[]>([]);

  useEffect(() => { dispatch(fetchCategories()); }, [dispatch]);

  useEffect(() => {
    (async () => {
      const v = await apiListVendors({ page: 1, pageSize: 10, sort: 'rating_desc' });
      setTopVendors(v.data);
      const p = await axiosInstance.get(endpoints.catalog.products, { params: { page: 1, pageSize: 10, sort: 'top' } });
      setFeatured(p.data.data ?? p.data); // support {data:[]} or []
    })();
  }, []);

  return (
    <Screen>
      <HomeHeader />
      <Text weight="semiBold" style={{ fontSize: 18, marginBottom: 8 }}>Browse categories</Text>
      <CategoryGrid data={categories.slice(0, 8)} />
      <Text weight="semiBold" style={{ fontSize: 18, marginVertical: 8 }}>Top vendors</Text>
      <VendorCarousel data={topVendors} />
      <Text weight="semiBold" style={{ fontSize: 18, marginVertical: 8 }}>Featured products</Text>
      <ProductCarousel data={featured} />
    </Screen>
  );
}

