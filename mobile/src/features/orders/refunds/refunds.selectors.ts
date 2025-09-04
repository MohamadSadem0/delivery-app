import type { RootState } from '@/store';
export const selectRefunds = (s: RootState) => (s as any).refunds.list.items;
export const selectRefundsStatus = (s: RootState) => (s as any).refunds.list.status;
export const selectRefundsActing = (s: RootState) => (s as any).refunds.acting;
export const selectRefundsError = (s: RootState) => (s as any).refunds.actionError || null;

