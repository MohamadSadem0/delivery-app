import React, { useMemo } from 'react';
import Screen from '@/components/layout/Screen';
import Text from '@/components/ui/Text';
import AddressForm from '@/components/addresses/AddressForm';
import { useLocalSearchParams, router } from 'expo-router';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { createAddressThunk, updateAddressThunk } from '@/features/addresses/addressesSlice';
import { selectAddresses } from '@/features/addresses/addresses.selectors';

export default function AddressEditScreen() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const editId = id ? Number(id) : null;
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectAddresses);
  const initial = useMemo(() => items.find(it => (it as any).id === editId), [items, editId]);

  const onSubmit = async (values: any) => {
    if (editId) {
      await dispatch(updateAddressThunk({ id: editId, patch: values }));
    } else {
      await dispatch(createAddressThunk(values));
    }
    router.back();
  };

  return (
    <Screen>
      <Text style={{ fontSize: 22, marginBottom: 12 }} weight="semiBold">{editId ? 'Edit Address' : 'New Address'}</Text>
      <AddressForm initial={initial} onSubmit={onSubmit} submitLabel={editId ? 'Save changes' : 'Create address'} />
    </Screen>
  );
}
