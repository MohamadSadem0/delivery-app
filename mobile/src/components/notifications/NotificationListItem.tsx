import React from 'react';
import { Pressable, View } from 'react-native';
import Text from '@/components/ui/Text';
import { useTheme } from '@/providers/ThemeProvider';
import type { AppNotification } from '@/types/models/Notification';

type Props = { item: AppNotification; onPress?: () => void };
export default function NotificationListItem({ item, onPress }: Props) {
  const { spacing, colors, radii } = useTheme();
  return (
    <Pressable onPress={onPress}>
      <View style={{ paddingVertical: spacing.md, paddingHorizontal: spacing.sm, backgroundColor: item.read ? 'transparent' : colors.surface, borderRadius: radii.md }}>
        <Text weight={item.read ? 'regular' : 'semiBold'}>{item.title}</Text>
        {item.body ? <Text muted numberOfLines={2}>{item.body}</Text> : null}
        <Text muted style={{ marginTop: spacing.xs }}>{new Date(item.createdAt).toLocaleString()}</Text>
      </View>
    </Pressable>
  );
}


