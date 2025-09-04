import type { RootState } from '@/store';

export const selectPaymentMethod = (s: RootState) => s.payments.method;
export const selectSavedCards = (s: RootState) => s.payments.cards;
export const selectDefaultCard = (s: RootState) => s.payments.cards.find(c => c.isDefault) ?? null;
export const selectLastClientSecret = (s: RootState) => s.payments.lastClientSecret;

