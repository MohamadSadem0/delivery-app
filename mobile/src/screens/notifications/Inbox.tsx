import React, { useEffect } from 'react';
import { FlatList } from 'react-native';
import Screen from '@/components/layout/Screen';
import Text from '@/components/ui/Text';
import NotificationListItem from '@/components/notifications/NotificationListItem';
import EmptyInbox from '@/components/common/EmptyInbox';
import Button from '@/components/ui/Button';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchNotifications } from '@/features/notifications/notificationsSlice'; import markAllReadThunk from '@/features/notifications/notificationsSlice';
import * as notifSel from '@/features/notifications/notifications.selectors';
import { router } from 'expo-router';

export default function InboxScreen() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(notifSel.selectNotifications);

  useEffect(() => { dispatch(fetchNotifications()); }, [dispatch]);

  return (
    <Screen>
      <Text style={{ fontSize: 22, marginBottom: 12 }} weight="semiBold">Notifications</Text>
      <Button title="Mark all as read" variant="outline" onPress={() => {}} />
      <FlatList
        data={(items as any)}
        keyExtractor={n => String(n.id)}
        renderItem={({ item }) => (
          <NotificationListItem item={item} onPress={() => router.push(`/notifications/${item.id}`)} />
        )}
        ListEmptyComponent={<EmptyInbox />}
      />
    </Screen>
  );
}


