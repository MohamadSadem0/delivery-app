import { axiosInstance } from '@/api/axiosBase';
import { endpoints } from '@/api/endpoints';
import type { Promotion } from '@/types/models/Promotion';

export async function apiListPromotions(): Promise<Promotion[]> {
  const res = await axiosInstance.get(endpoints.promos.list);
  return res.data;
}

export async function apiGetPromotion(id: number | string): Promise<Promotion> {
  const res = await axiosInstance.get(endpoints.promos.detail(id));
  return res.data;
}
