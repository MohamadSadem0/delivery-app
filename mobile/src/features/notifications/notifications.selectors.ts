import type { RootState } from '@/store';
export const selectNotifications = (s: RootState) => s.notifications.list;
export const selectNotificationById = (id: number | string) => (s: RootState) => s.notifications.byId[String(id)] ?? null;
export const selectUnreadCount = (s: RootState) => s.notifications.unreadCount;
