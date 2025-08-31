export type PaymentMethod = 'cod' | 'card';

export type PaymentIntent = {
  clientSecret: string;
  amount: number;
  currency: string;
  orderId: number;
};
