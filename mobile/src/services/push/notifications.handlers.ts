import * as Notifications from 'expo-notifications';
import { AppState } from 'react-native';
import { router } from 'expo-router';
import type { AppNotification } from '@/types/models/Notification';
import { pushReceived } from '@/features/notifications/notificationsSlice';
import { store } from '@/store';

let subReceived: Notifications.Subscription | null = null;
let subResponse: Notifications.Subscription | null = null;

export function startNotificationListeners() {
  stopNotificationListeners();
  subReceived = Notifications.addNotificationReceivedListener((payload) => {
    const data = payload.request.content.data || {};
    const n: AppNotification = {
      id: (Number(payload.request.identifier) || Date.now()),
      title: payload.request.content.title || 'Notification',
      body: payload.request.content.body,
      data: data as any,
      kind: (data as any).type || 'unknown',
      read: AppState.currentState === 'active',
      createdAt: new Date().toISOString(),
    };
    store.dispatch(pushReceived(n));
  });
  subResponse = Notifications.addNotificationResponseReceivedListener((resp) => {
    const data = resp.notification.request.content.data || {};
    const link = (data as any).link as string | undefined;
    if (link) router.push(link);
    else if ((data as any).notificationId) router.push(`/notifications/${(data as any).notificationId}`);
  });
}
export function stopNotificationListeners() { subReceived?.remove(); subReceived = null; subResponse?.remove(); subResponse = null; }

