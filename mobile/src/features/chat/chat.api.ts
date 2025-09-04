import { axiosInstance } from '@/api/axiosBase';
import { endpoints } from '@/api/endpoints';
import type { ThreadsResponse, MessagesResponse, SendMessagePayload } from './chat.types';
import type { Thread, Message } from '@/types/models/Chat';

export async function apiListThreads(params?: { page?: number; pageSize?: number }): Promise<ThreadsResponse> {
  const res = await axiosInstance.get(endpoints.chat.threads, { params });
  return res.data;
}

export async function apiCreateThread(payload: { orderId?: number; vendorId?: number; driverId?: number }): Promise<{ thread: Thread }> {
  const res = await axiosInstance.post(endpoints.chat.threads, payload);
  return res.data;
}

export async function apiGetThread(threadId: number): Promise<{ thread: Thread }> {
  const res = await axiosInstance.get(endpoints.chat.thread(threadId));
  return res.data;
}

export async function apiListMessages(threadId: number, params?: { afterId?: number; beforeId?: number; limit?: number }): Promise<MessagesResponse> {
  const res = await axiosInstance.get(endpoints.chat.messages(threadId), { params });
  return res.data;
}

export async function apiSendMessage(threadId: number, payload: SendMessagePayload): Promise<{ message: Message }> {
  const res = await axiosInstance.post(endpoints.chat.messages(threadId), { text: payload.text, attachments: payload.attachments || [] });
  return res.data;
}

export async function apiMarkRead(threadId: number, lastMessageId: number): Promise<{ ok: true }> {
  const res = await axiosInstance.post(endpoints.chat.read(threadId), { lastMessageId });
  return res.data;
}

