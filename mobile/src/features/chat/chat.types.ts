import type { Message, Thread } from '@/types/models/Chat';

export type ThreadsResponse = { data: Thread[]; total?: number };
export type MessagesResponse = { data: Message[]; hasMore?: boolean };

export type SendMessagePayload = { text: string; attachments?: string[] };
