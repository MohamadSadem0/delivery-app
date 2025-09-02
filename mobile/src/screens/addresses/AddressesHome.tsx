import React, { useEffect } from 'react';
import Screen from '@/components/layout/Screen';
import Text from '@/components/ui/Text';
import Button from '@/components/ui/Button';
import AddressList from '@/components/addresses/AddressList';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectAddresses, selectAddressesStatus } from '@/features/addresses/addresses.selectors';
import { deleteAddress, fetchAddresses, setDefaultAddress } from '@/features/addresses/addressesSlice';
import { router } from 'expo-router';

export default function AddressesHomeScreen() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectAddresses);
  const status = useAppSelector(selectAddressesStatus);

  useEffect(() => { dispatch(fetchAddresses()); }, [dispatch]);

  return (
    <Screen>
      <Text style={{ fontSize: 22, marginBottom: 12 }} weight="semiBold">My addresses</Text>
      <Button title="Add new address" onPress={() => router.push('/account/addresses/add' as any)} />
      {status === 'loading' ? <Text>Loading…</Text> : (
        <AddressList
          data={items}
          onEdit={(id) => router.push(`/account/addresses/${id}/edit` as any)}
          onDelete={(id) => dispatch(deleteAddress(id) as any)}
          onMakeDefault={(id) => dispatch(setDefaultAddress(id) as any)}
        />
      )}
    </Screen>
  );
}
