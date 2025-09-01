import React, { PropsWithChildren, useEffect } from 'react';
import { router } from 'expo-router';
import { useAppSelector } from '@/store/hooks';
import { selectIsAuthenticated } from '@/features/auth/auth.selectors';
import { routes } from '@/constants/routes';

/**
 * AuthGuard: wraps screens that require authentication.
 */
export function AuthGuard({ children }: PropsWithChildren) {
  const isAuthed = useAppSelector(selectIsAuthenticated);

  useEffect(() => {
    if (!isAuthed) {
      router.replace(routes.Auth.Login);
    }
  }, [isAuthed]);

  if (!isAuthed) return null;
  return <>{children}</>;
}
