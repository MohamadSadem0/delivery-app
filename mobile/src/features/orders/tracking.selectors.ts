import type { RootState } from '@/store';

export const selectTracking = (s: RootState) => (s as any).tracking as any;
export const selectCourierLocation = (s: RootState) => (s as any).tracking.lastLocation ?? null;
export const selectTrackPath = (s: RootState) => (s as any).tracking.path ?? [];

