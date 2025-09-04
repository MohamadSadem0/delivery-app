import { httpGet } from '@/api/client';
import { endpoints } from '@/api/endpoints';
import { Page, Product } from '@/api/domainTypes';

export async function listProducts(params?: { page?: number; q?: string; categoryId?: string|number; vendorId?: string|number; }): Promise<Page<Product>> {
  return httpGet(endpoints.catalog.list, { params });
}

export async function getProduct(productId: string|number): Promise<Product> {
  return httpGet(endpoints.catalog.one(productId));
}

