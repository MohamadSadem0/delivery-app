import React, { useEffect } from 'react';
import { FlatList } from 'react-native';
import Screen from '@/components/layout/Screen';
import Text from '@/components/ui/Text';
import PromoBanner from '@/components/promos/PromoBanner';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchPromos } from '@/features/promos/promosSlice';
import { selectPromos } from '@/features/promos/promos.selectors';

export default function PromoListScreen() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectPromos);

  useEffect(() => { dispatch(fetchPromos()); }, [dispatch]);

  return (
    <Screen>
      <Text style={{ fontSize: 22, marginBottom: 12 }} weight="semiBold">Promotions</Text>
      <FlatList
        data={items}
        keyExtractor={p => String(p.id)}
        renderItem={({ item }) => <PromoBanner item={item} />}
      />
    </Screen>
  );
}
