import React from 'react';
import { Pressable } from 'react-native';
import Text from '@/components/ui/Text';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectIsProductFav, selectIsVendorFav } from '@/features/favorites/favorites.selectors';
import { toggleProductFav, toggleVendorFav } from '@/features/favorites/favoritesSlice';

type Props = { productId?: number; vendorId?: number };

export default function FavoriteButton({ productId, vendorId }: Props) {
  const dispatch = useAppDispatch();
  const isProduct = typeof productId === 'number';
  const isVendor = typeof vendorId === 'number';
  const liked = useAppSelector(isProduct ? selectIsProductFav(productId as number) : selectIsVendorFav(vendorId as number));

  return (
    <Pressable onPress={() => isProduct ? dispatch(toggleProductFav((productId as number) as any)) : dispatch(toggleVendorFav((vendorId as number) as any))}>
      <Text style={{ fontSize: 18 }}>{liked ? 'â¤ï¸' : 'ðŸ¤'}</Text>
    </Pressable>
  );
}


