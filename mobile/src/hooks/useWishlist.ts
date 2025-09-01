import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectFavProducts } from '@/features/favorites/favorites.selectors';
import { toggleFavProduct } from '@/features/favorites/favoritesSlice';

export function useWishlist() {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectFavProducts);
  const isFav = (productId: number) => products.some(p => p.productId === productId);
  const toggle = (productId: number) => {
    const match = products.find(p => p.productId === productId);
    return dispatch(toggleFavProduct({ productId, isFav: !!match, favId: match?.id } as any));
  };
  return { products, isFav, toggle };
}
