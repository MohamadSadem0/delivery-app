import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchRoute, fetchTracking } from '@/features/tracking/trackingSlice';
import { selectTrackingSnapshot, selectTrackingStatus } from '@/features/tracking/tracking.selectors';
import { TRACK_POLL_MS } from '@/constants/tracking';

/**
 * Polls tracking snapshot every TRACK_POLL_MS. Also fetches route once at mount.
 */
export function useLiveTracking(orderId: number) {
  const dispatch = useAppDispatch();
  const snap = useAppSelector(selectTrackingSnapshot(orderId));
  const status = useAppSelector(selectTrackingStatus(orderId));
  const timer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    void dispatch(fetchTracking(orderId));
    void dispatch(fetchRoute(orderId));
    timer.current = setInterval(() => { void dispatch(fetchTracking(orderId)); }, TRACK_POLL_MS);
    return () => { if (timer.current) clearInterval(timer.current); };
  }, [dispatch, orderId]);

  return { snap, status };
}
