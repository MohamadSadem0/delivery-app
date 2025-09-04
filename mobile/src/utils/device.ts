import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

const KEY = 'device-id';

export async function getOrCreateDeviceId() {
  let value = await SecureStore.getItemAsync(KEY);
  if (!value) {
    value = `${Platform.OS}-${Date.now()}-${Math.random().toString(36).slice(2,10)}`;
    await SecureStore.setItemAsync(KEY, value);
  }
  return value;
}

