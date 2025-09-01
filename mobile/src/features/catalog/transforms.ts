import type { Product } from '@/types/models/Product';
import type { Category } from '@/types/models/Category';

export function mapProduct(row: any): Product {
  return {
    id: Number(row.id),
    name: String(row.name ?? row.title ?? 'Untitled'),
    description: row.description ?? '',
    price: Number(row.price ?? 0),
    currency: String(row.currency ?? 'LBP'),
    imageUrl: row.imageUrl ?? row.image ?? null,
    vendorId: row.vendorId ?? row.vendor_id ?? null,
    categoryIds: row.categoryIds ?? row.category_ids ?? [],
    stock: row.stock ?? null,
  };
}

export function mapCategory(row: any): Category {
  return {
    id: Number(row.id),
    name: String(row.name ?? 'Category'),
    icon: row.icon ?? null,
    parentId: row.parentId ?? row.parent_id ?? null,
  };
}
