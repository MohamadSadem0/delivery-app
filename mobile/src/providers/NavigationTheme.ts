import type { Theme as NavTheme } from '@react-navigation/native';
import { getTheme } from '@/theme';

export function getNavigationTheme(mode: 'light' | 'dark'): NavTheme {
  const t = getTheme(mode);
  return {
    dark: mode === 'dark',
    colors: {
      primary: t.colors.primary,
      background: t.colors.background,
      card: t.colors.surface,
      text: t.colors.text,
      border: t.colors.border,
      notification: t.colors.accent,
    },
  } as any;
}

