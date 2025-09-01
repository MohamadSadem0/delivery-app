import React from 'react';
import { Marker } from 'react-native-maps';

export default function MarkerUser({ lat, lng }: { lat: number; lng: number }) {
  return <Marker coordinate={{ latitude: lat, longitude: lng }} title="You" pinColor="#2563eb" />;
}
