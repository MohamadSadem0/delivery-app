import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { Address } from '@/types/models/Address';
import {
  apiCreateAddress, apiDeleteAddress, apiListAddresses, apiSetDefaultAddress, apiUpdateAddress
} from './addresses.api';

type State = {
  list: { items: Address[]; status: 'idle'|'loading'|'error'; error?: string | null };
  acting: boolean;
  actionError?: string | null;
};

const initialState: State = { list: { items: [], status: 'idle' }, acting: false };

export const fetchAddresses = createAsyncThunk('addresses/list', async (_, { rejectWithValue }) => {
  try { return (await apiListAddresses()).data; }
  catch (e: any) { return rejectWithValue(e?.response?.data?.message || e.message); }
});

export const createAddress = createAsyncThunk('addresses/create', async (payload: any, { rejectWithValue }) => {
  try { return (await apiCreateAddress(payload)).data; }
  catch (e: any) { return rejectWithValue(e?.response?.data?.message || e.message); }
});

export const updateAddress = createAsyncThunk('addresses/update', async ({ id, payload }: { id: number; payload: any }, { rejectWithValue }) => {
  try { return (await apiUpdateAddress(id, payload)).data; }
  catch (e: any) { return rejectWithValue(e?.response?.data?.message || e.message); }
});

export const deleteAddress = createAsyncThunk('addresses/delete', async (id: number, { rejectWithValue }) => {
  try { await apiDeleteAddress(id); return id; }
  catch (e: any) { return rejectWithValue(e?.response?.data?.message || e.message); }
});

export const setDefaultAddress = createAsyncThunk('addresses/default', async (id: number, { rejectWithValue }) => {
  try { await apiSetDefaultAddress(id); return id; }
  catch (e: any) { return rejectWithValue(e?.response?.data?.message || e.message); }
});

const slice = createSlice({
  name: 'addresses',
  initialState,
  reducers: {},
  extraReducers: (b) => {
    b.addCase(fetchAddresses.pending, (s) => { s.list.status = 'loading'; s.list.error = null; });
    b.addCase(fetchAddresses.fulfilled, (s, a) => { s.list.status = 'idle'; s.list.items = a.payload as Address[]; });
    b.addCase(fetchAddresses.rejected, (s, a) => { s.list.status = 'error'; s.list.error = String(a.payload || 'Failed to load'); });

    b.addCase(createAddress.pending, (s) => { s.acting = true; s.actionError = null; });
    b.addCase(createAddress.fulfilled, (s, a) => { s.acting = false; s.list.items.unshift(a.payload as Address); });
    b.addCase(createAddress.rejected, (s, a) => { s.acting = false; s.actionError = String(a.payload || 'Failed'); });

    b.addCase(updateAddress.pending, (s) => { s.acting = true; s.actionError = null; });
    b.addCase(updateAddress.fulfilled, (s, a) => {
      s.acting = false;
      const upd = a.payload as Address;
      const i = s.list.items.findIndex(x => x.id === upd.id);
      if (i >= 0) s.list.items[i] = upd;
    });
    b.addCase(updateAddress.rejected, (s, a) => { s.acting = false; s.actionError = String(a.payload || 'Failed'); });

    b.addCase(deleteAddress.fulfilled, (s, a) => { s.list.items = s.list.items.filter(x => x.id !== a.payload); });

    b.addCase(setDefaultAddress.fulfilled, (s, a) => {
      const id = a.payload as number;
      s.list.items = s.list.items.map(x => ({ ...x, isDefault: x.id === id }));
    });
  }
});

export default slice.reducer;
