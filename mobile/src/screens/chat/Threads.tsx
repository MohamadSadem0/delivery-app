import React, { useEffect } from 'react';
import Screen from '@/components/layout/Screen';
import Text from '@/components/ui/Text';
import { FlatList } from 'react-native';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchThreads } from '@/features/chat/chatSlice';
import { selectThreads, selectThreadsStatus } from '@/features/chat/chat.selectors';
import ThreadRow from '@/components/chat/ThreadRow';
import EmptyState from '@/components/common/EmptyState';

export default function ThreadsScreen() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectThreads);
  const status = useAppSelector(selectThreadsStatus);

  useEffect(() => { dispatch(fetchThreads({ page: 1, pageSize: 50 })); }, [dispatch]);

  return (
    <Screen>
      <Text style={{ fontSize: 22, marginBottom: 12 }} weight="semiBold">Messages</Text>
      {status === 'loading' ? <Text>Loadingâ€¦</Text> : (
        <FlatList
          data={items}
          keyExtractor={(t) => String(t.id)}
          renderItem={({ item }) => <ThreadRow item={item} />}
          ListEmptyComponent={<EmptyState title="No conversations yet" subtitle="Message a vendor or driver from an order." />}
        />
      )}
    </Screen>
  );
}


