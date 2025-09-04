import React, { useEffect, useRef } from 'react';
import { View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import MapView from 'react-native-maps';
import Map from '@/components/map/Map';
import MarkerUser from '@/components/map/MarkerUser';
import MarkerCourier from '@/components/map/MarkerCourier';
import MarkerVendor from '@/components/map/MarkerVendor';
import RouteLine from '@/components/map/RouteLine';
import Screen from '@/components/layout/Screen';
import Text from '@/components/ui/Text';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchCourierLocation, fetchOrderPath } from '@/features/orders/trackingSlice';
import { selectCourierLocation, selectTrackPath } from '@/features/orders/tracking.selectors';
import { useUserLocation } from '@/hooks/useUserLocation';
import { useInterval } from '@/hooks/useInterval';

export default function TrackMap() {
  const { orderId } = useLocalSearchParams<{ orderId: string }>();
  const id = Number(orderId);
  const dispatch = useAppDispatch();
  const loc = useAppSelector(selectCourierLocation);
  const path = useAppSelector(selectTrackPath);
  const { coords } = useUserLocation();
  const ref = useRef<MapView>(null);

  useEffect(() => {
    if (!Number.isNaN(id)) {
      dispatch(fetchCourierLocation(id));
      dispatch(fetchOrderPath(id));
    }
  }, [id, dispatch]);

  useInterval(() => {
    if (!Number.isNaN(id)) dispatch(fetchCourierLocation(id));
  }, 10000);

  const points = [];
  if (coords) points.push({ lat: coords.latitude, lng: coords.longitude });
  if (loc) points.push({ lat: loc.lat, lng: loc.lng });

  return (
    <Screen>
      <View style={{ height: 300, borderRadius: 12, overflow: 'hidden' }}>
        <Map ref={ref} initialCenter={coords ? { latitude: coords.latitude, longitude: coords.longitude } : undefined}>
          {coords ? <MarkerUser lat={coords.latitude} lng={coords.longitude} /> : null}
          {loc ? <MarkerCourier lat={loc.lat} lng={loc.lng} bearing={loc.bearing} /> : null}
          <RouteLine points={path} />
        </Map>
      </View>
      <View style={{ marginTop: 12 }}>
        <Text>Courier location: {loc ? `${loc.lat.toFixed(5)}, ${loc.lng.toFixed(5)}` : '—'}</Text>
        <Text muted>Auto-refreshes every 10s</Text>
      </View>
    </Screen>
  );
}
