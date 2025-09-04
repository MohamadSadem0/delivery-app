import type { Product } from '@/types/models/Product';
import type { Category } from '@/types/models/Category';

export type ProductQuery = {
  page?: number;
  pageSize?: number;
  categoryId?: number;
  vendorId?: number;
  q?: string;
};

export type CatalogState = {
  status: 'idle' | 'loading' | 'error';
  items: Product[];
  byId: Record<number, Product>;
  categories: Category[];
  page: number;
  pageSize: number;
  total: number;
  error?: string;
};

