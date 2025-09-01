import type { FavoriteProduct, FavoriteVendor } from '@/types/models/Favorite';

export type FavProductsResponse = { data: FavoriteProduct[]; total?: number };
export type FavVendorsResponse = { data: FavoriteVendor[]; total?: number };
export type ToggleResponse = { ok: true; id?: number };
