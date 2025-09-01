import type { FavoriteProduct, FavoriteVendor } from '@/types/models/Favorite';

export function mapFavProduct(api: any): FavoriteProduct {
  return {
    id: api.id,
    productId: api.product_id ?? api.productId,
    name: api.name ?? api.product?.name ?? '',
    thumbnail: api.thumbnail ?? api.product?.image ?? null,
    price: api.price ?? api.product?.price ?? null,
    currency: api.currency ?? api.product?.currency ?? null,
    vendorId: api.vendor_id ?? api.vendorId ?? api.product?.vendorId ?? null,
    vendorName: api.vendor_name ?? api.vendorName ?? api.product?.vendorName ?? null,
    createdAt: api.created_at ?? api.createdAt ?? new Date().toISOString(),
  };
}

export function mapFavVendor(api: any): FavoriteVendor {
  return {
    id: api.id,
    vendorId: api.vendor_id ?? api.vendorId,
    vendorName: api.vendor_name ?? api.vendorName ?? '',
    logo: api.logo ?? null,
    createdAt: api.created_at ?? api.createdAt ?? new Date().toISOString(),
  };
}
