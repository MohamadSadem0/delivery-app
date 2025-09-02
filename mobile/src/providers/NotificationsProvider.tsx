import React, { useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { useAppDispatch } from '@/store/hooks';
import { registerPushToken } from '@/features/notifications/notificationsSlice';
import { handleForegroundNotification, handleNotificationResponse } from '@/features/notifications/notificationHandlers';
import { getOrCreateDeviceId } from '@/utils/device';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true, shouldPlaySound: false, shouldSetBadge: false,
  })
});

export default function NotificationsProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Ask permission & register token
    (async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') return;
      const token = await Notifications.getExpoPushTokenAsync({ projectId: process.env.EXPO_PUBLIC_EAS_PROJECT_ID as string | undefined });
      const deviceId = await getOrCreateDeviceId();
      dispatch(registerPushToken({ token: token.data, deviceId, platform: Platform.OS as any }) as any);
    })();

    const sub1 = Notifications.addNotificationReceivedListener(handleForegroundNotification);
    const sub2 = Notifications.addNotificationResponseReceivedListener(handleNotificationResponse);
    return () => { sub1.remove(); sub2.remove(); };
  }, [dispatch]);

  return <>{children}</>;
}
