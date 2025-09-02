import { axiosInstance } from '@/api/axiosBase';
import { endpoints } from '@/api/endpoints';
import type {
  AddressListResponse, AddressResponse, CreateAddressPayload, UpdateAddressPayload
} from './addresses.types';

export async function apiListAddresses(): Promise<AddressListResponse> {
  const res = await axiosInstance.get(endpoints.addresses.list);
  return res.data;
}

export async function apiCreateAddress(payload: CreateAddressPayload): Promise<AddressResponse> {
  const res = await axiosInstance.post(endpoints.addresses.create, payload);
  return res.data;
}

export async function apiUpdateAddress(id: number, payload: UpdateAddressPayload): Promise<AddressResponse> {
  const res = await axiosInstance.put(endpoints.addresses.update(id), payload);
  return res.data;
}

export async function apiDeleteAddress(id: number): Promise<{ ok: true }> {
  const res = await axiosInstance.delete(endpoints.addresses.remove(id));
  return res.data;
}

export async function apiSetDefaultAddress(id: number): Promise<{ ok: true }> {
  const res = await axiosInstance.post(endpoints.addresses.setDefault(id), {});
  return res.data;
}
