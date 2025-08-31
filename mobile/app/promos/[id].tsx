import React, { useEffect } from 'react';
import Screen from '@/components/layout/Screen';
import Text from '@/components/ui/Text';
import { useLocalSearchParams, router } from 'expo-router';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchPromoById } from '@/features/promos/promosSlice';
import { selectPromoById } from '@/features/promos/promos.selectors';
import Button from '@/components/ui/Button';

export default function PromoDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const pid = Number(id);
  const dispatch = useAppDispatch();
  const item = useAppSelector(selectPromoById(pid));

  useEffect(() => { if (!item && !Number.isNaN(pid)) dispatch(fetchPromoById(pid)); }, [pid, item, dispatch]);

  if (!pid) return <Screen><Text>Invalid promotion.</Text></Screen>;
  if (!item) return <Screen><Text>Loading…</Text></Screen>;

  return (
    <Screen>
      <Text style={{ fontSize: 22 }} weight="semiBold">{item.title}</Text>
      {item.subtitle ? <Text muted>{item.subtitle}</Text> : null}
      {item.description ? <Text style={{ marginTop: 12 }}>{item.description}</Text> : null}
      <Button title="Shop" onPress={() => router.push('/(tabs)/home')} />
    </Screen>
  );
}
