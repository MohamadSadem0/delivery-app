import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { SearchQuery, SearchResponse, SortKey, SearchFilters } from '@/types/models/Search';
import { apiSearchProducts, apiSuggest } from './search.api';
import { mapSearchResponse } from './search.mappers';

type State = {
  query: SearchQuery;
  results: SearchResponse | null;
  status: 'idle'|'loading'|'error';
  error?: string | null;
  suggestions: string[];
};

const initial: State = {
  query: { q: '', page: 1, sort: 'relevance', filters: { price: {}, stock: 'all', delivery: 'any', attrs: {}, near: null } },
  results: null,
  status: 'idle',
  suggestions: []
};

export const fetchSearch = createAsyncThunk('search/fetch', async (_: void, { getState, rejectWithValue }) => {
  const s = getState() as any;
  try { const res = await apiSearchProducts(s.search.query); return mapSearchResponse(res); }
  catch (e: any) { return rejectWithValue(e?.response?.data?.message || e.message); }
});

export const suggest = createAsyncThunk('search/suggest', async (q: string, { rejectWithValue }) => {
  try { const res = await apiSuggest(q); return res.data as string[]; }
  catch (e: any) { return rejectWithValue(e?.response?.data?.message || e.message); }
});

const slice = createSlice({
  name: 'search',
  initialState: initial,
  reducers: {
    setQuery(s, a) { s.query = { ...s.query, ...(a.payload as Partial<SearchQuery>) }; },
    setQ(s, a) { s.query.q = String(a.payload || ''); },
    setPage(s, a) { s.query.page = Number(a.payload || 1); },
    setSort(s, a) { s.query.sort = a.payload as SortKey; s.query.page = 1; },
    setFilters(s, a) { s.query.filters = { ...s.query.filters, ...(a.payload as Partial<SearchFilters>) }; s.query.page = 1; },
    clearFilters(s) { s.query.filters = initial.query.filters; s.query.page = 1; },
    resetSearchState() { return initial; }
  },
  extraReducers: (b) => {
    b.addCase(fetchSearch.pending, (s) => { s.status = 'loading'; s.error = null; });
    b.addCase(fetchSearch.fulfilled, (s, a) => { s.status = 'idle'; s.results = a.payload as SearchResponse; });
    b.addCase(fetchSearch.rejected, (s, a) => { s.status = 'error'; s.error = String(a.payload || 'Failed'); });

    b.addCase(suggest.fulfilled, (s, a) => { s.suggestions = a.payload as string[]; });
  }
});

export const { setQuery, setQ, setPage, setSort, setFilters, clearFilters, resetSearchState } = slice.actions;
export default slice.reducer;
