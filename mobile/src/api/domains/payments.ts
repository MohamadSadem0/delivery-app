import { httpPost } from '@/api/client';
import { endpoints } from '@/api/endpoints';

export type PaymentIntentBody = {
  amount: number;
  currency: 'LBP'|'USD';
  method: 'CASH'|'CARD'|'WALLET';
  orderId?: string|number;
  metadata?: Record<string, string>;
};

export type PaymentIntent = { clientSecret?: string; redirectUrl?: string; id?: string; status: string };

export async function createPaymentIntent(body: PaymentIntentBody): Promise<PaymentIntent> {
  return httpPost(endpoints.payments.intent, body);
}
