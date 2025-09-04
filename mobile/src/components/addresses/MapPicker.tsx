import React, { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps';
import Button from '@/components/ui/Button';
import { useTheme } from '@/providers/ThemeProvider';
import * as Location from 'expo-location';

type Props = { initial?: { latitude: number; longitude: number }; onPick: (coords: { latitude: number; longitude: number }) => void; };

export default function MapPicker({ initial, onPick }: Props) {
  const { spacing } = useTheme();
  const ref = useRef<MapView | null>(null);
  const [coords, setCoords] = useState(initial || { latitude: 33.8938, longitude: 35.5018 }); // Beirut
  const [region, setRegion] = useState<Region>({ latitude: coords.latitude, longitude: coords.longitude, latitudeDelta: 0.02, longitudeDelta: 0.02 });

  useEffect(() => { setRegion(r => ({ ...r, latitude: coords.latitude, longitude: coords.longitude })); }, [coords]);

  return (
    <View style={{ height: 240 }}>
      <MapView
        ref={ref} provider={PROVIDER_GOOGLE} style={{ flex: 1 }} initialRegion={region}
        onPress={(e) => setCoords(e.nativeEvent.coordinate)}
      >
        <Marker coordinate={coords} draggable onDragEnd={(e) => setCoords(e.nativeEvent.coordinate)} />
      </MapView>
      <View style={{ position: 'absolute', right: spacing.md, bottom: spacing.md, gap: spacing.sm }}>
        <Button title="Use my location" variant="outline" onPress={async () => {
          const { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') return;
          const loc = await Location.getCurrentPositionAsync({});
          const c = { latitude: loc.coords.latitude, longitude: loc.coords.longitude };
          setCoords(c);
          ref.current?.animateToRegion({ latitude: c.latitude, longitude: c.longitude, latitudeDelta: 0.01, longitudeDelta: 0.01 });
        }} />
        <Button title="Use this pin" onPress={() => onPick(coords)} />
      </View>
    </View>
  );
}


