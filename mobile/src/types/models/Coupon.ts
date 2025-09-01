export type CouponType = 'percentage' | 'fixed';

export type Coupon = {
  id: number;
  code: string;
  type: CouponType;
  value: number;        // percentage (0-100) or fixed amount in minor unit
  currency?: string;    // e.g., 'LBP' | 'USD' for fixed
  minSubtotal?: number | null;
  maxDiscount?: number | null;
  vendorId?: number | null;   // optional: vendor-scoped
  startsAt?: string | null;   // ISO
  endsAt?: string | null;     // ISO
  isActive?: boolean;
  description?: string | null;
};
