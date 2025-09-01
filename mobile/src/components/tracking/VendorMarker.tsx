import React from 'react';
import { Marker } from 'react-native-maps';
import type { LatLng } from '@/types/models/Tracking';
export default function VendorMarker({ pos }: { pos: LatLng }) { return <Marker coordinate={pos} title="Vendor" pinColor="#2f8" />; }
