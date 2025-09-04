import React from 'react';
import { View } from 'react-native';
import Text from '@/components/ui/Text';

export default function EmptyFavorites() {
  return (
    <View style={{ paddingVertical: 24, alignItems: 'center' }}>
      <Text muted>No favorites yet</Text>
      <Text muted>Add items and vendors to your wishlist to find them quickly.</Text>
    </View>
  );
}


