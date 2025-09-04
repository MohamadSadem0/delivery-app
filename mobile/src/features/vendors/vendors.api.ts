import { axiosInstance } from '@/api/axiosBase';
import { endpoints } from '@/api/endpoints';
import type { Vendor } from '@/types/models/Vendor';
import type { VendorQuery } from './vendors.types';
import type { Page } from '@/api/types';

export async function apiListVendors(params: VendorQuery = {}): Promise<Page<Vendor>> {
  const res = await axiosInstance.get(endpoints.vendors.list, { params });
  return res.data;
}

export async function apiGetVendor(id: number | string): Promise<Vendor> {
  const res = await axiosInstance.get(endpoints.vendors.detail(id));
  return res.data;
}

