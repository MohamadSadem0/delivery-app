/**
 * Semantic color tokens first, derived brand palette underneath.
 */
const brand = {
  primary: '#0BA5E9',   // cyan-500
  primaryDark: '#0284C7',
  accent: '#F59E0B',    // amber-500
  success: '#16A34A',   // green-600
  warning: '#D97706',   // amber-600
  danger:  '#DC2626',   // red-600
};

export const colors = {
  // LIGHT
  text: '#0F172A',          // slate-900
  textMuted: '#475569',     // slate-600
  background: '#FFFFFF',
  surface: '#F8FAFC',       // slate-50
  card: '#FFFFFF',
  border: '#E2E8F0',        // slate-200
  overlay: 'rgba(0,0,0,0.2)',
  primary: brand.primary,
  accent: brand.accent,
  success: brand.success,
  warning: brand.warning,
  danger: brand.danger,
};

export const darkColors = {
  // DARK
  text: '#E2E8F0',          // slate-200
  textMuted: '#94A3B8',     // slate-400
  background: '#0B1220',    // near slate-950
  surface: '#111827',       // slate-900
  card: '#0F172A',          // slate-900
  border: '#1F2937',        // slate-800
  overlay: 'rgba(255,255,255,0.12)',
  primary: brand.primaryDark,
  accent: brand.accent,
  success: brand.success,
  warning: brand.warning,
  danger: brand.danger,
};

export { brand };
