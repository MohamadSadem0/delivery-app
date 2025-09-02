import React, { useState } from 'react';
import { View, TextInput } from 'react-native';
import Text from '@/components/ui/Text';
import Button from '@/components/ui/Button';
import { useTheme } from '@/providers/ThemeProvider';

export default function ReviewForm({ onSubmit, initial }: { onSubmit: (v: { rating: 1|2|3|4|5; title?: string; body?: string }) => void; initial?: Partial<{ rating: 1|2|3|4|5; title: string; body: string; }> }) {
  const { colors, spacing, radii } = useTheme();
  const [rating, setRating] = useState<1|2|3|4|5>((initial?.rating as any) || 5);
  const [title, setTitle] = useState(initial?.title || '');
  const [body, setBody] = useState(initial?.body || '');

  const input = { borderWidth: 1, borderColor: colors.border, backgroundColor: colors.card, borderRadius: radii.md, padding: spacing.md, color: colors.text } as const;

  return (
    <View style={{ gap: spacing.sm }}>
      <Text muted>Rating</Text>
      <View style={{ flexDirection: 'row', gap: 6 }}>
        {[1,2,3,4,5].map(n => (
          <Button key={n} title={`${n}`} variant={rating === n ? 'solid' : 'outline'} onPress={() => setRating(n as any)} />
        ))}
      </View>
      <Text muted>Title (optional)</Text>
      <TextInput value={title} onChangeText={setTitle} placeholder="Short summary" placeholderTextColor={colors.textMuted} style={input} />
      <Text muted>Review</Text>
      <TextInput value={body} onChangeText={setBody} placeholder="Share details..." placeholderTextColor={colors.textMuted} style={[input, { minHeight: 96 }]} multiline />
      <Button title="Submit" onPress={() => onSubmit({ rating, title: title.trim() || undefined, body: body.trim() || undefined })} disabled={rating < 1} />
    </View>
  );
}
