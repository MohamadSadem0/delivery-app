export type ChatParticipant = {
  id: number;
  type: 'user' | 'vendor' | 'driver' | 'support';
  name?: string | null;
  avatarUrl?: string | null;
};

export type Thread = {
  id: number;
  orderId?: number | null;
  vendorId?: number | null;
  driverId?: number | null;
  participants: ChatParticipant[];
  lastMessage?: Message | null;
  unreadCount?: number;
  createdAt: string;
  updatedAt: string;
};

export type Message = {
  id: number;
  threadId: number;
  userId?: number | null;      // sender (customer) if applicable
  vendorId?: number | null;    // or vendor
  driverId?: number | null;    // or driver
  body: string;
  attachments?: string[] | null;
  createdAt: string;           // ISO
};

