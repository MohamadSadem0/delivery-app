export type SortKey = 'relevance' | 'price_asc' | 'price_desc' | 'rating_desc' | 'newest';

export type PriceRange = { min?: number; max?: number; currency?: 'LBP'|'USD' };
export type StockFilter = 'in_stock' | 'all';
export type DeliveryFilter = 'any' | 'instant' | 'same_day' | 'scheduled';

export type FacetValue = { key: string; label: string; count: number; selected?: boolean };
export type Facet = { name: string; code: string; values: FacetValue[] };

export type SearchFilters = {
  categoryIds?: number[];
  vendorIds?: number[];
  price?: PriceRange;
  stock?: StockFilter;
  delivery?: DeliveryFilter;
  attrs?: Record<string, string[]>; // attribute code -> selected values
  near?: { lat: number; lng: number; radiusKm: number } | null;
};

export type SearchQuery = {
  q: string;
  page: number;
  sort: SortKey;
  filters: SearchFilters;
};

export type ProductHit = {
  id: number;
  sku?: string;
  name: string;
  price: number;
  currency: 'LBP'|'USD';
  image?: string|null;
  rating?: number;
  vendor?: { id: number; name: string };
  badge?: 'new'|'promo'|'bestseller'|null;
  inStock?: boolean;
};

export type SearchResponse = {
  data: ProductHit[];
  total: number;
  facets: Facet[];
  page: number;
  pageSize: number;
  tookMs?: number;
};

