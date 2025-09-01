import React, { useEffect } from 'react';
import Screen from '@/components/layout/Screen';
import Text from '@/components/ui/Text';
import Button from '@/components/ui/Button';
import WalletBalanceCard from '@/components/wallet/WalletBalanceCard';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchBalance, fetchMethods, removeMethodThunk, setDefaultMethodThunk } from '@/features/wallet/walletSlice';
import { selectWalletBalance, selectWalletMethods, selectWalletMethodsStatus } from '@/features/wallet/wallet.selectors';
import { router } from 'expo-router';
import { View, Pressable } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';

export default function WalletHome() {
  const dispatch = useAppDispatch();
  const balance = useAppSelector(selectWalletBalance);
  const methods = useAppSelector(selectWalletMethods);
  const status = useAppSelector(selectWalletMethodsStatus);
  const { spacing, colors, radii } = useTheme();

  useEffect(() => { dispatch(fetchBalance()); dispatch(fetchMethods()); }, [dispatch]);

  return (
    <Screen>
      <WalletBalanceCard balance={balance} onTopUp={() => router.push('/wallet/topup')} onWithdraw={() => router.push('/wallet/withdraw')} />
      <View style={{ flexDirection: 'row', gap: spacing.sm }}>
        <Button title="Transactions" variant="outline" onPress={() => router.push('/wallet/transactions')} />
        <Button title="Add card" onPress={() => router.push('/wallet/methods/add-card')} />
      </View>

      <Text style={{ marginTop: spacing.lg }} weight="semiBold">Payment methods</Text>
      {status === 'loading' ? <Text>Loading…</Text> : methods.map(m => (
        <View key={m.id} style={{ paddingVertical: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border }}>
          <Text>{m.type === 'card' ? (m.brand?.toUpperCase() + ' •••• ' + (m.last4 || '')) : (m.label || m.type)}</Text>
          <View style={{ flexDirection: 'row', gap: spacing.sm, marginTop: spacing.xs }}>
            {!m.isDefault ? <Button title="Set default" variant="outline" onPress={() => dispatch(setDefaultMethodThunk(m.id))} /> : <Text muted>Default</Text>}
            <Button title="Remove" variant="ghost" onPress={() => dispatch(removeMethodThunk(m.id))} />
          </View>
        </View>
      ))}
    </Screen>
  );
}
