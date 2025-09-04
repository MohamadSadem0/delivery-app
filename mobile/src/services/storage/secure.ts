import * as SecureStore from 'expo-secure-store';
import { STORAGE_KEYS } from '@/constants/config';

export async function setToken(token: string) {
  await SecureStore.setItemAsync(STORAGE_KEYS.token, token);
}
export async function getToken() {
  return SecureStore.getItemAsync(STORAGE_KEYS.token);
}
export async function deleteToken() {
  await SecureStore.deleteItemAsync(STORAGE_KEYS.token);
}

export async function setRefreshToken(token: string) {
  await SecureStore.setItemAsync(STORAGE_KEYS.refreshToken, token);
}
export async function getRefreshToken() {
  return SecureStore.getItemAsync(STORAGE_KEYS.refreshToken);
}
export async function deleteRefreshToken() {
  await SecureStore.deleteItemAsync(STORAGE_KEYS.refreshToken);
}

