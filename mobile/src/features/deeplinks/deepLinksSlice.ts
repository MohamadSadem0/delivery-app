import { createSlice } from '@reduxjs/toolkit';

type State = { lastUrl?: string | null; lastNavigated?: string | null };
const initial: State = { lastUrl: null, lastNavigated: null };

const slice = createSlice({
  name: 'deeplinks',
  initialState: initial,
  reducers: {
    linkReceived(s, a) { s.lastUrl = a.payload as string; },
    linkNavigated(s, a) { s.lastNavigated = a.payload as string; },
  }
});

export const { linkReceived, linkNavigated } = slice.actions;
export default slice.reducer;

