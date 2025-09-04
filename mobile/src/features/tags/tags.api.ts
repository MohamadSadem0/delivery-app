import { axiosInstance } from '@/api/axiosBase';
import { endpoints } from '@/api/endpoints';
import type { Tag } from '@/types/models/Tag';

export async function apiListTags(): Promise<Tag[]> {
  const res = await axiosInstance.get(endpoints.tags.list);
  return res.data;
}

