import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectFavVendors } from '@/features/favorites/favorites.selectors';
import { toggleFavVendor } from '@/features/favorites/favoritesSlice';

export function useFavoriteVendor() {
  const dispatch = useAppDispatch();
  const vendors = useAppSelector(selectFavVendors);
  const isFav = (vendorId: number) => vendors.some(v => v.vendorId === vendorId);
  const toggle = (vendorId: number) => {
    const match = vendors.find(v => v.vendorId === vendorId);
    return dispatch(toggleFavVendor({ vendorId, isFav: !!match, favId: match?.id } as any));
  };
  return { vendors, isFav, toggle };
}

