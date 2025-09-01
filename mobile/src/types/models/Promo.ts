export type Currency = 'LBP' | 'USD';

export type PromoType = 'percentage' | 'fixed' | 'delivery_fee';

export type Coupon = {
  id: number;
  code: string;
  title: string;
  description?: string | null;
  vendorId?: number | null;        // null => global
  type: PromoType;
  value: number;                   // percent for 'percentage' (0..100), or amount for 'fixed'
  currency?: Currency | null;      // required if type === 'fixed'
  minOrderAmount?: number | null;  // minimum subtotal to apply
  maxDiscountAmount?: number | null;
  startsAt?: string | null;        // ISO
  endsAt?: string | null;          // ISO
  usageLimit?: number | null;      // per user or global (server-defined)
  remaining?: number | null;       // optional
  active: boolean;
};

export type PromoApplication = {
  code: string;
  amountOff: number;
  currency: Currency;
  affects: 'subtotal' | 'delivery';
  label?: string;
};
