import React from 'react';
import { router } from 'expo-router';
import Screen from '@/components/layout/Screen';
import Text from '@/components/ui/Text';
import Button from '@/components/ui/Button';

export default function NotFound() {
  return (
    <Screen>
      <Text style={{ fontSize: 22, marginBottom: 12 }} weight="semiBold">Oops, page not found</Text>
      <Button title="Go Home" onPress={() => router.replace('/')} />
    </Screen>
  );
}

