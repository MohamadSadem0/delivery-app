import React from 'react';
import { FlatList, View } from 'react-native';
import ChatBubble from './ChatBubble';
import type { Message } from '@/types/models/Chat';

export default function MessageList({ data, myUserId }: { data: Message[]; myUserId?: number | null }) {
  return (
    <FlatList
      data={data}
      keyExtractor={(m) => String(m.id)}
      renderItem={({ item }) => (
        <View style={{ paddingHorizontal: 12 }}>
          <ChatBubble body={item.body} mine={myUserId != null && item.userId === myUserId} />
        </View>
      )}
    />
  );
}
