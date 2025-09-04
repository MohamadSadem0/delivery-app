import React from 'react';
import { useFormik } from 'formik';
import { registerSchema } from '@/forms/auth.schemas';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { registerThunk } from '@/features/auth/authSlice';
import { selectAuthStatus, selectAuthError } from '@/features/auth/auth.selectors';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Text from '@/components/ui/Text';
import Screen from '@/components/layout/Screen';
import { router } from 'expo-router';
import { routes } from '@/constants/routes';

export default function Register() {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectAuthStatus);
  const error = useAppSelector(selectAuthError);

  const form = useFormik({
    initialValues: { name: '', email: '', phone: '', password: '', password_confirmation: '' },
    validationSchema: registerSchema,
    onSubmit: async values => {
      const res = await dispatch(registerThunk(values));
      if ((res as any).type.endsWith('fulfilled')) {
        router.replace(routes.Tabs.Home);
      }
    },
  });

  return (
    <Screen>
      <Text style={{ fontSize: 24, marginBottom: 16 }} weight="semiBold">Create account</Text>
      <Input label="Name" value={form.values.name} onChangeText={form.handleChange('name')} onBlur={form.handleBlur('name')} errorText={form.touched.name ? (form.errors.name as string) : undefined} />
      <Input label="Email" keyboardType="email-address" autoCapitalize="none" value={form.values.email} onChangeText={form.handleChange('email')} onBlur={form.handleBlur('email')} errorText={form.touched.email ? (form.errors.email as string) : undefined} />
      <Input label="Phone" keyboardType="phone-pad" value={form.values.phone} onChangeText={form.handleChange('phone')} onBlur={form.handleBlur('phone')} errorText={form.touched.phone ? (form.errors.phone as string) : undefined} />
      <Input label="Password" secureTextEntry value={form.values.password} onChangeText={form.handleChange('password')} onBlur={form.handleBlur('password')} errorText={form.touched.password ? (form.errors.password as string) : undefined} />
      <Input label="Confirm Password" secureTextEntry value={form.values.password_confirmation} onChangeText={form.handleChange('password_confirmation')} onBlur={form.handleBlur('password_confirmation')} errorText={form.touched.password_confirmation ? (form.errors.password_confirmation as string) : undefined} />
      {error ? <Text style={{ marginBottom: 8, color: 'red' }}>{error}</Text> : null}
      <Button title="Register" onPress={form.submitForm} loading={status === 'loading'} />
    </Screen>
  );
}

