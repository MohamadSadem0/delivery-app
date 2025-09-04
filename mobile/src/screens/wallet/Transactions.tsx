import React, { useEffect } from 'react';
import Screen from '@/components/layout/Screen';
import Text from '@/components/ui/Text';
import TransactionList from '@/components/wallet/TransactionList';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchTransactions } from '@/features/wallet/walletSlice';
import { selectWalletTxPage, selectWalletTxStatus, selectWalletTxs } from '@/features/wallet/wallet.selectors';

export default function TransactionsScreen() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectWalletTxs);
  const status = useAppSelector(selectWalletTxStatus);
  const page = useAppSelector(selectWalletTxPage);

  useEffect(() => { dispatch(fetchTransactions({ page: 1, pageSize: 20 })); }, [dispatch]);

  return (
    <Screen>
      <Text style={{ fontSize: 22, marginBottom: 12 }} weight="semiBold">Transactions</Text>
      {status === 'loading' && !items.length ? <Text>Loadingâ€¦</Text> : (
        <TransactionList data={items} onEnd={() => dispatch(fetchTransactions({ page: page + 1, pageSize: 20 }))} />
      )}
    </Screen>
  );
}


