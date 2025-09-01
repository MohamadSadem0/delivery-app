import React from 'react';
import { useFormik } from 'formik';
import { addressSchema } from '@/forms/address.schemas';
import Screen from '@/components/layout/Screen';
import Text from '@/components/ui/Text';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { router } from 'expo-router';
import * as Geo from '@/services/location/geolocation';

export default function AddressScreen() {
  const form = useFormik({
    initialValues: { fullName: '', phone: '', city: '', street: '', building: '', notes: '' },
    validationSchema: addressSchema,
    onSubmit: async values => {
      router.push({ pathname: '/checkout/payment', params: values as any });
    },
  });

  return (
    <Screen>
      <Text style={{ fontSize: 22, marginBottom: 12 }} weight="semiBold">Delivery Address</Text>
      <Input label="Full name" value={form.values.fullName} onChangeText={form.handleChange('fullName')} onBlur={form.handleBlur('fullName')} errorText={form.touched.fullName ? (form.errors.fullName as string) : undefined} />
      <Input label="Phone" keyboardType="phone-pad" value={form.values.phone} onChangeText={form.handleChange('phone')} onBlur={form.handleBlur('phone')} errorText={form.touched.phone ? (form.errors.phone as string) : undefined} />
      <Input label="City / Area" value={form.values.city} onChangeText={form.handleChange('city')} onBlur={form.handleBlur('city')} errorText={form.touched.city ? (form.errors.city as string) : undefined} />
      <Input label="Street" value={form.values.street} onChangeText={form.handleChange('street')} onBlur={form.handleBlur('street')} errorText={form.touched.street ? (form.errors.street as string) : undefined} />
      <Input label="Building" value={form.values.building} onChangeText={form.handleChange('building')} onBlur={form.handleBlur('building')} />
      <Input label="Notes" value={form.values.notes} onChangeText={form.handleChange('notes')} onBlur={form.handleBlur('notes')} />
      <Button title="Use current location" variant="outline" onPress={async () => {
        const loc = await Geo.getCurrentLocation();
        if (loc) {
          form.setFieldValue('city', `${loc.coords.latitude.toFixed(5)}, ${loc.coords.longitude.toFixed(5)}`);
        }
      }} />
      <Button title="Continue to payment" onPress={form.submitForm} />
    </Screen>
  );
}
