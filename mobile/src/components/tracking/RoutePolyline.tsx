import React, { useMemo } from 'react';
import { Polyline } from 'react-native-maps';
import type { RouteGeometry } from '@/types/models/Tracking';
import { decodePolyline } from '@/utils/polyline';

export default function RoutePolyline({ route }: { route?: RouteGeometry | null }) {
  const coords = useMemo(() => {
    if (!route) return [];
    if (route.type === 'positions') return route.coords;
    return decodePolyline(route.encoded);
  }, [route]);
  if (!coords.length) return null;
  return <Polyline coordinates={coords} strokeWidth={4} />;
}
