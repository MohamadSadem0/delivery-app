import * as Notifications from 'expo-notifications';
import { store } from '@/store';
import { pushReceived } from './notificationsSlice';

// Called when a push arrives while app is foregrounded
export function handleForegroundNotification(notification: Notifications.Notification) {
  const { title, body, data } = notification.request.content;
  const id = Number(data?.id || Date.now());
  store.dispatch(pushReceived({
    id,
    kind: (data?.kind || 'system'),
    title: title || 'Notification',
    body: body || null,
    image: data?.image || null,
    data,
    read: false,
    createdAt: new Date().toISOString(),
  }));
}

// Called when user taps a notification
export function handleNotificationResponse(response: Notifications.NotificationResponse) {
  const url = response.notification.request.content.data?.url as string | undefined;
  if (url) {
    // Let deep links handler navigate
    import('@/features/deeplinks/deepLinks.handlers').then(m => m.navigateFromURL(url));
  }
}
