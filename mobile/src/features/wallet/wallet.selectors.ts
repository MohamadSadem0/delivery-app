import type { RootState } from '@/store';

export const selectWalletBalance = (s: RootState) => s.wallet.balance.data;
export const selectWalletBalanceStatus = (s: RootState) => s.wallet.balance.status;
export const selectWalletTxs = (s: RootState) => s.wallet.transactions.items;
export const selectWalletTxStatus = (s: RootState) => s.wallet.transactions.status;
export const selectWalletTxPage = (s: RootState) => s.wallet.transactions.page;
export const selectWalletMethods = (s: RootState) => s.wallet.methods.items;
export const selectWalletMethodsStatus = (s: RootState) => s.wallet.methods.status;
export const selectWalletActing = (s: RootState) => s.wallet.acting;
export const selectWalletActionError = (s: RootState) => s.wallet.actionError || null;
