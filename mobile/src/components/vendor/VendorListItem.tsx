import React from 'react';
import { Pressable, View } from 'react-native';
import { Image } from 'expo-image';
import Text from '@/components/ui/Text';
import { useTheme } from '@/providers/ThemeProvider';
import type { Vendor } from '@/types/models/Vendor';
import RatingStars from './RatingStars';
import DistanceBadge from '@/components/map/DistanceBadge';
import { router } from 'expo-router';

export default function VendorListItem({ vendor }: { vendor: Vendor }) {
  const { spacing, radii } = useTheme();
  return (
    <Pressable onPress={() => router.push(`/vendors/${vendor.id}`)}>
      <View style={{ flexDirection: 'row', gap: spacing.md, alignItems: 'center' }}>
        <Image
          source={vendor.logoUrl ?? require('@/../assets/images/placeholder-logo.png')}
          style={{ width: 56, height: 56, borderRadius: radii.md }}
        />
        <View style={{ flex: 1 }}>
          <Text weight="semiBold">{vendor.name}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <RatingStars value={vendor.rating ?? 0} />
            <DistanceBadge lat={(vendor as any).lat} lng={(vendor as any).lng} />
          </View>
        </View>
      </View>
    </Pressable>
  );
}


