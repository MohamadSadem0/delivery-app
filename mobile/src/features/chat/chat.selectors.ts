import type { RootState } from '@/store';

export const selectThreads = (s: RootState) => s.chat.threads;
export const selectThreadsStatus = (s: RootState) => s.chat.threadsStatus;
export const selectThreadById = (threadId: number) => (s: RootState) => s.chat.threads.find(t => t.id === threadId) || null;
export const selectMessages = (threadId: number) => (s: RootState) => s.chat.byThread[threadId]?.items || [];
export const selectMessagesStatus = (threadId: number) => (s: RootState) => s.chat.byThread[threadId]?.status || 'idle';
export const selectActiveThreadId = (s: RootState) => s.chat.activeThreadId ?? null;
