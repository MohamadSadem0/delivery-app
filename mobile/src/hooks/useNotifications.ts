import { useEffect } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { fetchNotifications } from '@/features/notifications/notificationsSlice';

export function useNotifications(page = 1) {
  const dispatch = useAppDispatch();
  useEffect(() => { dispatch(fetchNotifications((page) as any) as any); }, [dispatch, page]);
}

