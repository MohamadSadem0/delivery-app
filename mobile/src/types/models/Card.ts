export type CardBrand = 'visa' | 'mastercard' | 'amex' | 'discover' | 'unknown';

export type SavedCard = {
  id: string;         // backend id or Stripe payment_method id
  brand: CardBrand;
  last4: string;
  expMonth: number;
  expYear: number;
  holder?: string | null;
  isDefault?: boolean;
};

