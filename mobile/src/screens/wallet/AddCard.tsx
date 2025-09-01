import React from 'react';
import Screen from '@/components/layout/Screen';
import Text from '@/components/ui/Text';
import AddCardForm from '@/components/wallet/AddCardForm';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addCardThunk } from '@/features/wallet/walletSlice';
import { selectWalletActing, selectWalletActionError } from '@/features/wallet/wallet.selectors';
import { router } from 'expo-router';

export default function AddCardScreen() {
  const dispatch = useAppDispatch();
  const acting = useAppSelector(selectWalletActing);
  const error = useAppSelector(selectWalletActionError);

  return (
    <Screen>
      <Text style={{ fontSize: 22, marginBottom: 12 }} weight="semiBold">Add card</Text>
      {error ? <Text style={{ color: 'red' }}>{error}</Text> : null}
      <AddCardForm onSubmit={async (v) => { await dispatch(addCardThunk(v)); router.back(); }} disabled={acting} />
    </Screen>
  );
}
