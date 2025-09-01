import { axiosInstance } from '@/api/axiosBase';
import { endpoints } from '@/api/endpoints';
import type { Credentials, RegisterPayload, AuthUser, AuthTokens } from './auth.types';

export async function apiLogin(data: Credentials): Promise<{ user: AuthUser; tokens: AuthTokens }> {
  const res = await axiosInstance.post(endpoints.auth.login, data);
  return res.data;
}

export async function apiRegister(data: RegisterPayload): Promise<{ user: AuthUser; tokens: AuthTokens }> {
  const res = await axiosInstance.post(endpoints.auth.register, data);
  return res.data;
}

export async function apiMe(): Promise<AuthUser> {
  const res = await axiosInstance.get(endpoints.auth.me);
  return res.data;
}

export async function apiRefresh(): Promise<AuthTokens> {
  const res = await axiosInstance.post(endpoints.auth.refresh);
  return res.data;
}

export async function apiLogout(): Promise<void> {
  await axiosInstance.post(endpoints.auth.logout);
}
