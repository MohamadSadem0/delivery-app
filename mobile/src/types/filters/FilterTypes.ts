export type SortOption =
  | 'relevance'
  | 'price_asc'
  | 'price_desc'
  | 'rating_desc'
  | 'name_asc'
  | 'name_desc'
  | 'distance_asc';

export type CatalogFilters = {
  q?: string;
  categoryId?: number | null;
  minPrice?: number | null;
  maxPrice?: number | null;
  minRating?: number | null;
  vendorId?: number | null;
  sort?: SortOption;
};

export type VendorFilters = {
  q?: string;
  city?: string | null;
  minRating?: number | null;
  sort?: Exclude<SortOption, 'price_asc' | 'price_desc'>;
  maxDistanceKm?: number | null;
  lat?: number | null;
  lng?: number | null;
};
