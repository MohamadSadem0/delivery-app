import React from 'react';
import { View, Image, Pressable } from 'react-native';
import Text from '@/components/ui/Text';
import RatingStars from './RatingStars';
import { useTheme } from '@/providers/ThemeProvider';
import type { Review } from '@/types/models/Review';
import { useAppDispatch } from '@/store/hooks';
import { markHelpful } from '@/features/reviews/reviewHelpfulSlice';

export default function ReviewCard({ item, onEdit, onDelete }: { item: Review; onEdit?: () => void; onDelete?: () => void }) {
  const { spacing, colors, radii } = useTheme();
  return (
    <View style={{ paddingVertical: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
        <RatingStars value={item.rating} />
        <Text muted style={{ marginLeft: spacing.sm }}>{new Date(item.createdAt).toLocaleDateString()}</Text>
        {item.status !== 'published' ? <Text muted style={{ marginLeft: spacing.sm }}>· {item.status}</Text> : null}
      </View>
      {item.title ? <Text weight="semiBold">{item.title}</Text> : null}
      {item.body ? <Text muted style={{ marginTop: 2 }}>{item.body}</Text> : null}
      {item.images?.length ? (
        <View style={{ flexDirection: 'row', gap: spacing.sm, marginTop: spacing.sm }}>
          {item.images.slice(0, 3).map((uri, idx) => <Image key={idx} source={{ uri }} style={{ width: 72, height: 72, borderRadius: radii.md }} />)}
        </View>
      ) : null}
      <View style={{ flexDirection: 'row', gap: spacing.sm, marginTop: spacing.sm }}>
        <Pressable onPress={() => {}}>
          <Text muted>{item.helpfulCount} helpful</Text>
        </Pressable>
      </View>
    </View>
  );
}
