import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { UserPrefs, ThemeMode, Language, Currency } from '@/types/models/UserPrefs';

const initialState: UserPrefs = {
  theme: 'system',
  language: 'en',
  currency: 'LBP',
  pushEnabled: true,
};

const slice = createSlice({
  name: 'preferences',
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<ThemeMode>) { state.theme = action.payload; },
    setLanguage(state, action: PayloadAction<Language>) { state.language = action.payload; },
    setCurrency(state, action: PayloadAction<Currency>) { state.currency = action.payload; },
    setPushEnabled(state, action: PayloadAction<boolean>) { state.pushEnabled = action.payload; },
  },
});

export const { setTheme, setLanguage, setCurrency, setPushEnabled } = slice.actions;
export default slice.reducer;
