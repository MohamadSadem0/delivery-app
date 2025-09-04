import { axiosInstance } from '@/api/axiosBase';
import { endpoints } from '@/api/endpoints';
import type { User } from '@/types/models/User';

export async function apiGetProfile(): Promise<User> {
  const res = await axiosInstance.get(endpoints.profile.me);
  return res.data;
}

export async function apiUpdateProfile(patch: Partial<User>): Promise<User> {
  const res = await axiosInstance.patch(endpoints.profile.me, patch);
  return res.data;
}

