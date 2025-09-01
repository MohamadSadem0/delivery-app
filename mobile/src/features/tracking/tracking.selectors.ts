import type { RootState } from '@/store';
export const selectTrackingBucket = (orderId: number) => (s: RootState) => s.tracking.byOrder[orderId] || { snapshot: null, status: 'idle' };
export const selectTrackingSnapshot = (orderId: number) => (s: RootState) => s.tracking.byOrder[orderId]?.snapshot || null;
export const selectTrackingStatus = (orderId: number) => (s: RootState) => s.tracking.byOrder[orderId]?.status || 'idle';
