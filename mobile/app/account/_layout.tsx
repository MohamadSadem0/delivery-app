import React from 'react';
import { Stack } from 'expo-router';

export default function AccountLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="addresses" />
      <Stack.Screen name="address-edit" />
    </Stack>
  );
}
