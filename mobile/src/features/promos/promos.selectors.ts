import type { RootState } from '@/store';

export const selectPromos = (s: RootState) => s.promos.list;
export const selectPromoById = (id: number) => (s: RootState) => s.promos.byId[id] ?? null;
