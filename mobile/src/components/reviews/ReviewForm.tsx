import React, { useState } from 'react';
import { View, TextInput } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import InteractiveStars from '@/components/ratings/InteractiveStars';
import Button from '@/components/ui/Button';
import Text from '@/components/ui/Text';
import { MIN_REVIEW_LEN, MAX_REVIEW_LEN } from '@/constants/review';

type Props = { onSubmit: (v: { rating: number; comment: string }) => Promise<void> | void; submitting?: boolean };

export default function ReviewForm({ onSubmit, submitting }: Props) {
  const { spacing, colors, radii } = useTheme();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const inputStyle = { borderWidth: 1, borderColor: colors.border, backgroundColor: colors.card, paddingHorizontal: spacing.md, paddingVertical: spacing.md, borderRadius: radii.md, color: colors.text, minHeight: 100, textAlignVertical: 'top' } as const;
  const canSubmit = rating >= 1 && comment.trim().length >= MIN_REVIEW_LEN;

  return (
    <View style={{ gap: spacing.md }}>
      <InteractiveStars value={rating} onChange={setRating} />
      <Text muted>Write a review ({MIN_REVIEW_LEN}-{MAX_REVIEW_LEN} chars)</Text>
      <TextInput
        placeholder="Your experience..."
        placeholderTextColor={colors.textMuted}
        value={comment}
        onChangeText={(t) => setComment(t.slice(0, MAX_REVIEW_LEN))}
        style={inputStyle}
        multiline
      />
      <Button title={submitting ? 'Submitting…' : 'Submit review'} onPress={() => onSubmit({ rating, comment: comment.trim() })} disabled={!canSubmit || submitting} />
    </View>
  );
}
