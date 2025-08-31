import type { RootState } from '@/store';

export const selectVendors = (s: RootState) => s.vendors.list;
export const selectVendorById = (id: number) => (s: RootState) => s.vendors.byId[id] ?? null;
export const selectVendorsStatus = (s: RootState) => s.vendors.status;
