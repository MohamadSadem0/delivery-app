import React, { useEffect } from 'react';
import Screen from '@/components/layout/Screen';
import Text from '@/components/ui/Text';
import CouponList from '@/components/promos/CouponList';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchGlobalCoupons } from '@/features/promos/promosSlice';
import { selectGlobalCoupons, selectGlobalCouponsStatus } from '@/features/promos/promos.selectors';
import { router } from 'expo-router';

export default function PromoCenterScreen() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectGlobalCoupons);
  const status = useAppSelector(selectGlobalCouponsStatus);

  useEffect(() => { dispatch(fetchGlobalCoupons()); }, [dispatch]);

  return (
    <Screen>
      <Text style={{ fontSize: 22, marginBottom: 12 }} weight="semiBold">Promotions</Text>
      {status === 'loading' ? <Text>Loadingâ€¦</Text> : <CouponList data={items} onApply={(code) => router.push({ pathname: '/checkout', params: { code } } as any)} />}
    </Screen>
  );
}


