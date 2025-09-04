import axios from 'axios';
import { API_URL } from '@/config';
import { getToken } from '@/services/storage/secure';
import { DEFAULT_TIMEOUT_MS } from '@/constants/config';

export const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: DEFAULT_TIMEOUT_MS,
  headers: { 'Content-Type': 'application/json' },
});

axiosInstance.interceptors.request.use(async config => {
  try {
    const token = await getToken();
    if (token) {
      config.headers = config.headers ?? {};
      (config.headers as any).Authorization = `Bearer ${token}`;
    }
  } catch {}
  return config;
});

axiosInstance.interceptors.response.use(
  res => res,
  err => Promise.reject(err),
);

