import type { SearchQuery, SearchResponse } from '@/types/models/Search';

export type SearchRequest = Partial<SearchQuery> & { q: string };
export type SearchResult = SearchResponse;

