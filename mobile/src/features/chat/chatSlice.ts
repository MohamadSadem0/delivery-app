import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Thread, Message } from '@/types/models/Chat';
import { apiListThreads, apiListMessages, apiSendMessage, apiCreateThread, apiGetThread } from './chat.api';

type MessagesBucket = {
  status: 'idle' | 'loading' | 'sending' | 'error';
  items: Message[];
  hasMore: boolean;
  error?: string;
  lastFetchedAt?: number;
};

type State = {
  threads: Thread[];
  threadsStatus: 'idle' | 'loading' | 'error';
  threadsError?: string;
  byThread: Record<number, MessagesBucket>;
  activeThreadId?: number | null;
};

const initialBucket: MessagesBucket = { status: 'idle', items: [], hasMore: true };
const initialState: State = { threads: [], threadsStatus: 'idle', byThread: {}, activeThreadId: null };

export const fetchThreads = createAsyncThunk('chat/fetchThreads', async (params: { page?: number; pageSize?: number } | undefined, { rejectWithValue }) => {
  try { const r = await apiListThreads(params); return r.data; } catch (e: any) { return rejectWithValue(e?.response?.data?.message || e.message); }
});

export const ensureThread = createAsyncThunk('chat/ensureThread', async (payload: { orderId?: number; vendorId?: number; driverId?: number }, { rejectWithValue }) => {
  try { const r = await apiCreateThread(payload); return r.thread; } catch (e: any) { return rejectWithValue(e?.response?.data?.message || e.message); }
});

export const getThreadById = createAsyncThunk('chat/getThread', async (threadId: number, { rejectWithValue }) => {
  try { const r = await apiGetThread(threadId); return r.thread; } catch (e: any) { return rejectWithValue(e?.response?.data?.message || e.message); }
});

export const fetchMessages = createAsyncThunk('chat/fetchMessages', async (args: { threadId: number; afterId?: number; beforeId?: number; limit?: number }, { rejectWithValue }) => {
  try { const r = await apiListMessages(args.threadId, { afterId: args.afterId, beforeId: args.beforeId, limit: args.limit }); return { threadId: args.threadId, ...r }; }
  catch (e: any) { return rejectWithValue({ threadId: args.threadId, message: e?.response?.data?.message || e.message }); }
});

export const sendMessageThunk = createAsyncThunk('chat/sendMessage', async ({ threadId, text, attachments }: { threadId: number; text: string; attachments?: string[] }, { rejectWithValue }) => {
  try { const r = await apiSendMessage(threadId, { text, attachments }); return { threadId, message: r.message }; }
  catch (e: any) { return rejectWithValue(e?.response?.data?.message || e.message); }
});

const slice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setActiveThread(state, a: PayloadAction<number | null>) { state.activeThreadId = a.payload; },
    upsertThread(state, a: PayloadAction<Thread>) {
      const t = a.payload;
      const i = state.threads.findIndex(x => x.id === t.id);
      if (i >= 0) state.threads[i] = { ...state.threads[i], ...t };
      else state.threads.unshift(t);
    },
    prependOlderMessages(state, a: PayloadAction<{ threadId: number; older: Message[]; hasMore: boolean }>) {
      const b = state.byThread[a.payload.threadId] || (state.byThread[a.payload.threadId] = { ...initialBucket });
      b.items = [...a.payload.older, ...b.items];
      b.hasMore = a.payload.hasMore;
    },
  },
  extraReducers: b => {
    b.addCase(fetchThreads.pending, s => { s.threadsStatus = 'loading'; s.threadsError = undefined; });
    b.addCase(fetchThreads.fulfilled, (s, a) => { s.threadsStatus = 'idle'; s.threads = a.payload as Thread[]; });
    b.addCase(fetchThreads.rejected, (s, a) => { s.threadsStatus = 'error'; s.threadsError = String(a.payload || 'Failed to load'); });

    b.addCase(getThreadById.fulfilled, (s, a) => {
      const t = a.payload as Thread; const i = s.threads.findIndex(x => x.id === t.id); if (i >= 0) s.threads[i] = t; else s.threads.unshift(t);
    });
    b.addCase(ensureThread.fulfilled, (s, a) => {
      const t = a.payload as Thread; const i = s.threads.findIndex(x => x.id === t.id); if (i >= 0) s.threads[i] = t; else s.threads.unshift(t); s.activeThreadId = t.id;
    });

    b.addCase(fetchMessages.pending, (s, a) => {
      const threadId = (a.meta.arg as any).threadId;
      const bucket = s.byThread[threadId] || (s.byThread[threadId] = { ...initialBucket });
      bucket.status = 'loading';
    });
    b.addCase(fetchMessages.fulfilled, (s, a) => {
      const { threadId, data, hasMore } = a.payload as any;
      const bucket = s.byThread[threadId] || (s.byThread[threadId] = { ...initialBucket });
      // merge new messages by id (assuming ascending by id or createdAt)
      const seen = new Set(bucket.items.map(m => m.id));
      for (const m of data as Message[]) if (!seen.has(m.id)) bucket.items.push(m);
      bucket.items.sort((a, b) => a.id - b.id);
      bucket.status = 'idle';
      bucket.hasMore = !!hasMore;
      bucket.lastFetchedAt = Date.now();
    });
    b.addCase(fetchMessages.rejected, (s, a) => {
      const { threadId, message } = (a.payload as any) || {};
      if (threadId != null) {
        const bucket = s.byThread[threadId] || (s.byThread[threadId] = { ...initialBucket });
        bucket.status = 'error'; bucket.error = message || 'Failed to load messages';
      }
    });

    b.addCase(sendMessageThunk.pending, (s, a) => {
      const threadId = (a.meta.arg as any).threadId;
      const bkt = s.byThread[threadId] || (s.byThread[threadId] = { ...initialBucket });
      bkt.status = 'sending';
    });
    b.addCase(sendMessageThunk.fulfilled, (s, a) => {
      const { threadId, message } = a.payload as any;
      const bkt = s.byThread[threadId] || (s.byThread[threadId] = { ...initialBucket });
      bkt.items.push(message);
      bkt.items.sort((a, b) => a.id - b.id);
      bkt.status = 'idle';
      // update preview
      const idx = s.threads.findIndex(t => t.id === threadId);
      if (idx >= 0) s.threads[idx].lastMessage = message;
    });
    b.addCase(sendMessageThunk.rejected, (s, a) => {
      const threadId = (a.meta.arg as any)?.threadId;
      if (threadId != null) {
        const bkt = s.byThread[threadId] || (s.byThread[threadId] = { ...initialBucket });
        bkt.status = 'error'; bkt.error = String(a.payload || 'Failed to send');
      }
    });
  },
});

export const { setActiveThread, upsertThread, prependOlderMessages } = slice.actions;
export default slice.reducer;
