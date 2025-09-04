import React, { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import Screen from '@/components/layout/Screen';
import Text from '@/components/ui/Text';
import Button from '@/components/ui/Button';

export default function PermissionGate({ children }: { children: React.ReactNode }) {
  const [granted, setGranted] = useState<boolean | null>(null);

  const ask = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    setGranted(status === 'granted');
  };

  useEffect(() => { ask(); }, []);

  if (granted == null) return <Screen><Text>Requesting permissionâ€¦</Text></Screen>;
  if (!granted) return <Screen><Text>Location permission is required.</Text><Button title="Grant" onPress={ask} /></Screen>;
  return <>{children}</>;
}


