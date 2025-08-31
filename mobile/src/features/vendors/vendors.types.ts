export type VendorQuery = {
  page?: number;
  pageSize?: number;
  q?: string;
  city?: string;
  minRating?: number;
  sort?: 'rating_desc' | 'name_asc' | 'name_desc' | 'distance_asc';
  maxDistanceKm?: number;
  lat?: number;
  lng?: number;
};
