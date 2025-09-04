import { axiosInstance } from '@/api/axiosBase';
import { endpoints } from '@/api/endpoints';
import type { Promotion } from '@/types/models/Promotion';

export async function apiGetPromotion(id: number | string): Promise<Promotion> {
  const res = await axiosInstance.get(endpoints.promotions.detail(id));
  return res.data;
}

