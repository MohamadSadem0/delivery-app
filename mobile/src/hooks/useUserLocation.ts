import { useEffect, useState } from 'react';
import * as Location from 'expo-location';

export function useUserLocation() {
  const [coords, setCoords] = useState<{ latitude: number; longitude: number } | null>(null);
  useEffect(() => {
    let mounted = true;
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') return;
      const loc = await Location.getCurrentPositionAsync({});
      if (mounted) setCoords({ latitude: loc.coords.latitude, longitude: loc.coords.longitude });
    })();
    return () => { mounted = false; };
  }, []);
  return { coords };
}
