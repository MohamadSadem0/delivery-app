import type { RootState } from '@/store';

export const selectWalletBalance = (s: RootState) => (s as any).wallet.balance.data;
export const selectWalletBalanceStatus = (s: RootState) => (s as any).wallet.balance.status;
export const selectWalletTxs = (s: RootState) => (s as any).wallet.transactions.items;
export const selectWalletTxStatus = (s: RootState) => (s as any).wallet.transactions.status;
export const selectWalletTxPage = (s: RootState) => (s as any).wallet.transactions.page;
export const selectWalletMethods = (s: RootState) => (s as any).wallet.methods.items;
export const selectWalletMethodsStatus = (s: RootState) => (s as any).wallet.methods.status;
export const selectWalletActing = (s: RootState) => (s as any).wallet.acting;
export const selectWalletActionError = (s: RootState) => (s as any).wallet.actionError || null;

