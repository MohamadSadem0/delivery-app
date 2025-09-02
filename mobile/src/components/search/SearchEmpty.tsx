import React from 'react';
import { View } from 'react-native';
import Text from '@/components/ui/Text';

export default function SearchEmpty() {
  return (
    <View style={{ padding: 24, alignItems: 'center' }}>
      <Text muted>No results</Text>
      <Text muted>Try different keywords or remove some filters.</Text>
    </View>
  );
}
