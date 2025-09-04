import React from 'react';
import { View, Pressable } from 'react-native';
import Text from '@/components/ui/Text';
import { useTheme } from '@/providers/ThemeProvider';
import type { SavedCard } from '@/types/models/Card';
import { brandToEmoji } from '@/services/payments/stripe.utils';

type Props = {
  card: SavedCard;
  onDelete?: () => void;
  onMakeDefault?: () => void;
};

export default function CardListItem({ card, onDelete, onMakeDefault }: Props) {
  const { spacing, colors } = useTheme();
  return (
    <View style={{ paddingVertical: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border }}>
      <Text>{brandToEmoji(card.brand)} â€¢â€¢â€¢â€¢ {card.last4}  ({String(card.expMonth).padStart(2,'0')}/{String(card.expYear).slice(-2)}) {card.isDefault ? 'Â· Default' : ''}</Text>
      <View style={{ flexDirection: 'row', gap: spacing.md, marginTop: spacing.xs }}>
        {onMakeDefault ? <Pressable onPress={onMakeDefault}><Text style={{ color: colors.primary }}>Make default</Text></Pressable> : null}
        {onDelete ? <Pressable onPress={onDelete}><Text style={{ color: colors.danger }}>Remove</Text></Pressable> : null}
      </View>
    </View>
  );
}


