import type { RootState } from '@/store';
import type { Coupon } from '@/types/models/Promo';

export const selectGlobalCoupons = (s: RootState): Coupon[] => s.promos.global.items;
export const selectGlobalCouponsStatus = (s: RootState) => s.promos.global.status;
export const selectVendorCoupons = (vendorId: number) => (s: RootState): Coupon[] => s.promos.byVendor[vendorId]?.items || [];
export const selectVendorCouponsStatus = (vendorId: number) => (s: RootState) => s.promos.byVendor[vendorId]?.status || 'idle';
export const selectAppliedPromo = (s: RootState) => s.promos.applied || null;
export const selectApplyingPromo = (s: RootState) => s.promos.applying;
export const selectApplyPromoError = (s: RootState) => s.promos.applyError || null;

