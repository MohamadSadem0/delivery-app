import React from 'react';
import { View, Pressable } from 'react-native';
import Text from '@/components/ui/Text';
import { useTheme } from '@/providers/ThemeProvider';

export default function FilterGroup({ title, children, onClear }: { title: string; children: React.ReactNode; onClear?: () => void }) {
  const { colors, spacing } = useTheme();
  return (
    <View style={{ paddingVertical: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.sm }}>
        <Text weight="semiBold">{title}</Text>
        {onClear ? <Pressable onPress={onClear}><Text muted>Clear</Text></Pressable> : null}
      </View>
      {children}
    </View>
  );
}


