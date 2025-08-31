export type NotificationType = 'order_status' | 'promotion' | 'system' | 'chat' | 'unknown';
export type AppNotification = {
  id: number | string;
  title: string;
  body?: string | null;
  data?: Record<string, any> | null;
  type?: NotificationType;
  isRead: boolean;
  createdAt: string; // ISO
};
