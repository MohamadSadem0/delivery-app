import React, { createContext, useContext, useMemo, PropsWithChildren } from 'react';
import { useColorScheme } from 'react-native';
import { getTheme, Theme } from '@/theme';

/**
 * ThemeContext exposes the computed design tokens for current color scheme.
 */
const ThemeContext = createContext<Theme | null>(null);

export default function ThemeProvider({ children }: PropsWithChildren) {
  const scheme = useColorScheme(); // 'light' | 'dark' | null
  const theme = useMemo(() => getTheme(scheme === 'dark' ? 'dark' : 'light'), [scheme]);
  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
}

export function useTheme(): Theme {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}

export function useThemeMode() {
  const theme = useTheme();
  return {
    isDark: theme.mode === 'dark',
    barStyle: theme.mode === 'dark' ? 'light' : 'dark' as const,
    backgroundColor: theme.colors.background,
    theme,
  };
}
