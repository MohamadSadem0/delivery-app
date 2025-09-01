import type { WalletBalance, WalletTransaction, PaymentMethod } from '@/types/models/Payment';

export type BalanceResponse = { balance: WalletBalance };
export type TransactionsResponse = { data: WalletTransaction[]; total?: number; nextCursor?: string | null };
export type MethodsResponse = { data: PaymentMethod[] };
