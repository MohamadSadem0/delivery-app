import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { AuthState, Credentials, RegisterPayload, AuthUser } from './auth.types';
import { apiLogin, apiMe, apiRegister, apiLogout } from './auth.api';
import { saveTokens, clearTokens } from './tokens.storage';

const initialState: AuthState = {
  status: 'idle',
  user: null,
};

export const loginThunk = createAsyncThunk('auth/login', async (creds: Credentials, { rejectWithValue }) => {
  try {
    const { user, tokens } = await apiLogin(creds);
    await saveTokens(tokens);
    return user;
  } catch (e: any) {
    return rejectWithValue(e?.response?.data?.message || e.message);
  }
});

export const registerThunk = createAsyncThunk('auth/register', async (payload: RegisterPayload, { rejectWithValue }) => {
  try {
    const { user, tokens } = await apiRegister(payload);
    await saveTokens(tokens);
    return user;
  } catch (e: any) {
    return rejectWithValue(e?.response?.data?.message || e.message);
  }
});

export const meThunk = createAsyncThunk('auth/me', async (_, { rejectWithValue }) => {
  try {
    const user: AuthUser = await apiMe();
    return user;
  } catch (e: any) {
    return rejectWithValue(e?.response?.data?.message || e.message);
  }
});

export const logoutThunk = createAsyncThunk('auth/logout', async () => {
  try {
    await apiLogout();
  } finally {
    await clearTokens();
  }
});

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload || null;
      state.status = state.user ? 'authenticated' : 'idle';
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loginThunk.pending, state => {
        state.status = 'loading';
        state.error = undefined;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.status = 'authenticated';
        state.user = action.payload;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.status = 'error';
        state.error = String(action.payload || 'Login failed');
      })
      .addCase(registerThunk.pending, state => {
        state.status = 'loading';
        state.error = undefined;
      })
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.status = 'authenticated';
        state.user = action.payload;
      })
      .addCase(registerThunk.rejected, (state, action) => {
        state.status = 'error';
        state.error = String(action.payload || 'Register failed');
      })
      .addCase(meThunk.fulfilled, (state, action) => {
        state.status = 'authenticated';
        state.user = action.payload;
      })
      .addCase(meThunk.rejected, state => {
        // keep user null; do not set error to avoid noisy splash
      })
      .addCase(logoutThunk.fulfilled, state => {
        state.status = 'idle';
        state.user = null;
      });
  },
});

export const { setUser } = slice.actions;
export default slice.reducer;

