import React, { useState } from 'react';
import Screen from '@/components/layout/Screen';
import Text from '@/components/ui/Text';
import AddressForm from '@/components/addresses/AddressForm';
import MapPicker from '@/components/addresses/MapPicker';
import { useAppDispatch } from '@/store/hooks';
import { createAddress } from '@/features/addresses/addressesSlice';
import { router } from 'expo-router';

export default function AddAddressScreen() {
  const dispatch = useAppDispatch();
  const [coords, setCoords] = useState<{ latitude: number; longitude: number } | null>(null);

  return (
    <Screen>
      <Text style={{ fontSize: 22, marginBottom: 12 }} weight="semiBold">Add address</Text>
      <MapPicker onPick={setCoords} />
      <AddressForm onSubmit={async (v) => {
        if (!coords) return;
        await dispatch(createAddress({ ...v, latitude: coords.latitude, longitude: coords.longitude } as any) as any);
        router.back();
      }} submitLabel="Save address" />
    </Screen>
  );
}


