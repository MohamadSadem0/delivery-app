import { useEffect } from 'react';
import { startNotificationListeners, stopNotificationListeners } from '@/services/push/notifications.handlers';
import { requestAndGetPushToken } from '@/services/push/pushToken';
import { useAppDispatch } from '@/store/hooks';
import { registerPushTokenThunk } from '@/features/notifications/notificationsSlice';

export function useNotificationsSubscription() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    startNotificationListeners();
    (async () => { const token = await requestAndGetPushToken(); if (token) dispatch(registerPushTokenThunk(token)); })();
    return () => stopNotificationListeners();
  }, [dispatch]);
}
