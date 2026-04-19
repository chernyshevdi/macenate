import {
  Manrope_500Medium,
  Manrope_600SemiBold,
  Manrope_700Bold,
  useFonts,
} from '@expo-google-fonts/manrope';
import { SplashScreen } from 'expo-router';
import React, { useEffect, useMemo } from 'react';

import { QueryClientProvider } from '@tanstack/react-query';

import { ThemeProvider } from '@/shared/theme/ThemeProvider';
import { RootStoreProvider, type RootStore } from '@/stores/rootStore';

import { SessionHydrationGate } from './SessionHydrationGate';
import { WebSocketBridge } from './WebSocketBridge';
import { createQueryClient } from './queryClient';

export function RootProviders({ children, store }: { children: React.ReactNode; store: RootStore }) {
  const queryClient = useMemo(() => createQueryClient(), []);
  const [fontsLoaded, fontError] = useFonts({
    Manrope_500Medium,
    Manrope_600SemiBold,
    Manrope_700Bold,
  });

  useEffect(() => {
    void store.session.hydrate();
  }, [store]);

  useEffect(() => {
    if (fontsLoaded || fontError) {
      void SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <RootStoreProvider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <SessionHydrationGate>
            <WebSocketBridge />
            {children}
          </SessionHydrationGate>
        </ThemeProvider>
      </QueryClientProvider>
    </RootStoreProvider>
  );
}
