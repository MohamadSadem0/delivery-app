import React, { PropsWithChildren } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '@/store';
import { useThemeMode } from '@/providers/ThemeProvider';
import ThemeProvider from '@/providers/ThemeProvider';

/**
 * AppProviders
 * Global providers: Redux, Persist, Theme, SafeArea, Gestures, StatusBar.
 */
type Props = PropsWithChildren<{
  onReady?: () => void;
}>;

export default function AppProviders({ children, onReady }: Props) {
  const { barStyle, backgroundColor } = useThemeMode();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider onLayout={onReady}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <ThemeProvider>
              <StatusBar style={barStyle} backgroundColor={backgroundColor} />
              {children}
            </ThemeProvider>
          </PersistGate>
        </Provider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
