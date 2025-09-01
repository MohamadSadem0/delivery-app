import React, { useState } from 'react';
import { View } from 'react-native';
import FilterChip from '@/components/ui/FilterChip';
import ModalSheet from '@/components/ui/ModalSheet';
import Text from '@/components/ui/Text';
import Button from '@/components/ui/Button';
import { useTheme } from '@/providers/ThemeProvider';
import { useAppDispatch } from '@/store/hooks';
import { setCatalogFilters } from '@/features/discovery/filterSlice';

export default function CatalogFilterBar() {
  const { spacing } = useTheme();
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();

  return (
    <>
      <View style={{ flexDirection: 'row', gap: spacing.sm }}>
        <FilterChip label="Filters" onPress={() => setOpen(true)} />
      </View>

      <ModalSheet visible={open} onClose={() => setOpen(false)}>
        <Text weight="semiBold" style={{ fontSize: 18 }}>Product filters</Text>
        <View style={{ height: spacing.md }} />
        <Button title="Sort by price ↑" variant="outline" onPress={() => dispatch(setCatalogFilters({ sort: 'price_asc' }))} />
        <Button title="Sort by price ↓" variant="outline" onPress={() => dispatch(setCatalogFilters({ sort: 'price_desc' }))} />
        <Button title="Sort by rating" variant="outline" onPress={() => dispatch(setCatalogFilters({ sort: 'rating_desc' }))} />
        <View style={{ height: spacing.sm }} />
        <Button title="Close" onPress={() => setOpen(false)} />
      </ModalSheet>
    </>
  );
}
