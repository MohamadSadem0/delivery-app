import React from 'react';
import { View } from 'react-native';
import { Image } from 'expo-image';
import Text from '@/components/ui/Text';
import { useTheme } from '@/providers/ThemeProvider';
import type { Vendor } from '@/types/models/Vendor';

export default function VendorHeader({ vendor }: { vendor: Vendor }) {
  const { radii, spacing } = useTheme();
  return (
    <View>
      <Image
        source={vendor.coverUrl ?? require('@/../assets/images/placeholder-cover.png')}
        style={{ width: '100%', height: 140, borderRadius: radii.lg }}
        contentFit="cover"
      />
      <View style={{ marginTop: spacing.sm, flexDirection: 'row', alignItems: 'center', gap: spacing.md }}>
        <Image
          source={vendor.logoUrl ?? require('@/../assets/images/placeholder-logo.png')}
          style={{ width: 56, height: 56, borderRadius: 28 }}
        />
        <View style={{ flex: 1 }}>
          <Text weight="semiBold" style={{ fontSize: 20 }}>{vendor.name}</Text>
          {vendor.city ? <Text muted>{vendor.city}</Text> : null}
        </View>
      </View>
    </View>
  );
}
