import React, { useState } from 'react';
import { View, TextInput } from 'react-native';
import Button from '@/components/ui/Button';
import { useTheme } from '@/providers/ThemeProvider';

export default function ChatInput({ onSend, disabled }: { onSend: (text: string) => void; disabled?: boolean }) {
  const { colors, spacing, radii } = useTheme();
  const [text, setText] = useState('');
  const inputStyle = { borderWidth: 1, borderColor: colors.border, backgroundColor: colors.card, paddingHorizontal: spacing.md, paddingVertical: spacing.sm, borderRadius: radii.md, color: colors.text, flex: 1 } as const;

  return (
    <View style={{ flexDirection: 'row', gap: spacing.sm, padding: spacing.sm }}>
      <TextInput
        value={text}
        onChangeText={setText}
        placeholder="Messageâ€¦"
        placeholderTextColor={colors.textMuted}
        style={inputStyle}
        multiline
      />
      <Button title="Send" onPress={() => { const v = text.trim(); if (v) { onSend(v); setText(''); } }} disabled={disabled} />
    </View>
  );
}


