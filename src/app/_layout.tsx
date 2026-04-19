import 'react-native-reanimated';

import { DefaultTheme, ThemeProvider as NavigationThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { RootProviders } from '@/core/providers/RootProviders';
import { useCreateRootStore } from '@/stores/rootStore';

export default function RootLayout() {
  const store = useCreateRootStore();

  return (
    <RootProviders store={store}>
      <NavigationThemeProvider value={DefaultTheme}>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="feed" options={{ headerShown: false, title: 'Лента' }} />
          <Stack.Screen name="posts/[id]" options={{ title: 'Публикация' }} />
        </Stack>
        <StatusBar style="dark" />
      </NavigationThemeProvider>
    </RootProviders>
  );
}
