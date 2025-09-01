export type Credentials = {
  email: string;
  password: string;
};

export type RegisterPayload = {
  name: string;
  email: string;
  phone?: string;
  password: string;
  password_confirmation: string;
};

export type AuthTokens = {
  accessToken: string;
  refreshToken?: string | null;
};

export type AuthUser = {
  id: number;
  name: string;
  email: string;
  phone?: string;
  avatarUrl?: string;
  isVendor?: boolean;
};

export type AuthState = {
  status: 'idle' | 'loading' | 'authenticated' | 'error';
  user: AuthUser | null;
  error?: string;
};
