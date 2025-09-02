import React, { useEffect, useState } from 'react';
import { View, TextInput, Pressable, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/providers/ThemeProvider';
import Text from '@/components/ui/Text';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setQ, suggest } from '@/features/search/searchSlice';
import { selectSuggestions } from '@/features/search/search.selectors';
import { useDebouncedValue } from '@/hooks/useDebouncedValue';

export default function SearchBar({ autoFocus }: { autoFocus?: boolean }) {
  const { colors, spacing, radii } = useTheme();
  const dispatch = useAppDispatch();
  const suggestions = useAppSelector(selectSuggestions);
  const [value, setValue] = useState('');
  const debounced = useDebouncedValue(value, 200);

  useEffect(() => {
    if (debounced.trim().length >= 2) dispatch(suggest(debounced) as any);
  }, [debounced, dispatch]);

  return (
    <View style={{ padding: spacing.md, backgroundColor: colors.bg }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: colors.card, borderRadius: radii.xl, paddingHorizontal: spacing.md }}>
        <Ionicons name="search" size={18} color={colors.textMuted} />
        <TextInput
          autoFocus={autoFocus}
          placeholder="Search products, vendors, categories…"
          placeholderTextColor={colors.textMuted}
          value={value}
          onChangeText={setValue}
          onSubmitEditing={() => dispatch(setQ(value))}
          style={{ flex: 1, color: colors.text, padding: spacing.md }}
          returnKeyType="search"
        />
        {value.length > 0 && (
          <Pressable onPress={() => setValue('')}>
            <Ionicons name="close-circle" size={18} color={colors.textMuted} />
          </Pressable>
        )}
      </View>

      {suggestions.length > 0 && (
        <FlatList
          data={suggestions}
          keyExtractor={(x, i) => `${x}-${i}`}
          renderItem={({ item }) => (
            <Pressable onPress={() => { setValue(item); dispatch(setQ(item)); }}>
              <View style={{ paddingVertical: 12 }}><Text>{item}</Text></View>
            </Pressable>
          )}
        />
      )}
    </View>
  );
}
