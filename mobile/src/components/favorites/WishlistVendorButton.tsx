import React, { useMemo } from 'react';
import { Pressable, View } from 'react-native';
import HeartIcon from './HeartIcon';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectFavVendors } from '@/features/favorites/favorites.selectors';
import { toggleFavVendor } from '@/features/favorites/favoritesSlice';

export default function WishlistVendorButton({ vendorId }: { vendorId: number }) {
  const dispatch = useAppDispatch();
  const favs = useAppSelector(selectFavVendors);
  const match = useMemo(() => favs.find(f => f.vendorId === vendorId) || null, [favs, vendorId]);
  const isFav = !!match;
  return (
    <Pressable onPress={() => dispatch(toggleFavVendor({ vendorId, isFav, favId: match?.id }) as any)}>
      <View><HeartIcon filled={isFav} /></View>
    </Pressable>
  );
}


