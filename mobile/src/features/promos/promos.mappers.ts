import type { Coupon } from '@/types/models/Promo';
// Normalize or map backend fields here if they differ from our model.
export function mapCoupon(api: any): Coupon {
  return {
    id: api.id,
    code: api.code,
    title: api.title || api.name || api.code,
    description: api.description ?? null,
    vendorId: api.vendorId ?? null,
    type: api.type,
    value: Number(api.value),
    currency: api.currency ?? null,
    minOrderAmount: api.minOrderAmount ?? null,
    maxDiscountAmount: api.maxDiscountAmount ?? null,
    startsAt: api.startsAt ?? null,
    endsAt: api.endsAt ?? null,
    usageLimit: api.usageLimit ?? null,
    remaining: api.remaining ?? null,
    active: Boolean(api.active ?? true),
  };
}
