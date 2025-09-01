import React from 'react';
import { Stack } from 'expo-router';

export default function TrackMapLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="[orderId]" />
    </Stack>
  );
}
