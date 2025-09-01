import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchMessages } from '@/features/chat/chatSlice';
import { selectMessages, selectMessagesStatus } from '@/features/chat/chat.selectors';
import { CHAT_POLL_MS } from '@/constants/chat';

/**
 * Poll new messages every CHAT_POLL_MS. Backend should support `afterId` param.
 */
export function useChatMessages(threadId: number) {
  const dispatch = useAppDispatch();
  const list = useAppSelector(selectMessages(threadId));
  const status = useAppSelector(selectMessagesStatus(threadId));
  const timer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    void dispatch(fetchMessages({ threadId, limit: 50 }));
    timer.current = setInterval(() => {
      const lastId = list.length ? list[list.length - 1].id : undefined;
      void dispatch(fetchMessages({ threadId, afterId: lastId } as any));
    }, CHAT_POLL_MS);
    return () => { if (timer.current) clearInterval(timer.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [threadId]);

  return { list, status };
}
