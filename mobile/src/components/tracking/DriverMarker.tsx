import React from 'react';
import { Marker } from 'react-native-maps';
import type { DriverLocation } from '@/types/models/Tracking';

export default function DriverMarker({ loc }: { loc: DriverLocation }) {
  return (
    <Marker
      coordinate={{ latitude: loc.latitude, longitude: loc.longitude }}
      anchor={{ x: 0.5, y: 0.5 }}
      rotation={loc.heading || 0}
      flat
      title="Driver"
      description={loc.speedKph ? `${Math.round(loc.speedKph)} km/h` : undefined}
    />
  );
}
