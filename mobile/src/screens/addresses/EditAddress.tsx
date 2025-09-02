import React, { useMemo, useState } from 'react';
import Screen from '@/components/layout/Screen';
import Text from '@/components/ui/Text';
import AddressForm from '@/components/addresses/AddressForm';
import MapPicker from '@/components/addresses/MapPicker';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectAddressById } from '@/features/addresses/addresses.selectors';
import { updateAddress } from '@/features/addresses/addressesSlice';
import { useLocalSearchParams, router } from 'expo-router';

export default function EditAddressScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const addrId = Number(id);
  const dispatch = useAppDispatch();
  const item = useAppSelector(selectAddressById(addrId));
  const [coords, setCoords] = useState<{ latitude: number; longitude: number } | null>(
    item ? { latitude: item.latitude, longitude: item.longitude } : null
  );

  const initial = useMemo(() => item ? ({
    label: item.label, type: item.type, line1: item.line1, line2: item.line2 || '',
    area: item.area || '', city: item.city || '', governorate: item.governorate || '',
    phone: item.phone || '', instructions: item.instructions || ''
  }) : {}, [item]);

  if (!item) return <Screen><Text>Address not found</Text></Screen>;

  return (
    <Screen>
      <Text style={{ fontSize: 22, marginBottom: 12 }} weight="semiBold">Edit address</Text>
      <MapPicker initial={{ latitude: item.latitude, longitude: item.longitude }} onPick={setCoords} />
      <AddressForm initial={initial as any} onSubmit={async (v) => {
        const payload = { ...v, latitude: coords?.latitude ?? item.latitude, longitude: coords?.longitude ?? item.longitude };
        await dispatch(updateAddress({ id: addrId, payload } as any) as any);
        router.back();
      }} submitLabel="Update address" />
    </Screen>
  );
}
