export type RatingSummary = {
  avg: number; // 0..5
  total: number;
  counts: Record<1 | 2 | 3 | 4 | 5, number>;
};
