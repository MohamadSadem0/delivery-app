import type { RootState } from '@/store';

export const selectAppliedCoupon = (s: RootState) => s.coupons.applied;
export const selectCouponDiscount = (s: RootState) => s.coupons.discountAmount || 0;
export const selectMyCoupons = (s: RootState) => s.coupons.myCoupons;
