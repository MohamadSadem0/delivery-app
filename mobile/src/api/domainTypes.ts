// Canonical mobile-side domain models (kept minimal & pragmatic)
export type ID = number | string;

export type Money = { amount: number; currency: 'LBP' | 'USD' };
export type Price = { value: number; currency: 'LBP' | 'USD'; original?: number };

export type Vendor = {
  id: ID;
  name: string;
  slug: string;
  rating?: number;
  logoUrl?: string;
  isOpen?: boolean;
  minOrder?: Money;
  deliveryEtaMins?: number;
};

export type Category = {
  id: ID;
  name: string;
  slug: string;
  parentId?: ID | null;
  imageUrl?: string;
};

export type Product = {
  id: ID;
  vendorId: ID;
  name: string;
  slug: string;
  description?: string;
  price: Price;
  images?: string[];
  rating?: number;
  stock?: number;
  isActive?: boolean;
  categories?: ID[];
  options?: Record<string, string[]>; // size, color, etc.
};

export type Address = {
  id: ID;
  label?: string;
  fullName: string;
  phone: string;
  country: 'LB';
  governorate?: string;
  district?: string;
  cityOrArea?: string;
  street?: string;
  building?: string;
  floor?: string;
  notes?: string;
  latitude?: number;
  longitude?: number;
  isDefault?: boolean;
};

export type CartItem = {
  productId: ID;
  vendorId: ID;
  quantity: number;
  unitPrice: Price;
  optionSelections?: Record<string, string>; // e.g. { size: 'M' }
};

export type Cart = {
  id: ID;
  currency: 'LBP' | 'USD';
  items: CartItem[];
  totals: {
    subtotal: number;
    delivery: number;
    discount: number;
    grandTotal: number;
    currency: 'LBP' | 'USD';
  };
  vendorGroups: Record<string, { vendor: Vendor; items: CartItem[] }>;
  couponCode?: string;
};

export type PaymentMethod =
  | { type: 'CASH' }
  | { type: 'CARD'; last4?: string; brand?: string; token?: string }
  | { type: 'WALLET' };

export type Order = {
  id: ID;
  number: string;
  status:
    | 'PENDING' | 'CONFIRMED' | 'PREPARING' | 'ON_THE_WAY' | 'DELIVERED' | 'CANCELLED' | 'REFUNDED';
  createdAt: string;
  vendorOrders: Array<{ vendor: Vendor; items: CartItem[]; status: string }>;
  totals: Cart['totals'];
  address: Address;
  payment: PaymentMethod;
  notes?: string;
};

export type Page<T> = {
  data: T[];
  meta: { page: number; pageSize: number; total: number };
};

