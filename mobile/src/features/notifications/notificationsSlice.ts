import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { AppNotification } from '@/types/models/Notification';
import { apiDeleteNotification, apiGetNotification, apiListNotifications, apiMarkAllRead, apiMarkRead, apiRegisterPushToken } from './notifications.api';

type State = {
  status: 'idle' | 'loading' | 'error';
  list: AppNotification[];
  byId: Record<string, AppNotification>;
  unreadCount: number;
  error?: string;
  deviceToken?: string | null;
};
const initialState: State = { status: 'idle', list: [], byId: {}, unreadCount: 0, deviceToken: null };

export const fetchNotifications = createAsyncThunk('notifications/fetch', async (_, { rejectWithValue }) => {
  try { return await apiListNotifications(); } catch (e: any) { return rejectWithValue(e?.response?.data?.message || e.message); }
});
export const fetchNotificationById = createAsyncThunk('notifications/fetchById', async (id: number, { rejectWithValue }) => {
  try { return await apiGetNotification(id); } catch (e: any) { return rejectWithValue(e?.response?.data?.message || e.message); }
});
export const markReadThunk = createAsyncThunk('notifications/markRead', async (id: number | string, { rejectWithValue }) => {
  try { await apiMarkRead(id); return id; } catch (e: any) { return rejectWithValue(e?.response?.data?.message || e.message); }
});
export const markAllReadThunk = createAsyncThunk('notifications/markAllRead', async (_, { rejectWithValue }) => {
  try { await apiMarkAllRead(); return true; } catch (e: any) { return rejectWithValue(e?.response?.data?.message || e.message); }
});
export const deleteNotificationThunk = createAsyncThunk('notifications/delete', async (id: number | string, { rejectWithValue }) => {
  try { await apiDeleteNotification(id); return id; } catch (e: any) { return rejectWithValue(e?.response?.data?.message || e.message); }
});
export const registerPushTokenThunk = createAsyncThunk('notifications/registerToken', async (token: string, { rejectWithValue }) => {
  try { await apiRegisterPushToken(token); return token; } catch (e: any) { return rejectWithValue(e?.response?.data?.message || e.message); }
});

const slice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    receiveLocal(state, { payload }: { payload: AppNotification }) {
      const n = payload; const id = String(n.id);
      state.byId[id] = n; state.list = [n, ...state.list];
      if (!n.isRead) state.unreadCount += 1;
    },
  },
  extraReducers: b => {
    b.addCase(fetchNotifications.pending, s => { s.status = 'loading'; s.error = undefined; })
     .addCase(fetchNotifications.fulfilled, (s, a) => {
        s.status = 'idle'; const list = a.payload as AppNotification[]; s.list = list; s.byId = {}; let unread = 0;
        for (const n of list) { const id = String(n.id); s.byId[id] = n; if (!n.isRead) unread += 1; }
        s.unreadCount = unread;
      })
     .addCase(fetchNotifications.rejected, (s, a) => { s.status = 'error'; s.error = String(a.payload || 'Failed to load notifications'); })
     .addCase(fetchNotificationById.fulfilled, (s, a) => { const n = a.payload as AppNotification; s.byId[String(n.id)] = n; })
     .addCase(markReadThunk.fulfilled, (s, a) => { const id = String(a.payload as any); const n = s.byId[id]; if (n && !n.isRead) { n.isRead = true; s.unreadCount = Math.max(0, s.unreadCount - 1); } })
     .addCase(markAllReadThunk.fulfilled, s => { for (const n of s.list) n.isRead = true; s.unreadCount = 0; })
     .addCase(deleteNotificationThunk.fulfilled, (s, a) => { const id = String(a.payload as any); const n = s.byId[id]; if (n && !n.isRead) s.unreadCount = Math.max(0, s.unreadCount - 1); s.list = s.list.filter(x => String(x.id) != id); delete s.byId[id]; })
     .addCase(registerPushTokenThunk.fulfilled, (s, a) => { s.deviceToken = a.payload as string; });
  },
});
export const { receiveLocal } = slice.actions;
export default slice.reducer;
