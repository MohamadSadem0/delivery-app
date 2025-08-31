import { axiosInstance } from '@/api/axiosBase';
import { endpoints } from '@/api/endpoints';
import type { Product } from '@/types/models/Product';
import type { Category } from '@/types/models/Category';
import type { ProductQuery } from './catalog.types';
import type { Page } from '@/api/types';

export async function apiListProducts(params: ProductQuery = {}): Promise<Page<Product>> {
  const res = await axiosInstance.get(endpoints.catalog.products, { params });
  return res.data;
}

export async function apiGetProduct(id: number | string): Promise<Product> {
  const res = await axiosInstance.get(endpoints.catalog.product(id));
  return res.data;
}

export async function apiListCategories(): Promise<Category[]> {
  const res = await axiosInstance.get(endpoints.catalog.categories);
  return res.data;
}
