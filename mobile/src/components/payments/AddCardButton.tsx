import React from 'react';
import Button from '@/components/ui/Button';
import { router } from 'expo-router';

export default function AddCardButton() {
  return <Button title="Add new card" onPress={() => router.push('/payments/add-card')} />;
}


