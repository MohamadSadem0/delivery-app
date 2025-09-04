import React from 'react';
import { Pressable, View } from 'react-native';
import { Image } from 'expo-image';
import Card from '@/components/ui/Card';
import Text from '@/components/ui/Text';
import { useTheme } from '@/providers/ThemeProvider';
import type { Vendor } from '@/types/models/Vendor';
import { router } from 'expo-router';

export default function VendorCard({ vendor }: { vendor: Vendor }) {
  const { spacing, radii } = useTheme();
  return (
    <Pressable onPress={() => router.push(`/vendors/${vendor.id}`)}>
      <Card style={{ padding: 0 }}>
        <Image
          source={vendor.coverUrl ?? require('@/../assets/images/placeholder-cover.png')}
          style={{ width: '100%', height: 120, borderTopLeftRadius: radii.lg, borderTopRightRadius: radii.lg }}
          contentFit="cover"
        />
        <View style={{ padding: spacing.md, flexDirection: 'row', alignItems: 'center', gap: spacing.md }}>
          <Image
            source={vendor.logoUrl ?? require('@/../assets/images/placeholder-logo.png')}
            style={{ width: 40, height: 40, borderRadius: 20 }}
          />
          <View style={{ flex: 1 }}>
            <Text weight="semiBold" numberOfLines={1}>{vendor.name}</Text>
            {vendor.city ? <Text muted numberOfLines={1}>{vendor.city}</Text> : null}
          </View>
        </View>
      </Card>
    </Pressable>
  );
}


