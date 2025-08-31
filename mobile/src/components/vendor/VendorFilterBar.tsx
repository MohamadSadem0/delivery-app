import React, { useState } from 'react';
import { View } from 'react-native';
import FilterChip from '@/components/ui/FilterChip';
import ModalSheet from '@/components/ui/ModalSheet';
import Text from '@/components/ui/Text';
import Button from '@/components/ui/Button';
import { useTheme } from '@/providers/ThemeProvider';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setVendorFilters } from '@/features/discovery/filterSlice';
import { selectPrefs } from '@/features/preferences/preferences.selectors';

export default function VendorFilterBar() {
  const { spacing } = useTheme();
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const prefs = useAppSelector(selectPrefs);

  return (
    <>
      <View style={{ flexDirection: 'row', gap: spacing.sm }}>
        <FilterChip label="Filters" onPress={() => setOpen(true)} />
        <FilterChip label={`Currency: ${prefs.currency}`} onPress={() => {}} />
      </View>

      <ModalSheet visible={open} onClose={() => setOpen(false)}>
        <Text weight="semiBold" style={{ fontSize: 18 }}>Vendor filters</Text>
        <View style={{ height: spacing.md }} />
        <Button title="Sort by rating" variant="outline" onPress={() => dispatch(setVendorFilters({ sort: 'rating_desc' }))} />
        <Button title="Sort by name" variant="outline" onPress={() => dispatch(setVendorFilters({ sort: 'name_asc' }))} />
        <Button title="Sort by distance" variant="outline" onPress={() => dispatch(setVendorFilters({ sort: 'distance_asc' }))} />
        <View style={{ height: spacing.sm }} />
        <Button title="Close" onPress={() => setOpen(false)} />
      </ModalSheet>
    </>
  );
}
