import * as Notifications from 'expo-notifications';

export async function scheduleLocal(title: string, body?: string) {
  return Notifications.scheduleNotificationAsync({
    content: { title, body },
    trigger: null, // immediate
  });
}

