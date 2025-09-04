import React from 'react';
import Screen from '@/components/layout/Screen';
import Text from '@/components/ui/Text';
import { useAppSelector } from '@/store/hooks';
import { useLocalSearchParams } from 'expo-router';

export default function NotificationDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const item = useAppSelector(s => s.notifications.inbox.items.find(x => String(x.id) === String(id)));
  if (!item) return <Screen><Text>Not found</Text></Screen>;
  return (
    <Screen>
      <Text weight="semiBold" style={{ fontSize: 22 }}>{item.title}</Text>
      {item.body ? <Text style={{ marginTop: 8 }}>{item.body}</Text> : null}
      {item.data?.url ? <Text muted style={{ marginTop: 8 }}>Link: {String(item.data.url)}</Text> : null}
    </Screen>
  );
}


