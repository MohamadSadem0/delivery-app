import type { RootState } from '@/store';

export const selectMe = (s: RootState) => s.profile.me;
export const selectProfileStatus = (s: RootState) => s.profile.status;
