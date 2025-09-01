import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
export async function requestAndGetPushToken(): Promise<string | null> {
  const settings = await Notifications.getPermissionsAsync();
  let status = settings.status;
  if (status !== 'granted') { const r = await Notifications.requestPermissionsAsync(); status = r.status; }
  if (status !== 'granted') return null;
  const projectId = Constants.expoConfig?.extra?.eas?.projectId || Constants.easConfig?.projectId || process.env.EXPO_PUBLIC_EAS_PROJECT_ID;
  const token = await Notifications.getExpoPushTokenAsync(projectId ? { projectId } as any : undefined);
  return token.data ?? null;
}
