import type { RootState } from '@/store';
export const selectSearchQuery = (s: RootState) => (s as any).search.query;
export const selectSearchResults = (s: RootState) => (s as any).search.results;
export const selectSearchStatus = (s: RootState) => (s as any).search.status;
export const selectSuggestions = (s: RootState) => (s as any).search.suggestions;

