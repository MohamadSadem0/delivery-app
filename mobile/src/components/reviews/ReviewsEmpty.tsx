import React from 'react';
import { View } from 'react-native';
import Text from '@/components/ui/Text';

export default function ReviewsEmpty() {
  return (
    <View style={{ paddingVertical: 16, alignItems: 'center' }}>
      <Text muted>No reviews yet</Text>
      <Text muted>Be the first to share your feedback.</Text>
    </View>
  );
}


