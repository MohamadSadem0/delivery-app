export const SEARCH_PAGE_SIZE = 20;
export const SEARCH_SORTS = [
  { key: 'relevance', label: 'Relevance' },
  { key: 'price_asc', label: 'Price: Low to High' },
  { key: 'price_desc', label: 'Price: High to Low' },
  { key: 'rating_desc', label: 'Top Rated' },
  { key: 'newest', label: 'Newest' },
] as const;

