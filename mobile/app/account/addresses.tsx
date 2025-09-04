import React, { useEffect } from 'react';
import { FlatList } from 'react-native';
import Screen from '@/components/layout/Screen';
import Text from '@/components/ui/Text';
import AddressCard from '@/components/addresses/AddressCard';
import Button from '@/components/ui/Button';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchAddresses, deleteAddressThunk } from '@/features/addresses/addressesSlice';
import { selectAddresses, selectAddressesStatus } from '@/features/addresses/addresses.selectors';
import { router } from 'expo-router';

export default function AddressesScreen() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectAddresses);
  const status = useAppSelector(selectAddressesStatus);

  useEffect(() => {
    dispatch(fetchAddresses());
  }, [dispatch]);

  return (
    <Screen>
      <Text style={{ fontSize: 22, marginBottom: 12 }} weight="semiBold">My Addresses</Text>
      <Button title="Add new address" onPress={() => router.push('/account/address-edit')} />
      {status === 'loading' ? <Text>Loadingâ€¦</Text> : (
        <FlatList
          data={items}
          keyExtractor={(it, idx) => String((it as any).id ?? idx)}
          renderItem={({ item }) => (
            <AddressCard
              address={item}
              onEdit={() => router.push({ pathname: '/account/address-edit', params: { id: String((item as any).id ?? '') } })}
              onDelete={() => dispatch(deleteAddressThunk((item as any).id as number))}
            />
          )}
        />
      )}
    </Screen>
  );
}

