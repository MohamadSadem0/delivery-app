import React, { useMemo } from 'react';
import { View } from 'react-native';
import RatingBar from './RatingBar';
import type { ReviewSummary } from '@/types/models/Review';

export default function RatingDistribution({ summary }: { summary: ReviewSummary | null }) {
  const dist = summary?.distribution || { 1:0, 2:0, 3:0, 4:0, 5:0 };
  const total = Math.max(1, (summary?.count ?? 0));
  const p = useMemo(() => ({
    5: dist[5] * 100 / total, 4: dist[4] * 100 / total, 3: dist[3] * 100 / total, 2: dist[2] * 100 / total, 1: dist[1] * 100 / total,
  }), [summary]);
  return (
    <View>
      <RatingBar label="5â˜…" pct={p[5]} />
      <RatingBar label="4â˜…" pct={p[4]} />
      <RatingBar label="3â˜…" pct={p[3]} />
      <RatingBar label="2â˜…" pct={p[2]} />
      <RatingBar label="1â˜…" pct={p[1]} />
    </View>
  );
}


