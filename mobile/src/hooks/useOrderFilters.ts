import { useMemo } from 'react';
import { useAppSelector } from '@/store/hooks';
import { selectOrderFilters } from '@/features/orders/history.selectors';
export function useOrderFilters() { const f = useAppSelector(selectOrderFilters); return useMemo(() => f, [f]); }
