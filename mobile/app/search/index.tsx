import React, { useEffect, useState } from 'react';
import Screen from '@/components/layout/Screen';
import Text from '@/components/ui/Text';
import SearchBar from '@/components/search/SearchBar';
import ProductGrid from '@/components/catalog/ProductGrid';
import { searchProducts } from '@/services/search/search.api';
import type { Product } from '@/types/models/Product';

export default function SearchScreen() {
  const [q, setQ] = useState('');
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let alive = true;
    const run = async () => {
      if (!q) { setItems([]); return; }
      setLoading(true);
      try {
        const res = await searchProducts(q, 1, 20);
        if (alive) setItems(res.data);
      } finally {
        if (alive) setLoading(false);
      }
    };
    run();
    return () => { alive = False; };
  }, [q]);

  return (
    <Screen>
      <Text style={{ fontSize: 22, marginBottom: 12 }} weight="semiBold">Search</Text>
      <SearchBar value={q} onChange={setQ} />
      {loading ? <Text>Searching…</Text> : <ProductGrid data={items} />}
    </Screen>
  );
}
