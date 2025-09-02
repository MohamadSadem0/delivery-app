import { axiosInstance } from '@/api/axiosBase';
import { endpoints } from '@/api/endpoints';
import type { RegisterTokenPayload, RegisterTokenResponse, NotificationsListResponse, NotificationResponse } from './notifications.types';

export async function apiRegisterPushToken(payload: RegisterTokenPayload): Promise<RegisterTokenResponse> {
  const res = await axiosInstance.post(endpoints.notifications.registerToken, payload);
  return res.data;
}

export async function apiListNotifications(page = 1): Promise<NotificationsListResponse> {
  const res = await axiosInstance.get(endpoints.notifications.list, { params: { page } });
  return res.data;
}

export async function apiMarkAsRead(id: number): Promise<NotificationResponse> {
  const res = await axiosInstance.post(endpoints.notifications.markRead(id), {});
  return res.data;
}

export async function apiDeleteNotification(id: number): Promise<{ ok: true }> {
  const res = await axiosInstance.delete(endpoints.notifications.remove(id));
  return res.data;
}

export async function apiPingTest(payload: { title: string; body?: string; data?: any }) {
  const res = await axiosInstance.post(endpoints.notifications.test, payload);
  return res.data; // { ok: true }
}
