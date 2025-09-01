import React, { useEffect } from 'react';
import Screen from '@/components/layout/Screen';
import Text from '@/components/ui/Text';
import { useLocalSearchParams, router } from 'expo-router';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { ensureThread } from '@/features/chat/chatSlice';
import { selectActiveThreadId } from '@/features/chat/chat.selectors';

/**
 * Creates (or finds) a chat thread for an order, then redirects to it.
 */
export default function OrderChatLauncher() {
  const { orderId, vendorId, driverId } = useLocalSearchParams<{ orderId: string; vendorId?: string; driverId?: string }>();
  const dispatch = useAppDispatch();
  const activeId = useAppSelector(selectActiveThreadId);

  useEffect(() => {
    (async () => {
      await dispatch(ensureThread({ orderId: Number(orderId), vendorId: vendorId ? Number(vendorId) : undefined, driverId: driverId ? Number(driverId) : undefined } as any));
    })();
  }, [dispatch, orderId, vendorId, driverId]);

  useEffect(() => { if (activeId) router.replace(`/chat/${activeId}`); }, [activeId]);

  return <Screen><Text>Opening chat…</Text></Screen>;
}
