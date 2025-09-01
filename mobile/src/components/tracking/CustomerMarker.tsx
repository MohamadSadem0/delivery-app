import React from 'react';
import { Marker } from 'react-native-maps';
import type { LatLng } from '@/types/models/Tracking';
export default function CustomerMarker({ pos }: { pos: LatLng }) { return <Marker coordinate={pos} title="Delivery" pinColor="#28f" />; }
