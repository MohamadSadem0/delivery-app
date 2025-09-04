import React from 'react';
import { Pressable, View, Image } from 'react-native';
import Text from '@/components/ui/Text';
import type { AppNotification } from '@/types/models/Notification';
import { useTheme } from '@/providers/ThemeProvider';

export default function NotificationRow({ item, onPress }: { item: AppNotification; onPress?: () => void; }) {
  const { colors, spacing, radii } = useTheme();
  return (
    <Pressable onPress={onPress}>
      <View style={{ flexDirection: 'row', gap: spacing.md, paddingVertical: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border }}>
        {!!item.image && <Image source={{ uri: item.image }} style={{ width: 48, height: 48, borderRadius: radii.md }} />}
        <View style={{ flex: 1 }}>
          <Text weight={item.read ? 'regular' : 'semiBold'}>{item.title}</Text>
          {item.body ? <Text muted numberOfLines={2}>{item.body}</Text> : null}
          <Text muted style={{ marginTop: 2 }}>{new Date(item.createdAt).toLocaleString()}</Text>
        </View>
      </View>
    </Pressable>
  );
}


