import type { CancellationRequest, CancelReason } from '@/types/models/OrderCancel';

export type CancelReasonsResponse = { data: CancelReason[] };
export type CancelResponse = { ok: true; cancellation: CancellationRequest };
export type CancellationDetailResponse = { data: CancellationRequest };
