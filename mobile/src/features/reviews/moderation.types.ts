export type ReviewFlag = {

  id: number;
  reviewId: number;
  reason: 'abuse'|'spam'|'offensive'|'other';
  note?: string | null;
  createdAt: string;
};

