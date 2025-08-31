import { axiosInstance } from '@/api/axiosBase';
import { endpoints } from '@/api/endpoints';
import type { Product } from '@/types/models/Product';
import type { Page } from '@/api/types';

export async function searchProducts(q: string, page = 1, pageSize = 20): Promise<Page<Product>> {
  const res = await axiosInstance.get(endpoints.catalog.products, { params: { q, page, pageSize } });
  return res.data;
}
