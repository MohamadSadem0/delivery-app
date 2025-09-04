export type ThemeMode = 'system' | 'light' | 'dark';
export type Language = 'en' | 'ar';
export type Currency = 'LBP' | 'USD';

export type UserPrefs = {
  theme: ThemeMode;
  language: Language;
  currency: Currency;
  pushEnabled: boolean;
};

