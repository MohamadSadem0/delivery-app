import { colors as lightColors, darkColors } from './colors';
import { spacing } from './spacing';
import { radii } from './radii';
import { shadows } from './shadows';
import { typography } from './typography';

export type Mode = 'light' | 'dark';

export type Theme = {
  mode: Mode;
  colors: typeof lightColors;
  spacing: typeof spacing;
  radii: typeof radii;
  shadows: typeof shadows;
  typography: typeof typography;
};

export const getTheme = (mode: Mode): Theme => ({
  mode,
  colors: mode === 'dark' ? darkColors : lightColors,
  spacing,
  radii,
  shadows,
  typography,
});
