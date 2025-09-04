import React from 'react';
import Screen from '@/components/layout/Screen';
import Text from '@/components/ui/Text';
import Button from '@/components/ui/Button';
import { buildLink } from '@/utils/deepLinking';
import * as Linking from 'expo-linking';

export default function DeepLinkDebug() {
  return (
    <Screen>
      <Text weight="semiBold" style={{ fontSize: 22, marginBottom: 8 }}>Deep links</Text>
      <Button title="Open /product/1" onPress={() => Linking.openURL(buildLink('/product/1'))} />
      <Button title="Open /product/1/reviews" onPress={() => Linking.openURL(buildLink('/product/1/reviews'))} />
      <Button title="Open /vendor/2" onPress={() => Linking.openURL(buildLink('/vendor/2'))} />
      <Button title="Open /order/3" onPress={() => Linking.openURL(buildLink('/order/3'))} />
    </Screen>
  );
}

