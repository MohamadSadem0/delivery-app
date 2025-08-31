import React from 'react';
import { Pressable, View } from 'react-native';
import { Image } from 'expo-image';
import Text from '@/components/ui/Text';
import { router } from 'expo-router';
import type { Promotion } from '@/types/models/Promotion';
import { useTheme } from '@/providers/ThemeProvider';

export default function PromoBanner({ item }: { item: Promotion }) {
  const { radii, spacing } = useTheme();
  return (
    <Pressable onPress={() => item.deepLink ? router.push(item.deepLink as any) : router.push(`/promos/${item.id}`)}>
      <View style={{ borderRadius: radii.lg, overflow: 'hidden', marginVertical: spacing.sm }}>
        <Image source={item.bannerUrl || require('@/../assets/images/placeholder-banner.png')} style={{ width: '100%', height: 140 }} />
        {item.title ? <View style={{ position: 'absolute', left: 12, bottom: 12 }}><Text weight="semiBold" style={{ fontSize: 18, color: '#fff' }}>{item.title}</Text></View> : null}
      </View>
    </Pressable>
  );
}
