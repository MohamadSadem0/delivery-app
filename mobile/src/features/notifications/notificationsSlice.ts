import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { AppNotification } from '@/types/models/Notification';
import { apiListNotifications, apiMarkAsRead, apiDeleteNotification, apiRegisterPushToken } from './notifications.api';

type State = {
  inbox: { items: AppNotification[]; page: number; status: 'idle'|'loading'|'error'; error?: string | null; total?: number };
  unseen: number;
  registration: { status: 'idle'|'loading'|'error'|'ok'; error?: string | null };
};

const initial: State = {
  inbox: { items: [], page: 1, status: 'idle', total: 0 },
  unseen: 0,
  registration: { status: 'idle' }
};

export const fetchNotifications = createAsyncThunk<any, number | undefined>('notifications/list', async (page = 1, { rejectWithValue }) => {
  try { return { page, ...(await apiListNotifications(page)) }; }
  catch (e: any) { return rejectWithValue(e?.response?.data?.message || e.message); }
});

export const markNotificationRead = createAsyncThunk<any, number>('notifications/markRead', async (id: number, { rejectWithValue }) => {
  try { return (await apiMarkAsRead(id)).data; }
  catch (e: any) { return rejectWithValue(e?.response?.data?.message || e.message); }
});

export const deleteNotification = createAsyncThunk<any, number>('notifications/delete', async (id: number, { rejectWithValue }) => {
  try { await apiDeleteNotification(id); return id; }
  catch (e: any) { return rejectWithValue(e?.response?.data?.message || e.message); }
});

export const registerPushToken = createAsyncThunk<any, { token: string; deviceId: string; platform: 'ios'|'android'|'web' }>('notifications/register', async (payload: { token: string; deviceId: string; platform: 'ios'|'android'|'web' }, { rejectWithValue }) => {
  try { await apiRegisterPushToken(payload); return true; }
  catch (e: any) { return rejectWithValue(e?.response?.data?.message || e.message); }
});

const slice = createSlice({
  name: 'notifications',
  initialState: initial,
  reducers: {
    pushReceived(s, a) {
      const n = a.payload as AppNotification;
      const exists = s.inbox.items.find(x => x.id === n.id);
      if (!exists) { s.inbox.items.unshift(n); if (!n.read) s.unseen += 1; }
    },
    setUnseen(s, a) { s.unseen = a.payload as number; },
    clearAll(s) { s.inbox.items = []; s.unseen = 0; },
  },
  extraReducers: (b) => {
    b.addCase(fetchNotifications.pending, (s) => { s.inbox.status = 'loading'; s.inbox.error = null; });
    b.addCase(fetchNotifications.fulfilled, (s, a) => {
      const { page, data, total } = a.payload as any;
      s.inbox.status = 'idle'; s.inbox.page = page; s.inbox.total = total ?? data.length;
      s.inbox.items = page > 1 ? [...s.inbox.items, ...data] : data;
      s.unseen = s.inbox.items.filter(x => !x.read).length;
    });
    b.addCase(fetchNotifications.rejected, (s, a) => { s.inbox.status = 'error'; s.inbox.error = String(a.payload || 'Failed'); });

    b.addCase(markNotificationRead.fulfilled, (s, a) => {
      const upd = a.payload as AppNotification;
      const i = s.inbox.items.findIndex(x => x.id === upd.id);
      if (i >= 0) { s.inbox.items[i] = upd; s.unseen = s.inbox.items.filter(x => !x.read).length; }
    });
    b.addCase(deleteNotification.fulfilled, (s, a) => {
      const id = a.payload as number;
      s.inbox.items = s.inbox.items.filter(x => x.id !== id);
      s.unseen = s.inbox.items.filter(x => !x.read).length;
    });

    b.addCase(registerPushToken.pending, (s) => { s.registration.status = 'loading'; s.registration.error = null; });
    b.addCase(registerPushToken.fulfilled, (s) => { s.registration.status = 'ok'; });
    b.addCase(registerPushToken.rejected, (s, a) => { s.registration.status = 'error'; s.registration.error = String(a.payload || 'Failed'); });
  }
});

export const { pushReceived, setUnseen, clearAll } = slice.actions;
export default slice.reducer;

export { registerPushToken as registerPushTokenThunk };


