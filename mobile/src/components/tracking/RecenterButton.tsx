import React from 'react';
import { View } from 'react-native';
import Button from '@/components/ui/Button';
export default function RecenterButton({ onPress }: { onPress: () => void }) {
  return (
    <View style={{ position: 'absolute', right: 12, bottom: 12 }}>
      <Button title="Recenter" onPress={onPress} />
    </View>
  );
}
