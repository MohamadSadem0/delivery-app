import type { RootState } from '@/store';
export const selectModerationActing = (s: RootState) => (s as any).moderation?.acting || false;
export const selectModerationError = (s: RootState) => (s as any).moderation?.error || null;
export const selectModerationOk = (s: RootState) => (s as any).moderation?.ok || false;
