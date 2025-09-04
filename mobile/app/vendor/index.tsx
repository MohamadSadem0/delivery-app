import React, { useEffect, useState } from 'react';
import Screen from '@/components/layout/Screen';
import Text from '@/components/ui/Text';
import VendorCard from '@/components/vendor/VendorCard';
import VendorFilterBar from '@/components/vendor/VendorFilterBar';
import InfiniteList from '@/components/common/InfiniteList';
import { useAppSelector } from '@/store/hooks';
import { selectPrefs } from '@/features/preferences/preferences.selectors';
import { apiListVendors } from '@/features/vendors/vendors.api';
import type { Vendor } from '@/types/models/Vendor';

export default function VendorsList() {
  const prefs = useAppSelector(selectPrefs);
  const [items, setItems] = useState<Vendor[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const load = async (nextPage = 1) => {
    if (loading) return;
    setLoading(true);
    try {
      const res = await apiListVendors({ page: nextPage, pageSize: 10, sort: 'rating_desc' });
      setItems(prev => nextPage === 1 ? res.data : [...prev, ...res.data]);
      setTotal(res.meta?.total ?? null);
      setPage(nextPage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(1); }, [prefs.currency]);

  const canLoadMore = total == null ? true : items.length < total;

  return (
    <Screen>
      <Text style={{ fontSize: 22, marginBottom: 12 }} weight="semiBold">Vendors</Text>
      <VendorFilterBar />
      <InfiniteList
        data={items}
        keyExtractor={v => String(v.id)}
        renderItem={({ item }) => <VendorCard vendor={item} />}
        onEndReached={() => canLoadMore && load(page + 1)}
        loading={loading}
      />
    </Screen>
  );
}

