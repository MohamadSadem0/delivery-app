export type CreateIntentPayload = {
  amount: number;
  currency: string; // 'LBP' | 'USD'
  metadata?: Record<string, string | number>;
};

export type PaymentIntentRes = {
  clientSecret: string;
  intentId?: string;
};

export type SaveCardPayload = {
  paymentMethodId: string;
};

export type ApiOk = { ok: true };

