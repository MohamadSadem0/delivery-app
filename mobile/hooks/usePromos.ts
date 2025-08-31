import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchPromos } from '@/features/promos/promosSlice';
import { selectPromos } from '@/features/promos/promos.selectors';

export function usePromos() {
  const dispatch = useAppDispatch();
  const promos = useAppSelector(selectPromos);
  useEffect(() => { if (!promos.length) dispatch(fetchPromos()); }, [promos.length, dispatch]);
  return promos;
}
