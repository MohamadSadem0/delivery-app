import { createSlice } from '@reduxjs/toolkit';

type AppState = {
  booted: boolean;
  version: string;
};

const initialState: AppState = {
  booted: false,
  version: '1.0.0',
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setBooted(state, action) {
      state.booted = Boolean(action.payload);
    },
    setVersion(state, action) {
      state.version = String(action.payload ?? state.version);
    },
  },
});

export const { setBooted, setVersion } = appSlice.actions;
export default appSlice.reducer;

