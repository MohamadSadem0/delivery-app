import type { RootState } from '@/store';
import type { Promotion } from '@/types/models/Promotion';
export const selectPromotionById = (id: number) => (s: RootState): Promotion | undefined => s.promotions.byId[id];

