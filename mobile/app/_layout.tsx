import React, { useCallback, useEffect } from 'react';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts, Inter_400Regular, Inter_600SemiBold } from '@expo-google-fonts/inter';
import { Tajawal_400Regular } from '@expo-google-fonts/tajawal';
import AppProviders from '@/providers/AppProviders';
import { configureNotifications } from '@/services/push/notifications.setup';
import { useNotificationsSubscription } from '@/hooks/useNotificationsSubscription';
// Keep the splash screen visible while we load resources
SplashScreen.preventAutoHideAsync().catch(() => {
  /* ignore if it's already hidden */
});

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Inter: require('../assets/fonts/Inter-Regular.ttf'),
    'Inter-SemiBold': Inter_600SemiBold,
    Tajawal: require('../assets/fonts/Tajawal-Regular.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync().catch(() => {});
    }
  }, [fontsLoaded]);

  const onLayoutRootView = useCallback(() => {
    // Additional ready checks can go here later (i18n, persisted store, etc.)
  }, []);

  if (!fontsLoaded) return null;

  return (
    <AppProviders onReady={onLayoutRootView}>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'fade',
        }}
      />
    </AppProviders>
  );
}


