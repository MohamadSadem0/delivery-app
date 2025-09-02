export type NotificationKind =
  | 'order_status'     // order status changed
  | 'promo'            // marketing
  | 'chat'             // chat message
  | 'system';          // app/system notice

export type AppNotification = {
  id: number;
  kind: NotificationKind;
  title: string;
  body?: string | null;
  image?: string | null;
  data?: Record<string, any>;
  read: boolean;
  createdAt: string;
};
