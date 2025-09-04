import type { AxiosError } from 'axios';

export type ApiError = {
  message: string;
  status?: number;
  code?: string;
  details?: unknown;
};

export function normalizeApiError(e: unknown): ApiError {
  const ax = e as AxiosError<any>;
  const message =
    (ax?.response?.data && ((ax.response.data as any).message || (ax.response.data as any).error)) ||
    (ax?.message as string) ||
    'Unknown error';
  const status = ax?.response?.status as number | undefined;
  const code = (ax?.code as string | undefined) || undefined;
  const details = ax?.response?.data ?? undefined;
  return { message, status, code, details };
}

