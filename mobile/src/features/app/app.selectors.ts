import type { RootState } from '@/store';

export const selectAppBooted = (s: RootState) => s.app.booted;
export const selectAppVersion = (s: RootState) => s.app.version;

