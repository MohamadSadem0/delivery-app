import type { RootState } from '@/store';

export const selectFavProductIds = (s: RootState) => s.favorites.productIds;
export const selectFavVendorIds = (s: RootState) => s.favorites.vendorIds;
export const selectIsProductFav = (id: number) => (s: RootState) => s.favorites.productIds.includes(id);
export const selectIsVendorFav = (id: number) => (s: RootState) => s.favorites.vendorIds.includes(id);
