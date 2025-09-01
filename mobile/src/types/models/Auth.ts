import type { AuthUser } from '@/features/auth/auth.types';

export type LoginResponse = {
  user: AuthUser;
  tokens: {
    accessToken: string;
    refreshToken?: string | null;
  };
};
