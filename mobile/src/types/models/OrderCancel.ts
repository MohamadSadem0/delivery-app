export type CancelReason = {
  code: string;          // e.g., 'CHANGE_OF_MIND', 'WRONG_ADDRESS', 'DELAYED'
  label: string;         // human readable
  requiresNote?: boolean;
  allowAfterDispatch?: boolean; // if true, permitted when order already on the way (subject to vendor policy)
};

export type CancellationRequest = {
  id: number;
  orderId: number;
  reasonCode: string;
  note?: string | null;
  createdAt: string;
  status: 'requested' | 'accepted' | 'rejected';
  refundId?: number | null;
};

