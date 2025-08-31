import { axiosInstance } from '@/api/axiosBase';
import { endpoints } from '@/api/endpoints';
import type { Category } from '@/types/models/Category';

export async function apiListCategories(): Promise<Category[]> {
  const res = await axiosInstance.get(endpoints.categories.list);
  return res.data;
}

export async function apiGetCategory(id: number | string): Promise<Category> {
  const res = await axiosInstance.get(endpoints.categories.detail(id));
  return res.data;
}
