import type { RootState } from '@/store';

export const selectAuthStatus = (s: RootState) => s.auth?.status ?? 'idle';
export const selectAuthUser = (s: RootState) => s.auth?.user ?? null;
export const selectIsAuthenticated = (s: RootState) => Boolean(s.auth?.user);
export const selectAuthError = (s: RootState) => s.auth?.error ?? undefined;

