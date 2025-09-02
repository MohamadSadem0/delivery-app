import type { AppNotification } from '@/types/models/Notification';
import type { PushToken } from '@/types/models/PushToken';

export type RegisterTokenPayload = { token: string; deviceId: string; platform: 'ios'|'android'|'web' };
export type RegisterTokenResponse = { ok: true; token: PushToken };

export type NotificationsListResponse = { data: AppNotification[]; total?: number };
export type NotificationResponse = { data: AppNotification };
