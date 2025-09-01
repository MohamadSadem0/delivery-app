import React from 'react';
import Text from '@/components/ui/Text';
import { useAppSelector } from '@/store/hooks';
import { selectCourierLocation } from '@/features/orders/tracking.selectors';
import { computeEtaMinutes, distanceKm } from '@/utils/eta';

export default function OrderEta({ orderId, destination }: { orderId: number; destination?: { lat?: number; lng?: number } }) {
  const loc = useAppSelector(selectCourierLocation);
  if (!loc || !destination?.lat || !destination?.lng) return null;
  const km = distanceKm({ lat: loc.lat, lng: loc.lng }, { lat: destination.lat!, lng: destination.lng! });
  const eta = computeEtaMinutes(km, loc.speedKmh ?? 25);
  return <Text>ETA: {eta} min • {km.toFixed(1)} km</Text>;
}
