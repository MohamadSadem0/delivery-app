import type { RefundRequest } from '@/types/models/Refund';

export type RefundsResponse = { data: RefundRequest[] };
export type RefundResponse = { ok: true; refund: RefundRequest };
