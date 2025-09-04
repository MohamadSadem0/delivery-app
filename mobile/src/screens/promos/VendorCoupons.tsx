import React, { useEffect } from 'react';
import Screen from '@/components/layout/Screen';
import Text from '@/components/ui/Text';
import CouponList from '@/components/promos/CouponList';
import { useLocalSearchParams } from 'expo-router';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchVendorCoupons } from '@/features/promos/promosSlice';
import { selectVendorCoupons, selectVendorCouponsStatus } from '@/features/promos/promos.selectors';

export default function VendorCouponsScreen() {
  const { vendorId } = useLocalSearchParams<{ vendorId: string }>();
  const vid = Number(vendorId);
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectVendorCoupons(vid));
  const status = useAppSelector(selectVendorCouponsStatus(vid));

  useEffect(() => { if (vid) dispatch(fetchVendorCoupons(vid)); }, [dispatch, vid]);

  return (
    <Screen>
      <Text style={{ fontSize: 22, marginBottom: 12 }} weight="semiBold">Vendor coupons</Text>
      {status === 'loading' ? <Text>Loadingâ€¦</Text> : <CouponList data={items} />}
    </Screen>
  );
}


