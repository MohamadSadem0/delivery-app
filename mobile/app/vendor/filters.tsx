import React from 'react';
import Screen from '@/components/layout/Screen';
import Text from '@/components/ui/Text';
import Button from '@/components/ui/Button';
import { useAppDispatch } from '@/store/hooks';
import { resetVendorFilters } from '@/features/discovery/filterSlice';
import { router } from 'expo-router';

export default function VendorFiltersScreen() {
  const dispatch = useAppDispatch();
  return (
    <Screen>
      <Text style={{ fontSize: 22, marginBottom: 12 }} weight="semiBold">Vendor Filters</Text>
      <Text muted>Advanced filter UI can be added here (rating sliders, cities, etc.).</Text>
      <Button title="Reset filters" variant="outline" onPress={() => dispatch(resetVendorFilters())} />
      <Button title="Done" onPress={() => router.back()} />
    </Screen>
  );
}

