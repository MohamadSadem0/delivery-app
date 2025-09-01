import React from 'react';
import { View } from 'react-native';
import { useFormik } from 'formik';
import { loginSchema } from '@/forms/auth.schemas';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { loginThunk } from '@/features/auth/authSlice';
import { selectAuthStatus, selectAuthError } from '@/features/auth/auth.selectors';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Text from '@/components/ui/Text';
import Screen from '@/components/layout/Screen';
import { router } from 'expo-router';
import { routes } from '@/constants/routes';

export default function Login() {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectAuthStatus);
  const error = useAppSelector(selectAuthError);

  const form = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: loginSchema,
    onSubmit: async values => {
      const res = await dispatch(loginThunk(values));
      if ((res as any).type.endsWith('fulfilled')) {
        router.replace(routes.Tabs.Home);
      }
    },
  });

  return (
    <Screen>
      <Text style={{ fontSize: 24, marginBottom: 16 }} weight="semiBold">Welcome back</Text>
      <Input
        label="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={form.values.email}
        onChangeText={form.handleChange('email')}
        onBlur={form.handleBlur('email')}
        errorText={form.touched.email ? (form.errors.email as string) : undefined}
      />
      <Input
        label="Password"
        secureTextEntry
        value={form.values.password}
        onChangeText={form.handleChange('password')}
        onBlur={form.handleBlur('password')}
        errorText={form.touched.password ? (form.errors.password as string) : undefined}
      />
      {error ? <Text style={{ marginBottom: 8, color: 'red' }}>{error}</Text> : null}
      <Button title="Log in" onPress={form.submitForm} loading={status === 'loading'} />
      <View style={{ height: 12 }} />
      <Button title="Create account" variant="outline" onPress={() => router.push(routes.Auth.Register)} />
    </Screen>
  );
}
