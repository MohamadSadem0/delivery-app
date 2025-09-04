import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchGlobalCoupons } from '@/features/promos/promosSlice';
import { selectGlobalCoupons } from '@/features/promos/promos.selectors';

export function usePromos() {
  const dispatch = useAppDispatch();
  const promos = useAppSelector(selectGlobalCoupons);
  useEffect(() => { if (!promos.length) dispatch(fetchGlobalCoupons() as any); }, [promos.length, dispatch]);
  return promos;
}

