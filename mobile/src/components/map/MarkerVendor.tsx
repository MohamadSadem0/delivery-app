import React from 'react';
import { Marker } from 'react-native-maps';

export default function MarkerVendor({ lat, lng }: { lat: number; lng: number }) {
  return <Marker coordinate={{ latitude: lat, longitude: lng }} title="Vendor" pinColor="#f59e0b" />;
}


