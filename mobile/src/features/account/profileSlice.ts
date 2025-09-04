import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { User } from '@/types/models/User';
import { apiGetProfile, apiUpdateProfile } from './profile.api';

type ProfileState = {
  status: 'idle' | 'loading' | 'error';
  me: User | null;
  error?: string;
};

const initialState: ProfileState = {
  status: 'idle',
  me: null,
};

export const fetchProfile = createAsyncThunk('profile/fetch', async (_, { rejectWithValue }) => {
  try {
    return await apiGetProfile();
  } catch (e: any) {
    return rejectWithValue(e?.response?.data?.message || e.message);
  }
});

export const updateProfileThunk = createAsyncThunk('profile/update', async (patch: Partial<User>, { rejectWithValue }) => {
  try {
    return await apiUpdateProfile(patch);
  } catch (e: any) {
    return rejectWithValue(e?.response?.data?.message || e.message);
  }
});

const slice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile(state, action: PayloadAction<User | null>) {
      state.me = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProfile.pending, s => { s.status = 'loading'; s.error = undefined; })
      .addCase(fetchProfile.fulfilled, (s, a) => { s.status = 'idle'; s.me = a.payload as User; })
      .addCase(fetchProfile.rejected, (s, a) => { s.status = 'error'; s.error = String(a.payload || 'Failed to load profile'); })
      .addCase(updateProfileThunk.fulfilled, (s, a) => { s.me = a.payload as User; });
  },
});

export const { setProfile } = slice.actions;
export default slice.reducer;

