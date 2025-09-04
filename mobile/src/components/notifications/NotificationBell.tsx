import React from 'react';
import { Pressable, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Text from '@/components/ui/Text';
import { useAppSelector } from '@/store/hooks';
import { selectUnseenCount } from '@/features/notifications/notifications.selectors';
import { router } from 'expo-router';
import { useTheme } from '@/providers/ThemeProvider';

export default function NotificationBell() {
  const count = useAppSelector(selectUnseenCount);
  const { colors } = useTheme();
  return (
    <Pressable onPress={() => router.push('/notifications' as any)}>
      <View>
        <Ionicons name="notifications-outline" size={22} color={colors.text} />
        {count > 0 && (
          <View style={{ position: 'absolute', top: -4, right: -6, minWidth: 16, height: 16, borderRadius: 8, backgroundColor: '#E53935', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 3 }}>
            <Text style={{ color: 'white', fontSize: 10 }}>{count}</Text>
          </View>
        )}
      </View>
    </Pressable>
  );
}


