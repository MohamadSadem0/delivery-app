import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { ensureThread, getThreadById } from '@/features/chat/chatSlice';
import { selectThreadById } from '@/features/chat/chat.selectors';

/**
 * Ensure thread exists (by orderId/vendorId/driverId) OR load by id.
 * Returns the selector result which might be null until loaded.
 */
export function useChatThread(opts: { threadId?: number; orderId?: number; vendorId?: number; driverId?: number }) {
  const dispatch = useAppDispatch();
  const thread = useAppSelector(opts.threadId ? selectThreadById(opts.threadId) : () => null);

  useEffect(() => {
    if (opts.threadId) dispatch(getThreadById(opts.threadId));
    else dispatch(ensureThread({ orderId: opts.orderId, vendorId: opts.vendorId, driverId: opts.driverId } as any));
  }, [dispatch, opts.threadId, opts.orderId, opts.vendorId, opts.driverId]);

  return thread;
}

