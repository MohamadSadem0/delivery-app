import type { RootState } from '@/store';
export const selectOrderFilters = (s: RootState) => (s as any).orderFilters;

