import type { RootState } from '@/store';
export const selectCancelReasons = (orderId: number) => (s: RootState) => s.cancellation.byOrder[orderId]?.reasons.items || [];
export const selectCancelReasonsStatus = (orderId: number) => (s: RootState) => s.cancellation.byOrder[orderId]?.reasons.status || 'idle';
export const selectCancellation = (orderId: number) => (s: RootState) => s.cancellation.byOrder[orderId]?.request.data || null;
export const selectCancellationActing = (orderId: number) => (s: RootState) => s.cancellation.byOrder[orderId]?.acting || false;
export const selectCancellationError = (orderId: number) => (s: RootState) => s.cancellation.byOrder[orderId]?.actionError || null;
