export type Page<T> = {
  data: T[];
  meta: { page: number; pageSize: number; total: number };
};

export type ApiResponse<T> = {
  success: boolean;
  message?: string;
  data: T;
};

export type ApiError = {
  status?: number;
  message: string;
  details?: unknown;
};

