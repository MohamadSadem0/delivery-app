import React from 'react';
import { FlatList } from 'react-native';
import type { WalletTransaction } from '@/types/models/Payment';
import TransactionRow from './TransactionRow';

export default function TransactionList({ data, onEnd }: { data: WalletTransaction[]; onEnd?: () => void }) {
  return (
    <FlatList
      data={data}
      keyExtractor={(t) => String(t.id)}
      renderItem={({ item }) => <TransactionRow item={item} />}
      onEndReached={onEnd}
      onEndReachedThreshold={0.5}
    />
  );
}
