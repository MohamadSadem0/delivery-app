import React from 'react';
import { View, Pressable } from 'react-native';
import Text from '@/components/ui/Text';
import { useTheme } from '@/providers/ThemeProvider';
import type { CancelReason } from '@/types/models/OrderCancel';

export default function ReasonSelector({ reasons, selected, onChange }: { reasons: CancelReason[]; selected?: string; onChange: (code: string) => void }) {
  const { colors, spacing, radii } = useTheme();
  return (
    <View style={{ gap: spacing.sm }}>
      {reasons.map(r => (
        <Pressable key={r.code} onPress={() => onChange(r.code)} style={{ padding: spacing.md, borderRadius: radii.md, backgroundColor: selected === r.code ? colors.card : 'transparent', borderWidth: 1, borderColor: colors.border }}>
          <Text weight="semiBold">{r.label}</Text>
          {r.requiresNote ? <Text muted style={{ marginTop: 2 }}>Additional details required</Text> : null}
        </Pressable>
      ))}
    </View>
  );
}
