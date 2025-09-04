import React from 'react';
import { View } from 'react-native';
import Text from '@/components/ui/Text';
import Button from '@/components/ui/Button';
import { useTheme } from '@/providers/ThemeProvider';
import type { Address } from '@/types/models/Address';

export default function AddressCard({ item: _item, address, onEdit, onDelete, onMakeDefault }: { item?: Address; address?: Address; onEdit?: () => void; onDelete?: () => void; onMakeDefault?: () => void }) {
  const { spacing, colors, radii } = useTheme();
  const item = (_item || address)!;
  return (
    <View style={{ backgroundColor: colors.card, borderRadius: radii.xl, padding: spacing.lg, marginBottom: spacing.md }}>
      <Text weight="semiBold">{item.label} {item.isDefault ? 'Â· Default' : ''}</Text>
      <Text muted>{item.line1}{item.line2 ? `, ${item.line2}` : ''}</Text>
      <Text muted>{item.area || ''}{item.city ? `, ${item.city}` : ''}{item.governorate ? `, ${item.governorate}` : ''}</Text>
      {item.phone ? <Text muted>Phone: {item.phone}</Text> : null}
      <View style={{ flexDirection: 'row', gap: spacing.sm, marginTop: spacing.sm }}>
        {onEdit ? <Button title="Edit" variant="outline" onPress={onEdit} /> : null}
        {onDelete ? <Button title="Delete" variant="outline" onPress={onDelete} /> : null}
        {!item.isDefault && onMakeDefault ? <Button title="Make default" onPress={onMakeDefault} /> : null}
      </View>
    </View>
  );
}


