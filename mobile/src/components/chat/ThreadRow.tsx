import React from 'react';
import { View, Pressable } from 'react-native';
import Text from '@/components/ui/Text';
import { useTheme } from '@/providers/ThemeProvider';
import type { Thread } from '@/types/models/Chat';
import { timeAgo } from '@/utils/timeAgo';
import { router } from 'expo-router';

export default function ThreadRow({ item }: { item: Thread }) {
  const { spacing, colors, radii } = useTheme();
  const lastAt = item.lastMessage?.createdAt || item.updatedAt;
  return (
    <Pressable onPress={() => router.push(`/chat/${item.id}`)}>
      <View style={{ paddingVertical: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border }}>
        <Text weight="semiBold">{item.participants?.map(p => p.name).filter(Boolean).join(', ') || 'Conversation'}</Text>
        {item.lastMessage ? <Text muted numberOfLines={1}>{item.lastMessage.body}</Text> : <Text muted>No messages yet</Text>}
        <Text muted>{timeAgo(lastAt)}</Text>
      </View>
    </Pressable>
  );
}
