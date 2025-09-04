export type ReviewTarget = { type: 'product'|'vendor'; id: number };

export type Review = {
  id: number;
  userId: number;
  target: ReviewTarget;
  rating: 1|2|3|4|5;
  title?: string | null;
  body?: string | null;
  images?: string[];
  createdAt: string;
  updatedAt: string;
  helpfulCount: number;
  isHelpful?: boolean;
  status: 'published' | 'pending' | 'rejected';
  orderId?: number | null; // optional linkage for verified purchases
};

export type ReviewSummary = {
  target: ReviewTarget;
  avg: number;
  count: number;
  distribution: { 1: number; 2: number; 3: number; 4: number; 5: number };
};

