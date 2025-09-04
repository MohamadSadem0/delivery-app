import type { RootState } from '@/store';
import type { Address } from '@/types/models/Address';

export const selectAddresses = (s: RootState): Address[] => s.addresses.list.items;
export const selectAddressesStatus = (s: RootState) => s.addresses.list.status;
export const selectDefaultAddress = (s: RootState) => s.addresses.list.items.find(a => a.isDefault) || null;
export const selectAddressById = (id: number) => (s: RootState) => s.addresses.list.items.find(a => a.id === id) || null;

