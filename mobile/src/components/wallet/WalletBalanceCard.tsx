import React from 'react';
import { View } from 'react-native';
import Text from '@/components/ui/Text';
import Button from '@/components/ui/Button';
import { useTheme } from '@/providers/ThemeProvider';
import type { WalletBalance } from '@/types/models/Payment';

export default function WalletBalanceCard({ balance, onTopUp, onWithdraw }: { balance?: WalletBalance | null; onTopUp?: () => void; onWithdraw?: () => void }) {
  const { spacing, colors, radii } = useTheme();
  return (
    <View style={{ backgroundColor: colors.card, borderRadius: radii.xl, padding: spacing.lg, marginBottom: spacing.lg }}>
      <Text muted>Wallet balance</Text>
      <Text weight="semiBold" style={{ fontSize: 28 }}>{balance ? Math.round(balance.available).toLocaleString() : '--'} {balance?.currency || ''}</Text>
      <View style={{ flexDirection: 'row', gap: spacing.sm, marginTop: spacing.md }}>
        {onTopUp ? <Button title="Top up" onPress={onTopUp} /> : null}
        {onWithdraw ? <Button title="Withdraw" variant="outline" onPress={onWithdraw} /> : null}
      </View>
    </View>
  );
}


