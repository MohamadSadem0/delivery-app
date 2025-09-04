import type { RootState } from '@/store';

export const selectFavProducts = (s: RootState) => s.favorites.products.items;
export const selectFavProductsStatus = (s: RootState) => s.favorites.products.status;
export const selectFavVendors = (s: RootState) => s.favorites.vendors.items;
export const selectFavVendorsStatus = (s: RootState) => s.favorites.vendors.status;
export const selectIsProductFav = (productId: number) => (s: RootState) => s.favorites.products.items.some(p => p.productId === productId);
export const selectIsVendorFav = (vendorId: number) => (s: RootState) => s.favorites.vendors.items.some(v => v.vendorId === vendorId);

