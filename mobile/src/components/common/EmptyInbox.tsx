import React from 'react';
import { View } from 'react-native';
import Text from '@/components/ui/Text';
import { useTheme } from '@/providers/ThemeProvider';

export default function EmptyInbox() {
  const { spacing } = useTheme();
  return (
    <View style={{ alignItems: 'center', padding: spacing.xl }}>
      <Text style={{ fontSize: 18 }}>No notifications yet</Text>
      <Text muted style={{ marginTop: spacing.xs, textAlign: 'center' }}>We’ll let you know when there’s an update on your orders or new offers.</Text>
    </View>
  );
}
