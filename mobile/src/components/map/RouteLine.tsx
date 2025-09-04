import React from 'react';
import { Polyline } from 'react-native-maps';

export default function RouteLine({ points }: { points: { lat: number; lng: number }[] }) {
  if (!points.length) return null;
  return (
    <Polyline
      coordinates={points.map(p => ({ latitude: p.lat, longitude: p.lng }))}
      strokeWidth={4}
    />
  );
}


