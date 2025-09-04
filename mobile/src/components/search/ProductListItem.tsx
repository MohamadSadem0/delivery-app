import React from 'react';
import { View, Image, Pressable } from 'react-native';
import Text from '@/components/ui/Text';
import { useTheme } from '@/providers/ThemeProvider';
import type { ProductHit } from '@/types/models/Search';
import { navToProduct, navToVendor } from '@/utils/navigation';
import { formatPrice } from '@/utils/price';

export default function ProductListItem({ item }: { item: ProductHit }) {
  const { colors, spacing, radii } = useTheme();
  return (
    <Pressable onPress={() => navToProduct(item.id)}>
      <View style={{ flexDirection: 'row', paddingVertical: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border }}>
        {item.image ? <Image source={{ uri: item.image }} style={{ width: 72, height: 72, borderRadius: radii.md, marginRight: spacing.md }} /> : null}
        <View style={{ flex: 1 }}>
          <Text weight="semiBold">{item.name}</Text>
          <Pressable onPress={() => item.vendor && navToVendor(item.vendor.id)}>
            {item.vendor ? <Text muted>{item.vendor.name}</Text> : null}
          </Pressable>
          <Text style={{ marginTop: 2 }}>{formatPrice(item.price, item.currency)}</Text>
          {!item.inStock ? <Text muted>Out of stock</Text> : null}
        </View>
      </View>
    </Pressable>
  );
}


