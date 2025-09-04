import { setToken, getToken, deleteToken, setRefreshToken, getRefreshToken, deleteRefreshToken } from '@/services/storage/secure';
import type { AuthTokens } from './auth.types';

export async function saveTokens(tokens: AuthTokens) {
  await setToken(tokens.accessToken);
  if (tokens.refreshToken) {
    await setRefreshToken(tokens.refreshToken);
  }
}

export async function loadAccessToken() {
  return getToken();
}

export async function loadRefreshToken() {
  return getRefreshToken();
}

export async function clearTokens() {
  await deleteToken();
  await deleteRefreshToken();
}

