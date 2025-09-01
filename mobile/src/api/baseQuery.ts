import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import type { AxiosRequestConfig, AxiosError } from 'axios';
import { axiosInstance } from './axiosBase';
import type { ApiError } from './types';
import { toApiError } from '@/utils/error';

/**
 * axios-based baseQuery for RTK Query
 */
export const axiosBaseQuery =
  (): BaseQueryFn<
    { url: string; method?: AxiosRequestConfig['method']; data?: unknown; params?: unknown; headers?: Record<string, string> },
    unknown,
    ApiError
  > =>
  async ({ url, method = 'GET', data, params, headers }) => {
    try {
      const result = await axiosInstance.request({ url, method, data, params, headers });
      return { data: result.data };
    } catch (e) {
      const err = e as AxiosError;
      return { error: toApiError(err) };
    }
  };
