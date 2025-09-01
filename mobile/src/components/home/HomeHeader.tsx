import React from 'react';
import { View, Pressable } from 'react-native';
import Text from '@/components/ui/Text';
import { useTheme } from '@/providers/ThemeProvider';
import { useAppSelector } from '@/store/hooks';
import { selectMe } from '@/features/account/profile.selectors';
import { router } from 'expo-router';
import NotificationBell from '@/components/notifications/NotificationBell';

export default function HomeHeader() {
  const { spacing, colors, radii } = useTheme();
  const me = useAppSelector(selectMe);

  return (
    <View style={{ marginBottom: spacing.md }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text weight="semiBold" style={{ fontSize: 22 }}>Hi {me?.name?.split(' ')[0] ?? 'there'} 👋</Text>
        <NotificationBell />
      </View>
      <Pressable
        onPress={() => router.push('/search')}
        style={{ marginTop: spacing.sm, padding: spacing.md, borderRadius: radii.md, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.card }}
      >
        <Text muted>Search products, vendors…</Text>
      </Pressable>
    </View>
  );
}
