import React from 'react';
import { Stack } from 'expo-router';

export default function CatalogLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="products" />
      <Stack.Screen name="categories" />
      <Stack.Screen name="product/[id]" />
    </Stack>
  );
}
