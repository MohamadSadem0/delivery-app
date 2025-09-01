import type { RootState } from '@/store';
export const selectRefunds = (s: RootState) => s.refunds.list.items;
export const selectRefundsStatus = (s: RootState) => s.refunds.list.status;
export const selectRefundsActing = (s: RootState) => s.refunds.acting;
export const selectRefundsError = (s: RootState) => s.refunds.actionError || null;
