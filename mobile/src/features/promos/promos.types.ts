import type { Coupon, PromoApplication } from '@/types/models/Promo';

export type CouponsResponse = { data: Coupon[] };
export type ApplyPromoResponse = { ok: true; promo: PromoApplication; coupon?: Coupon };
