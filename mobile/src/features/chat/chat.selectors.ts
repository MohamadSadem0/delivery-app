import type { RootState } from '@/store';

export const selectThreads = (s: RootState) => (s as any).chat.threads;
export const selectThreadsStatus = (s: RootState) => (s as any).chat.threadsStatus;
export const selectThreadById = (threadId: number) => (s: RootState) => (s as any).chat.threads.find((t: any) => t.id === threadId) || null;
export const selectMessages = (threadId: number) => (s: RootState) => (s as any).chat.byThread[threadId]?.items || [];
export const selectMessagesStatus = (threadId: number) => (s: RootState) => (s as any).chat.byThread[threadId]?.status || 'idle';
export const selectActiveThreadId = (s: RootState) => (s as any).chat.activeThreadId ?? null;

