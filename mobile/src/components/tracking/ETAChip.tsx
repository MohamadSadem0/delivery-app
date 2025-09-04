import React from 'react';
import { View } from 'react-native';
import Text from '@/components/ui/Text';
import { useTheme } from '@/providers/ThemeProvider';

function fmt(mins: number) {
  if (mins < 1) return '<1m';
  if (mins < 60) return Math.round(mins) + 'm';
  const h = Math.floor(mins/60), m = Math.round(mins%60);
  return h + 'h ' + (m ? m + 'm' : '');
}

export default function ETAChip({ etaSeconds, distanceMeters }: { etaSeconds?: number | null; distanceMeters?: number | null }) {
  const { colors, spacing, radii } = useTheme();
  const mins = etaSeconds != null ? etaSeconds / 60 : null;
  const distKm = distanceMeters != null ? (distanceMeters / 1000) : null;
  return (
    <View style={{ position: 'absolute', top: spacing.md, alignSelf: 'center', backgroundColor: colors.card, borderRadius: radii.pill, paddingHorizontal: spacing.md, paddingVertical: spacing.xs, elevation: 3 }}>
      <Text weight="semiBold">{mins != null ? fmt(mins) : '--'} Â· {distKm != null ? distKm.toFixed(1) + ' km' : '--'}</Text>
    </View>
  );
}


