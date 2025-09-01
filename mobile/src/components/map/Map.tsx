import React, { forwardRef } from 'react';
import MapView, { PROVIDER_GOOGLE, LatLng } from 'react-native-maps';

type Props = React.ComponentProps<typeof MapView> & {
  initialCenter?: LatLng;
  initialZoomDelta?: number;
};

const Map = forwardRef<MapView, Props>(({ initialCenter, initialZoomDelta = 0.02, ...rest }, ref) => {
  return (
    <MapView
      ref={ref}
      provider={PROVIDER_GOOGLE}
      style={{ width: '100%', height: '100%' }}
      initialRegion={initialCenter ? {
        latitude: initialCenter.latitude,
        longitude: initialCenter.longitude,
        latitudeDelta: initialZoomDelta,
        longitudeDelta: initialZoomDelta,
      } : undefined}
      {...rest}
    />
  );
});

export default Map;
