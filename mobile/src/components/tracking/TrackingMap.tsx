import React, { useEffect, useMemo, useRef } from 'react';
import MapView, { PROVIDER_GOOGLE, Region } from 'react-native-maps';
import type { OrderTrackingSnapshot } from '@/types/models/Tracking';
import RoutePolyline from './RoutePolyline';
import DriverMarker from './DriverMarker';
import VendorMarker from './VendorMarker';
import CustomerMarker from './CustomerMarker';
import { MAP_DELTA_DEFAULT } from '@/constants/tracking';

export default function TrackingMap({ snap }: { snap: OrderTrackingSnapshot }) {
  const ref = useRef<MapView | null>(null);
  const initial = useMemo<Region>(() => ({
    latitude: snap.driver?.latitude || snap.vendor.latitude,
    longitude: snap.driver?.longitude || snap.vendor.longitude,
    ...MAP_DELTA_DEFAULT,
  }), [snap]);

  useEffect(() => {
    const coords = [
      snap.vendor,
      snap.customer,
      ...(snap.driver ? [snap.driver] : []),
    ].map(c => ({ latitude: c.latitude, longitude: c.longitude }));
    if (ref.current && coords.length >= 2) {
      ref.current.fitToCoordinates(coords, { edgePadding: { top: 80, left: 40, right: 40, bottom: 120 }, animated: true });
    }
  }, [snap.vendor.latitude, snap.vendor.longitude, snap.customer.latitude, snap.customer.longitude, snap.driver?.latitude, snap.driver?.longitude]);

  return (
    <MapView ref={ref} provider={PROVIDER_GOOGLE} style={{ flex: 1 }} initialRegion={initial}>
      <RoutePolyline route={snap.route} />
      {snap.driver ? <DriverMarker loc={snap.driver} /> : null}
      <VendorMarker pos={snap.vendor} />
      <CustomerMarker pos={snap.customer} />
    </MapView>
  );
}


