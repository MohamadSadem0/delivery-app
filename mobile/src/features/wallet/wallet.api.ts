import { axiosInstance } from '@/api/axiosBase';
import { endpoints } from '@/api/endpoints';
import type { BalanceResponse, TransactionsResponse, MethodsResponse } from './wallet.types';
import type { PaymentMethod } from '@/types/models/Payment';

export async function apiGetWalletBalance(): Promise<BalanceResponse> {
  const res = await axiosInstance.get(endpoints.wallet.balance);
  return res.data;
}

export async function apiListWalletTransactions(params?: { page?: number; pageSize?: number; cursor?: string }): Promise<TransactionsResponse> {
  const res = await axiosInstance.get(endpoints.wallet.transactions, { params });
  return res.data;
}

export async function apiListPaymentMethods(): Promise<MethodsResponse> {
  const res = await axiosInstance.get(endpoints.wallet.methods);
  return res.data;
}

export async function apiAddCard(payload: { number: string; expMonth: number; expYear: number; cvc: string; holderName?: string }): Promise<{ method: PaymentMethod }> {
  const res = await axiosInstance.post(endpoints.wallet.methods, payload);
  return res.data;
}

export async function apiRemoveMethod(id: number): Promise<{ ok: true }> {
  const res = await axiosInstance.delete(endpoints.wallet.removeMethod(id));
  return res.data;
}

export async function apiSetDefaultMethod(id: number): Promise<{ ok: true }> {
  const res = await axiosInstance.post(endpoints.wallet.setDefault(id));
  return res.data;
}

export async function apiTopUp(amount: number, methodId: number): Promise<{ ok: true }> {
  const res = await axiosInstance.post(endpoints.wallet.topup, { amount, methodId });
  return res.data;
}

export async function apiWithdraw(amount: number): Promise<{ ok: true }> {
  const res = await axiosInstance.post(endpoints.wallet.withdraw, { amount });
  return res.data;
}
