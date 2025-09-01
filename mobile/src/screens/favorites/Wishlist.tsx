import React, { useEffect } from 'react';
import Screen from '@/components/layout/Screen';
import Text from '@/components/ui/Text';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchFavProducts } from '@/features/favorites/favoritesSlice';
import { selectFavProducts, selectFavProductsStatus } from '@/features/favorites/favorites.selectors';
import { FlatList } from 'react-native';
import FavoriteProductCard from '@/components/favorites/FavoriteProductCard';
import EmptyFavorites from '@/components/favorites/EmptyFavorites';

export default function WishlistScreen() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectFavProducts);
  const status = useAppSelector(selectFavProductsStatus);

  useEffect(() => { dispatch(fetchFavProducts()); }, [dispatch]);

  return (
    <Screen>
      <Text style={{ fontSize: 22, marginBottom: 12 }} weight="semiBold">Wishlist</Text>
      {status === 'loading' ? <Text>Loading…</Text> : (
        <FlatList
          data={items}
          keyExtractor={(x) => String(x.productId)}
          renderItem={({ item }) => <FavoriteProductCard item={item} />}
          ListEmptyComponent={<EmptyFavorites />}
        />
      )}
    </Screen>
  );
}
