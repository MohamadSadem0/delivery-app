import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchSearch, setPage, setQ, setSort, setFilters } from '@/features/search/searchSlice';
import { selectSearchQuery, selectSearchResults, selectSearchStatus } from '@/features/search/search.selectors';

export function useSearch() {
  const dispatch = useAppDispatch();
  const query = useAppSelector(selectSearchQuery);
  const results = useAppSelector(selectSearchResults);
  const status = useAppSelector(selectSearchStatus);

  useEffect(() => { if (query.q.trim().length) dispatch(fetchSearch() as any); }, [dispatch, query.q, query.page, query.sort, query.filters]);

  return {
    query, results, status,
    setPage: (p:number) => dispatch(setPage(p)),
    setQ: (q:string) => dispatch(setQ(q)),
    setSort: (s:any) => dispatch(setSort(s)),
    setFilters: (f:any) => dispatch(setFilters(f)),
  };
}
