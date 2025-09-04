import React, { useMemo, useState } from 'react';
import Screen from '@/components/layout/Screen';
import SearchBar from '@/components/search/SearchBar';
import SortBar from '@/components/search/SortBar';
import ActiveFiltersBar from '@/components/search/ActiveFiltersBar';
import SearchSkeleton from '@/components/search/SearchSkeleton';
import SearchEmpty from '@/components/search/SearchEmpty';
import ProductListItem from '@/components/search/ProductListItem';
import ProductGridItem from '@/components/search/ProductGridItem';
import { useSearch } from '@/hooks/useSearch';
import { FlatList, View, Switch } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import Text from '@/components/ui/Text';
import FilterDrawer from '@/components/search/FilterDrawer';
import FilterGroup from '@/components/search/FilterGroup';

export default function SearchResults() {
  const { query, results, status, setPage, setSort, setFilters } = useSearch();
  const { spacing } = useTheme();
  const [grid, setGrid] = useState(false);
  const [drawer, setDrawer] = useState(false);

  const labels = useMemo(() => {
    const ls: string[] = [];
    if (query.filters.price?.min) ls.push(`Min ${query.filters.price.min}`);
    if (query.filters.price?.max) ls.push(`Max ${query.filters.price.max}`);
    if (query.filters.stock === 'in_stock') ls.push('In stock');
    if (query.filters.delivery && query.filters.delivery !== 'any') ls.push(query.filters.delivery.replace('_',' '));
    return ls;
  }, [query.filters]);

  return (
    <Screen>
      <SearchBar />
      <SortBar current={query.sort} onChange={setSort} />
      <ActiveFiltersBar labels={labels} onClearOne={() => {}} onClearAll={() => setFilters({ price: {}, stock: 'all', delivery: 'any', attrs: {} })} />

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: spacing.md, paddingBottom: spacing.sm }}>
        <Text muted>{results?.total ?? 0} results</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <Text muted>Grid</Text><Switch value={grid} onValueChange={setGrid} />
          <Text muted>Filters</Text><Switch value={drawer} onValueChange={setDrawer} />
        </View>
      </View>

      {status === 'loading' && !results ? <SearchSkeleton /> : (
        !results || results.total === 0 ? <SearchEmpty /> : (
          <FlatList
            data={results.data}
            keyExtractor={(x) => String(x.id)}
            numColumns={grid ? 2 : 1}
            renderItem={({ item }) => grid ? <ProductGridItem item={item} /> : <ProductListItem item={item} />}
            onEndReachedThreshold={0.6}
            onEndReached={() => setPage((query.page || 1) + 1)}
          />
        )
      )}

      <FilterDrawer visible={drawer} onClose={() => setDrawer(false)} onApply={() => setDrawer(false)}>
        <FilterGroup title="Price">
          {/* Replace with proper inputs or sliders */}
          <Text muted>Use numeric inputs/slider in your real UI</Text>
        </FilterGroup>
        <FilterGroup title="Availability">
          <Text muted>Toggle in-stock, delivery speed, etc.</Text>
        </FilterGroup>
      </FilterDrawer>
    </Screen>
  );
}


