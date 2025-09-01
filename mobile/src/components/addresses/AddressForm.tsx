import React from 'react';
import { useFormik } from 'formik';
import { addressSchema } from '@/forms/address.schemas';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

type Props = {
  initial?: any;
  onSubmit: (values: any) => Promise<void> | void;
  submitLabel?: string;
};

export default function AddressForm({ initial, onSubmit, submitLabel = 'Save address' }: Props) {
  const form = useFormik({
    initialValues: initial ?? { fullName: '', phone: '', city: '', street: '', building: '', notes: '' },
    validationSchema: addressSchema,
    onSubmit: onSubmit as any,
  });

  return (
    <>
      <Input label="Full name" value={form.values.fullName} onChangeText={form.handleChange('fullName')} onBlur={form.handleBlur('fullName')} errorText={form.touched.fullName ? (form.errors.fullName as string) : undefined} />
      <Input label="Phone" keyboardType="phone-pad" value={form.values.phone} onChangeText={form.handleChange('phone')} onBlur={form.handleBlur('phone')} errorText={form.touched.phone ? (form.errors.phone as string) : undefined} />
      <Input label="City / Area" value={form.values.city} onChangeText={form.handleChange('city')} onBlur={form.handleBlur('city')} errorText={form.touched.city ? (form.errors.city as string) : undefined} />
      <Input label="Street" value={form.values.street} onChangeText={form.handleChange('street')} onBlur={form.handleBlur('street')} errorText={form.touched.street ? (form.errors.street as string) : undefined} />
      <Input label="Building" value={form.values.building} onChangeText={form.handleChange('building')} onBlur={form.handleBlur('building')} />
      <Input label="Notes" value={form.values.notes} onChangeText={form.handleChange('notes')} onBlur={form.handleBlur('notes')} />
      <Button title={submitLabel} onPress={form.submitForm} />
    </>
  );
}
