import type { Address } from '@/types/models/Address';

export type AddressListResponse = { data: Address[] };
export type AddressResponse = { data: Address };

export type CreateAddressPayload =
  Omit<Address, 'id' | 'createdAt' | 'updatedAt' | 'isDefault'> & { isDefault?: boolean };

export type UpdateAddressPayload = Partial<CreateAddressPayload>;

