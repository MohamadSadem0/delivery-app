export type CartItem = {
  productId: number;
  vendorId?: number | null;
  name: string;
  imageUrl?: string | null;
  unitPrice: number;
  currency: string; // 'LBP' | 'USD'
  qty: number;
};

export type CartState = {
  items: CartItem[];
  currency: string; // display currency
  coupon?: { code: string; discountAmount: number } | null;
  deliveryFee: number; // flat for now; can be zone-based later
};

