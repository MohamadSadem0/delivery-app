import React from 'react';
import { View } from 'react-native';
import Text from '@/components/ui/Text';
import { useTheme } from '@/providers/ThemeProvider';
import { useUserLocation } from '@/hooks/useUserLocation';
import { haversineKm } from '@/utils/geo';

export default function DistanceBadge({ lat, lng }: { lat?: number; lng?: number }) {
  const { colors, radii, spacing } = useTheme();
  const { coords } = useUserLocation();

  if (lat == null || lng == null || !coords) return null;
  const km = haversineKm(coords.latitude, coords.longitude, lat, lng);
  const label = km < 1 ? `${Math.round(km * 1000)} m` : `${km.toFixed(1)} km`;

  return (
    <View style={{ backgroundColor: colors.surface, borderRadius: radii.pill, paddingHorizontal: spacing.sm, paddingVertical: spacing.xs }}>
      <Text muted>{label}</Text>
    </View>
  );
}
