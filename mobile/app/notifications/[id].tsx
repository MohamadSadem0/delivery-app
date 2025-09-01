import React, { useEffect } from 'react';
import Screen from '@/components/layout/Screen';
import Text from '@/components/ui/Text';
import Button from '@/components/ui/Button';
import { useLocalSearchParams, router } from 'expo-router';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchNotificationById, deleteNotificationThunk, markReadThunk } from '@/features/notifications/notificationsSlice';
import { selectNotificationById } from '@/features/notifications/notifications.selectors';

export default function NotificationDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const nid = id!;
  const dispatch = useAppDispatch();
  const item = useAppSelector(selectNotificationById(nid));

  useEffect(() => {
    if (!item) dispatch(fetchNotificationById(Number(nid)));
    else if (!item.isRead) dispatch(markReadThunk(nid));
  }, [nid, item, dispatch]);

  if (!item) return <Screen><Text>Loading…</Text></Screen>;

  return (
    <Screen>
      <Text style={{ fontSize: 22 }} weight="semiBold">{item.title}</Text>
      {item.body ? <Text style={{ marginTop: 8 }}>{item.body}</Text> : null}
      <Text muted style={{ marginTop: 8 }}>{new Date(item.createdAt).toLocaleString()}</Text>
      <Button title="Delete" variant="danger" onPress={() => { dispatch(deleteNotificationThunk(nid)); router.back(); }} />
    </Screen>
  );
}
