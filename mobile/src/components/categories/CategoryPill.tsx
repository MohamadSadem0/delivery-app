import React from 'react';
import { Pressable, View } from 'react-native';
import { Image } from 'expo-image';
import Text from '@/components/ui/Text';
import { useTheme } from '@/providers/ThemeProvider';
import type { Category } from '@/types/models/Category';
import { router } from 'expo-router';

export default function CategoryPill({ item }: { item: Category }) {
  const { colors, spacing, radii } = useTheme();
  return (
    <Pressable onPress={() => router.push(`/categories/${item.id}`)}>
      <View style={{ alignItems: 'center', width: 86 }}>
        <View style={{ backgroundColor: colors.surface, width: 64, height: 64, borderRadius: radii.full, alignItems: 'center', justifyContent: 'center' }}>
          <Image source={item.iconUrl ?? require('@/../assets/images/placeholder-icon.png')} style={{ width: 36, height: 36 }} />
        </View>
        <Text numberOfLines={1} style={{ marginTop: spacing.xs, textAlign: 'center' }}>{item.name}</Text>
      </View>
    </Pressable>
  );
}


