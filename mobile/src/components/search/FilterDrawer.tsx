import React from 'react';
import { View, ScrollView, Switch } from 'react-native';
import Text from '@/components/ui/Text';
import FilterGroup from './FilterGroup';
import { useTheme } from '@/providers/ThemeProvider';
import Button from '@/components/ui/Button';

export default function FilterDrawer({ visible, onClose, onApply, children }: { visible: boolean; onClose: () => void; onApply: () => void; children: React.ReactNode; }) {
  const { colors, spacing } = useTheme();
  if (!visible) return null;
  return (
    <View style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: '80%', backgroundColor: colors.bg, shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 10, elevation: 8 }}>
      <View style={{ padding: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border }}>
        <Text weight="semiBold" style={{ fontSize: 18 }}>Filters</Text>
      </View>
      <ScrollView style={{ padding: spacing.md }}>
        {children}
      </ScrollView>
      <View style={{ flexDirection: 'row', gap: 8, padding: spacing.md, borderTopWidth: 1, borderTopColor: colors.border }}>
        <Button title="Close" variant="outline" onPress={onClose} />
        <Button title="Apply" onPress={onApply} />
      </View>
    </View>
  );
}
