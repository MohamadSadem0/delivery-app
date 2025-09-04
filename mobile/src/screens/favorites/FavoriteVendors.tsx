import React, { useEffect } from 'react';
import Screen from '@/components/layout/Screen';
import Text from '@/components/ui/Text';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchFavVendors } from '@/features/favorites/favoritesSlice';
import { selectFavVendors, selectFavVendorsStatus } from '@/features/favorites/favorites.selectors';
import { FlatList } from 'react-native';
import FavoriteVendorRow from '@/components/favorites/FavoriteVendorRow';
import EmptyFavorites from '@/components/favorites/EmptyFavorites';

export default function FavoriteVendorsScreen() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectFavVendors);
  const status = useAppSelector(selectFavVendorsStatus);

  useEffect(() => { dispatch(fetchFavVendors()); }, [dispatch]);

  return (
    <Screen>
      <Text style={{ fontSize: 22, marginBottom: 12 }} weight="semiBold">Favorite vendors</Text>
      {status === 'loading' ? <Text>Loadingâ€¦</Text> : (
        <FlatList
          data={items}
          keyExtractor={(x) => String(x.vendorId)}
          renderItem={({ item }) => <FavoriteVendorRow item={item} />}
          ListEmptyComponent={<EmptyFavorites />}
        />
      )}
    </Screen>
  );
}


