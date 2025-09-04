export type RefundMethod = 'wallet' | 'original' | 'store_credit';

export type RefundStatus = 'requested' | 'approved' | 'rejected' | 'processing' | 'completed';

export type RefundRequest = {
  id: number;
  orderId: number;
  amount: number;      // in LBP or cents for USD - align with wallet
  currency: 'LBP' | 'USD';
  method: RefundMethod;
  reason: string;      // human readable or code
  note?: string | null;
  createdAt: string;
  status: RefundStatus;
};

