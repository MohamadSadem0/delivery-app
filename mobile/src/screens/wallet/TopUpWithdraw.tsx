import React from 'react';
import Screen from '@/components/layout/Screen';
import Text from '@/components/ui/Text';
import TopUpWithdrawForm from '@/components/wallet/TopUpWithdrawForm';
import { useLocalSearchParams, router } from 'expo-router';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectWalletActing, selectWalletActionError } from '@/features/wallet/wallet.selectors';
import { topUpThunk, withdrawThunk } from '@/features/wallet/walletSlice';

export default function TopUpWithdrawScreen() {
  const { mode } = useLocalSearchParams<{ mode?: string }>();
  const isTopUp = mode !== 'withdraw';
  const dispatch = useAppDispatch();
  const acting = useAppSelector(selectWalletActing);
  const error = useAppSelector(selectWalletActionError);

  return (
    <Screen>
      <Text style={{ fontSize: 22, marginBottom: 12 }} weight="semiBold">{isTopUp ? 'Top up wallet' : 'Withdraw from wallet'}</Text>
      {error ? <Text style={{ color: 'red' }}>{error}</Text> : null}
      <TopUpWithdrawForm
        mode={isTopUp ? 'topup' : 'withdraw'}
        onSubmit={async ({ amount, methodId }) => {
          if (isTopUp) await dispatch(topUpThunk({ amount, methodId: methodId! } as any));
          else await dispatch(withdrawThunk(amount));
          router.back();
        }}
        disabled={acting}
      />
    </Screen>
  );
}


