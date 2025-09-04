import type { Review, ReviewSummary } from '@/types/models/Review';

export function mapReview(api: any): Review {
  return {
    id: api.id,
    userId: api.user_id ?? api.userId,
    target: api.product_id ? { type: 'product', id: api.product_id } : { type: 'vendor', id: api.vendor_id },
    rating: (api.rating ?? 0) as 1|2|3|4|5,
    title: api.title ?? null,
    body: api.body ?? null,
    images: api.images ?? [],
    createdAt: api.created_at ?? api.createdAt ?? new Date().toISOString(),
    updatedAt: api.updated_at ?? api.updatedAt ?? new Date().toISOString(),
    helpfulCount: api.helpful_count ?? api.helpfulCount ?? 0,
    isHelpful: api.is_helpful ?? api.isHelpful ?? false,
    status: api.status ?? 'published',
    orderId: api.order_id ?? api.orderId ?? null,
  };
}

export function mapSummary(api: any): ReviewSummary {
  return {
    target: api.product_id ? { type: 'product', id: api.product_id } : { type: 'vendor', id: api.vendor_id },
    avg: Number(api.avg ?? api.average ?? 0),
    count: Number(api.count ?? 0),
    distribution: {
      1: Number(api.d1 ?? api['1'] ?? 0),
      2: Number(api.d2 ?? api['2'] ?? 0),
      3: Number(api.d3 ?? api['3'] ?? 0),
      4: Number(api.d4 ?? api['4'] ?? 0),
      5: Number(api.d5 ?? api['5'] ?? 0),
    }
  };
}

