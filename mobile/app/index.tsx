import React, { useEffect } from 'react';
import { router } from 'expo-router';
import { useAppSelector } from '@/store/hooks';
import { selectIsAuthenticated } from '@/features/auth/auth.selectors';
import Screen from '@/components/layout/Screen';
import Text from '@/components/ui/Text';
import { routes } from '@/constants/routes';

export default function Index() {
  const isAuthed = useAppSelector(selectIsAuthenticated);

  useEffect(() => {
    const to = isAuthed ? routes.Tabs.Home : routes.Auth.Login;
    router.replace(to);
  }, [isAuthed]);

  return (
    <Screen padded={false}>
      <Text>Loading…</Text>
    </Screen>
  );
}
