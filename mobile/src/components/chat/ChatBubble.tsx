import React from 'react';
import { View } from 'react-native';
import Text from '@/components/ui/Text';
import { useTheme } from '@/providers/ThemeProvider';

export default function ChatBubble({ body, mine }: { body: string; mine?: boolean }) {
  const { colors, spacing, radii } = useTheme();
  const bg = mine ? colors.primary : colors.card;
  const color = mine ? '#fff' : colors.text;
  const align = mine ? 'flex-end' : 'flex-start';
  return (
    <View style={{ flexDirection: 'row', justifyContent: align }}>
      <View style={{ backgroundColor: bg, paddingHorizontal: spacing.md, paddingVertical: spacing.sm, borderRadius: radii.lg, maxWidth: '80%', marginVertical: 4 }}>
        <Text style={{ color }}>{body}</Text>
      </View>
    </View>
  );
}


