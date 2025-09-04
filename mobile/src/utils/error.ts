import type { AxiosError } from 'axios';
import type { ApiError } from '@/api/types';

/**
 * Convert AxiosError into a compact ApiError we can safely show/log.
 */
export function toApiError(err: AxiosError): ApiError {
  const status = err.response?.status;
  const message =
    (err.response?.data as any)?.message ||
    err.message ||
    'Something went wrong. Please try again.';

  return {
    status,
    message,
    details: __DEV__ ? err.response?.data : undefined,
  };
}

