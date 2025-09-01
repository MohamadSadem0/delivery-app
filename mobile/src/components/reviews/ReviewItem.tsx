import React, { memo } from 'react';
import { View } from 'react-native';
import Text from '@/components/ui/Text';
import StarRating from '@/components/ratings/StarRating';
import { useTheme } from '@/providers/ThemeProvider';
import type { Review } from '@/types/models/Review';

function _ReviewItem({ item }: { item: Review }) {
  const { spacing, colors } = useTheme();
  return (
    <View style={{ paddingVertical: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border }}>
      <Text weight="semiBold">{item.userName || 'Anonymous'}</Text>
      <StarRating value={item.rating} />
      {item.comment ? <Text style={{ marginTop: spacing.xs }}>{item.comment}</Text> : null}
      <Text muted style={{ marginTop: spacing.xs }}>{new Date(item.createdAt).toLocaleDateString()}</Text>
    </View>
  );
}
export default memo(_ReviewItem);
