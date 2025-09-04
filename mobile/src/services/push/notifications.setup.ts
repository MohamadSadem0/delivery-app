import * as Notifications from 'expo-notifications';
export function configureNotifications() {
  Notifications.setNotificationHandler({ handleNotification: async (_: any) => ({ shouldShowAlert: true, shouldPlaySound: false, shouldSetBadge: false } as any) });
  Notifications.setNotificationChannelAsync('default', { name: 'Default', importance: Notifications.AndroidImportance.DEFAULT }).catch(() => {});
}

