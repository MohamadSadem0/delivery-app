import { httpGet } from '@/api/client';
import { endpoints } from '@/api/endpoints';
import type { Page, Product } from '@/api/domainTypes';

export async function listVendorProducts(params?: { page?: number }): Promise<Page<Product>> {
  return httpGet(endpoints.vendor.products, { params });
}

export async function getVendorBalance(): Promise<{ balance: number; currency: 'LBP'|'USD' }> {
  return httpGet(endpoints.vendor.balance);
}

export async function getVendorLedger(params?: { page?: number }): Promise<{ data: Array<{ id: string; amount: number; type: string; createdAt: string }>; }> {
  return httpGet(endpoints.vendor.ledger, { params });
}
