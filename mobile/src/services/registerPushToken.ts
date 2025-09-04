import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { getOrCreateDeviceId } from '@/utils/device';
import { store } from '@/store';
import { registerPushToken } from '@/features/notifications/notificationsSlice';

export async function ensureRegisteredForPush() {
  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== 'granted') return false;
  const token = await Notifications.getExpoPushTokenAsync({ projectId: process.env.EXPO_PUBLIC_EAS_PROJECT_ID as string | undefined });
  const deviceId = await getOrCreateDeviceId();
  store.dispatch((registerPushToken as any)({ token: token.data, deviceId, platform: Platform.OS as any }) as any);
  return true;
}

