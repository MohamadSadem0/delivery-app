export type AddressType = 'home' | 'work' | 'other';

export type Address = {
  id: number;
  label: string;
  type: AddressType;
  line1: string;
  line2?: string | null;
  building?: string | null;
  floor?: string | null;
  instructions?: string | null;
  city?: string | null;
  area?: string | null;
  governorate?: string | null;
  postalCode?: string | null;
  phone?: string | null;
  isDefault?: boolean;
  latitude: number;
  longitude: number;
  createdAt: string;
  updatedAt: string;
};
