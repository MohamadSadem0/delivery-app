import React from 'react';
import { Marker } from 'react-native-maps';

export default function MarkerCourier({ lat, lng, bearing }: { lat: number; lng: number; bearing?: number | null }) {
  return (
    <Marker
      coordinate={{ latitude: lat, longitude: lng }}
      title="Courier"
      rotation={bearing ?? 0}
      anchor={{ x: 0.5, y: 0.5 }}
      flat
      pinColor="#22c55e"
    />
  );
}
