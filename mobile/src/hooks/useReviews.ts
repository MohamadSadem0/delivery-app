import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectProductReviews, selectVendorReviews } from '@/features/reviews/reviews.selectors';
import { fetchProductReviews, fetchVendorReviews } from '@/features/reviews/reviewsSlice';

export function useProductReviews(productId: number) {
  const dispatch = useAppDispatch();
  const list = useAppSelector(selectProductReviews(productId));
  const refresh = () => dispatch(fetchProductReviews({ productId, page: 1 }) as any);
  return { list, refresh };
}

export function useVendorReviews(vendorId: number) {
  const dispatch = useAppDispatch();
  const list = useAppSelector(selectVendorReviews(vendorId));
  const refresh = () => dispatch(fetchVendorReviews({ vendorId, page: 1 }) as any);
  return { list, refresh };
}

