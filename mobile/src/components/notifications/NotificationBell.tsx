import React from 'react';
import { Pressable, View } from 'react-native';
import Text from '@/components/ui/Text';
import { useAppSelector } from '@/store/hooks';
import { selectUnreadCount } from '@/features/notifications/notifications.selectors';
import { useTheme } from '@/providers/ThemeProvider';
import { router } from 'expo-router';

export default function NotificationBell() {
  const count = useAppSelector(selectUnreadCount);
  const { colors } = useTheme();
  return (
    <Pressable onPress={() => router.push('/notifications')} style={{ padding: 8 }}>
      <Text style={{ fontSize: 20 }}>🔔</Text>
      {count > 0 ? (
        <View style={{ position: 'absolute', right: 2, top: 0, backgroundColor: colors.danger, borderRadius: 8, paddingHorizontal: 4 }}>
          <Text style={{ color: '#fff', fontSize: 12 }}>{count}</Text>
        </View>
      ) : null}
    </Pressable>
  );
}
