import { useEffect, useRef, useState } from 'react';

export function usePaginatedQuery<T>(
  fetchPage: (page: number) => Promise<{ data: T[]; total?: number }>,
  deps: any[] = []
) {
  const [items, setItems] = useState<T[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState<number | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const mounted = useRef(true);

  const load = async (next = 1) => {
    if (loading) return;
    setLoading(true);
    try {
      const res = await fetchPage(next);
      if (!mounted.current) return;
      setItems(prev => next === 1 ? res.data : [...prev, ...res.data]);
      setTotal(res.total);
      setPage(next);
    } finally {
      if (mounted.current) setLoading(false);
    }
  };

  useEffect(() => {
    mounted.current = true;
    load(1);
    return () => { mounted.current = false; };
  }, deps); // eslint-disable-line react-hooks/exhaustive-deps

  const canLoadMore = total === undefined ? true : items.length < total;

  return { items, page, total, loading, load, canLoadMore };
}


