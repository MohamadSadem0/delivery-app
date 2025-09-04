import React, { useEffect } from 'react';
import Screen from '@/components/layout/Screen';
import Text from '@/components/ui/Text';
import MessageList from '@/components/chat/MessageList';
import ChatInput from '@/components/chat/ChatInput';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useLocalSearchParams } from 'expo-router';
import { selectMessages, selectMessagesStatus, selectThreadById } from '@/features/chat/chat.selectors';
import { fetchMessages, sendMessageThunk } from '@/features/chat/chatSlice';
import { useChatMessages } from '@/hooks/useChatMessages';

export default function ChatRoomScreen() {
  const { threadId } = useLocalSearchParams<{ threadId: string }>();
  const tid = Number(threadId);
  const dispatch = useAppDispatch();
  const thread = useAppSelector(selectThreadById(tid));
  const { list } = useChatMessages(tid);
  const status = useAppSelector(selectMessagesStatus(tid));

  useEffect(() => { if (tid) dispatch(fetchMessages({ threadId: tid, limit: 50 })); }, [dispatch, tid]);

  if (!tid) return <Screen><Text>Invalid thread.</Text></Screen>;
  if (!thread) return <Screen><Text>Loadingâ€¦</Text></Screen>;

  return (
    <Screen>
      <Text style={{ fontSize: 18, marginBottom: 8 }} weight="semiBold">{thread.participants?.map((p: any) => p.name).filter(Boolean).join(', ') || 'Conversation'}</Text>
      <MessageList data={list} />
      <ChatInput onSend={(text) => dispatch(sendMessageThunk({ threadId: tid, text }))} disabled={status === 'sending'} />
    </Screen>
  );
}


