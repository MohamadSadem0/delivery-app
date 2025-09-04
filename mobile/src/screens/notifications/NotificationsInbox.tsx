import React, { useEffect, useState } from 'react';
import Screen from '@/components/layout/Screen';
import Text from '@/components/ui/Text';
import { FlatList } from 'react-native';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectInbox, selectInboxStatus } from '@/features/notifications/notifications.selectors';
import { deleteNotification, fetchNotifications, markNotificationRead } from '@/features/notifications/notificationsSlice';
import NotificationRow from '@/components/notifications/NotificationRow';
import { router } from 'expo-router';

export default function NotificationsInbox() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectInbox);
  const status = useAppSelector(selectInboxStatus);
  const [page, setPage] = useState(1);

  useEffect(() => { dispatch(fetchNotifications((1) as any) as any); }, [dispatch]);

  return (
    <Screen>
      <Text weight="semiBold" style={{ fontSize: 22, marginBottom: 8 }}>Notifications</Text>
      {status === 'loading' && !items.length ? <Text>Loadingâ€¦</Text> : (
        <FlatList
          data={items}
          keyExtractor={(x) => String(x.id)}
          renderItem={({ item }) => (
            <NotificationRow
              item={item}
              onPress={() => {
                dispatch(markNotificationRead(item.id) as any);
                router.push(`/notifications/${item.id}` as any);
              }}
            />
          )}
          onEndReachedThreshold={0.6}
          onEndReached={() => { const next = page + 1; setPage(next); dispatch(fetchNotifications((next) as any) as any); }}
        />
      )}
    </Screen>
  );
}


