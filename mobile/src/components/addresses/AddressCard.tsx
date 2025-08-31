import React from 'react';
import { View, Pressable } from 'react-native';
import Card from '@/components/ui/Card';
import Text from '@/components/ui/Text';
import { useTheme } from '@/providers/ThemeProvider';

type Props = {
  address: any;
  onEdit?: () => void;
  onDelete?: () => void;
};

export default function AddressCard({ address, onEdit, onDelete }: Props) {
  const { spacing, colors } = useTheme();
  return (
    <Card>
      <Text weight="semiBold">{address.fullName}</Text>
      <Text muted>{address.phone}</Text>
      <View style={{ height: spacing.xs }} />
      <Text>{address.city}, {address.street}{address.building ? `, ${address.building}` : ''}</Text>
      {address.notes ? <Text muted>{address.notes}</Text> : null}
      <View style={{ flexDirection: 'row', gap: spacing.md, marginTop: spacing.sm }}>
        {onEdit ? <Pressable onPress={onEdit}><Text style={{ color: colors.primary }}>Edit</Text></Pressable> : null}
        {onDelete ? <Pressable onPress={onDelete}><Text style={{ color: colors.danger }}>Delete</Text></Pressable> : null}
      </View>
    </Card>
  );
}
