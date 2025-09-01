import type { Review } from '@/types/models/Review';
// If backend fields differ, map here. For now pass-through.
export function mapReview(api: Review): Review { return api; }
