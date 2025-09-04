import React, { useMemo } from 'react';
import { Pressable, View } from 'react-native';
import HeartIcon from './HeartIcon';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectFavProducts } from '@/features/favorites/favorites.selectors';
import { toggleFavProduct } from '@/features/favorites/favoritesSlice';

export default function WishlistButton({ productId }: { productId: number }) {
  const dispatch = useAppDispatch();
  const favs = useAppSelector(selectFavProducts);
  const match = useMemo(() => favs.find(f => f.productId === productId) || null, [favs, productId]);
  const isFav = !!match;
  return (
    <Pressable onPress={() => dispatch(toggleFavProduct({ productId, isFav, favId: match?.id }) as any)}>
      <View><HeartIcon filled={isFav} /></View>
    </Pressable>
  );
}


