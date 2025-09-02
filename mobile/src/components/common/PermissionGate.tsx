import React from 'react';
import { View } from 'react-native';
import Text from '@/components/ui/Text';

export default function PermissionGate({ granted, children, ask }: { granted: boolean; children: React.ReactNode; ask: () => void }) {
  if (granted) return <>{children}</>;
  return (
    <View style={{ padding: 16 }}>
      <Text muted>We need permission to send you delivery updates.</Text>
      {/* You can place a Button here to call ask() if needed */}
    </View>
  );
}
