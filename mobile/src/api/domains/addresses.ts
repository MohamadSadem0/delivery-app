import { httpGet, httpPost, httpPut, httpDelete } from '@/api/client';
import { endpoints } from '@/api/endpoints';
import type { Address, Page, ID } from '@/api/domainTypes';

export async function listAddresses(params?: { page?: number }): Promise<Page<Address>> {
  return httpGet(endpoints.addresses.list, { params });
}

export async function createAddress(body: Omit<Address,'id'|'country'> & { country?: 'LB' }): Promise<Address> {
  const payload = { country: 'LB', ...body };
  return httpPost(endpoints.addresses.list, payload);
}

export async function updateAddress(id: ID, body: Partial<Address>): Promise<Address> {
  return httpPut(endpoints.addresses.one(id), body);
}

export async function deleteAddress(id: ID): Promise<{ success: boolean }> {
  return httpDelete(endpoints.addresses.one(id));
}

