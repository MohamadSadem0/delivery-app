import { axiosInstance } from '@/api/axiosBase';
import { normalizeApiError, ApiError } from '@/api/error';

type HttpConfig = {
  headers?: Record<string, string>;
  params?: Record<string, any>;
};

export async function httpGet<T>(url: string, cfg: HttpConfig = {}): Promise<T> {
  try {
    const res = await axiosInstance.get<T>(url, cfg);
    return res.data as any;
  } catch (e) {
    throw normalizeApiError(e);
  }
}

export async function httpPost<T, B = any>(url: string, body?: B, cfg: HttpConfig = {}): Promise<T> {
  try {
    const res = await axiosInstance.post<T>(url, body ?? {}, cfg);
    return res.data as any;
  } catch (e) {
    throw normalizeApiError(e);
  }
}

export async function httpPatch<T, B = any>(url: string, body?: B, cfg: HttpConfig = {}): Promise<T> {
  try {
    const res = await axiosInstance.patch<T>(url, body ?? {}, cfg);
    return res.data as any;
  } catch (e) {
    throw normalizeApiError(e);
  }
}

export async function httpPut<T, B = any>(url: string, body?: B, cfg: HttpConfig = {}): Promise<T> {
  try {
    const res = await axiosInstance.put<T>(url, body ?? {}, cfg);
    return res.data as any;
  } catch (e) {
    throw normalizeApiError(e);
  }
}

export async function httpDelete<T>(url: string, cfg: HttpConfig = {}): Promise<T> {
  try {
    const res = await axiosInstance.delete<T>(url, cfg);
    return res.data as any;
  } catch (e) {
    throw normalizeApiError(e);
  }
}

