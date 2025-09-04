import { axiosInstance } from '@/api/axiosBase';
import { endpoints } from '@/api/endpoints';
import type { SearchRequest, SearchResult } from './search.types';

export async function apiSearchProducts(params: SearchRequest): Promise<SearchResult> {
  const res = await axiosInstance.get(endpoints.search.products, { params });
  return res.data;
}

export async function apiSuggest(q: string): Promise<{ data: string[] }> {
  const res = await axiosInstance.get(endpoints.search.suggest, { params: { q } });
  return res.data;
}

