import { axiosInstance } from '@/api/axiosBase';
import { endpoints } from '@/api/endpoints';
import type { AppNotification } from '@/types/models/Notification';

export async function apiListNotifications(): Promise<AppNotification[]> {
  const res = await axiosInstance.get(endpoints.notifications.list);
  return res.data;
}
export async function apiGetNotification(id: number | string): Promise<AppNotification> {
  const res = await axiosInstance.get(endpoints.notifications.detail(id));
  return res.data;
}
export async function apiMarkRead(id: number | string): Promise<{ ok: true }> {
  const res = await axiosInstance.post(endpoints.notifications.read(id));
  return res.data;
}
export async function apiMarkAllRead(): Promise<{ ok: true }> {
  const res = await axiosInstance.post(endpoints.notifications.readAll);
  return res.data;
}
export async function apiDeleteNotification(id: number | string): Promise<{ ok: true }> {
  const res = await axiosInstance.delete(endpoints.notifications.detail(id));
  return res.data;
}
export async function apiRegisterPushToken(token: string): Promise<{ ok: true }> {
  const res = await axiosInstance.post(endpoints.notifications.registerDevice, { token });
  return res.data;
}
