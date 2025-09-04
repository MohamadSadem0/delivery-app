export type Currency = 'LBP' | 'USD';

export type PaymentMethodType = 'card' | 'cash' | 'wallet';

export type CardBrand = 'visa' | 'mastercard' | 'amex' | 'unknown';

export type PaymentMethod = {
  id: number;
  type: PaymentMethodType;
  brand?: CardBrand | null;
  last4?: string | null;
  expMonth?: number | null;
  expYear?: number | null;
  holderName?: string | null;
  isDefault?: boolean;
  label?: string | null; // e.g., 'Cash on delivery'
};

export type WalletBalance = {
  available: number;
  currency: Currency;
  pending?: number;
};

export type WalletTransaction = {
  id: number;
  type: 'topup' | 'withdraw' | 'order' | 'refund' | 'fee';
  direction: 'in' | 'out';
  amount: number;
  currency: Currency;
  description?: string | null;
  createdAt: string; // ISO
  status?: 'pending' | 'completed' | 'failed';
};

