import type { RootState } from '@/store';
export const selectSearchQuery = (s: RootState) => s.search.query;
export const selectSearchResults = (s: RootState) => s.search.results;
export const selectSearchStatus = (s: RootState) => s.search.status;
export const selectSuggestions = (s: RootState) => s.search.suggestions;
