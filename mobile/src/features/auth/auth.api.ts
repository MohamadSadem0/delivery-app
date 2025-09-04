import { httpPost, httpGet } from '@/api/client';  // Use new client API wrapper
import { endpoints } from '@/api/endpoints';  // Centralized endpoint constants
import type { Credentials, RegisterPayload, AuthUser, AuthTokens } from '@/features/auth/auth.types';  // Ensure types are correct

// Login User
export async function apiLogin(data: Credentials): Promise<{ user: AuthUser; tokens: AuthTokens }> {
  return httpPost(endpoints.auth.login, data);  // Use httpPost for a cleaner, reusable API call
}

// Register User
export async function apiRegister(data: RegisterPayload): Promise<{ user: AuthUser; tokens: AuthTokens }> {
  return httpPost(endpoints.auth.register, data);
}

// Get Authenticated User Details (Me)
export async function apiMe(): Promise<AuthUser> {
  return httpGet(endpoints.auth.me);
}

// Refresh Auth Tokens
export async function apiRefresh(): Promise<AuthTokens> {
  return httpPost(endpoints.auth.refresh);  // We continue using httpPost here, as refresh likely needs a body or is a simple POST
}

// Logout User
export async function apiLogout(): Promise<void> {
  return httpPost(endpoints.auth.logout);  // Calling logout through POST to invalidate session
}

