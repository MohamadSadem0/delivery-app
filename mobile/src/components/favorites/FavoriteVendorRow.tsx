import React from 'react';
import { View, Image, Pressable } from 'react-native';
import Text from '@/components/ui/Text';
import { useTheme } from '@/providers/ThemeProvider';
import type { FavoriteVendor } from '@/types/models/Favorite';
import WishlistVendorButton from './WishlistVendorButton';
import { router } from 'expo-router';

export default function FavoriteVendorRow({ item }: { item: FavoriteVendor }) {
  const { spacing, colors, radii } = useTheme();
  return (
    <Pressable onPress={() => router.push(`/vendors/${item.vendorId}`)}>
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border }}>
        {item.logo ? <Image source={{ uri: item.logo }} style={{ width: 48, height: 48, borderRadius: radii.full, marginRight: spacing.md }} /> : null}
        <Text weight="semiBold" style={{ flex: 1 }}>{item.vendorName}</Text>
        <WishlistVendorButton vendorId={item.vendorId} />
      </View>
    </Pressable>
  );
}
