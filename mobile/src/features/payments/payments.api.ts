import { axiosInstance } from '@/api/axiosBase';
import { endpoints } from '@/api/endpoints';
import type { SavedCard } from '@/types/models/Card';
import type { CreateIntentPayload, PaymentIntentRes, SaveCardPayload, ApiOk } from '@/services/payments/types';

export async function apiCreatePaymentIntent(payload: CreateIntentPayload): Promise<PaymentIntentRes> {
  const res = await axiosInstance.post(endpoints.payments.createIntent, payload);
  return res.data;
}

export async function apiListSavedCards(): Promise<SavedCard[]> {
  const res = await axiosInstance.get(endpoints.payments.listCards);
  return res.data;
}

export async function apiSetDefaultCard(id: string): Promise<ApiOk> {
  const res = await axiosInstance.post(endpoints.payments.setDefault(id));
  return res.data;
}

export async function apiDeleteCard(id: string): Promise<ApiOk> {
  const res = await axiosInstance.delete(endpoints.payments.card(id));
  return res.data;
}

export async function apiSaveCard(payload: SaveCardPayload): Promise<SavedCard> {
  const res = await axiosInstance.post(endpoints.payments.saveCard, payload);
  return res.data;
}
