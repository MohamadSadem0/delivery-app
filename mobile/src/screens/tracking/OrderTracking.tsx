import React from 'react';
import Screen from '@/components/layout/Screen';
import Text from '@/components/ui/Text';
import TrackingMap from '@/components/tracking/TrackingMap';
import ETAChip from '@/components/tracking/ETAChip';
import RecenterButton from '@/components/tracking/RecenterButton';
import { useLocalSearchParams } from 'expo-router';
import { useLiveTracking } from '@/hooks/useLiveTracking';

export default function OrderTrackingScreen() {
  const { orderId } = useLocalSearchParams<{ orderId: string }>();
  const id = Number(orderId);
  const { snap, status } = useLiveTracking(id);

  if (!id) return <Screen><Text>Invalid order</Text></Screen>;
  if (!snap || status === 'loading') return <Screen><Text>Loading trackingâ€¦</Text></Screen>;

  return (
    <Screen>
      <Text style={{ fontSize: 18, marginBottom: 8 }} weight="semiBold">Order #{snap.orderId} â€” {snap.status || 'On the way'}</Text>
      <ETAChip etaSeconds={snap.etaSeconds} distanceMeters={snap.distanceMeters} />
      <TrackingMap snap={snap} />
      <RecenterButton onPress={() => { /* fitToCoordinates is handled inside map via effect on props */ }} />
    </Screen>
  );
}


