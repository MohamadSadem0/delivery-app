import React from 'react';
import Screen from '@/components/layout/Screen';
import Text from '@/components/ui/Text';
import Button from '@/components/ui/Button';
import { router } from 'expo-router';

export default function ConfirmationScreen() {
  return (
    <Screen>
      <Text style={{ fontSize: 22, marginBottom: 12 }} weight="semiBold">Order placed</Text>
      <Text>Your order has been placed successfully.</Text>
      <Button title="Go Home" onPress={() => router.replace('/(tabs)/home')} />
    </Screen>
  );
}
