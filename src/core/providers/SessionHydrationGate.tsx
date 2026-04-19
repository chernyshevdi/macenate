import { observer } from 'mobx-react-lite';
import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { useTheme } from '@/shared/theme/ThemeProvider';
import { useRootStore } from '@/stores/rootStore';

function SessionHydrationGateInner({ children }: { children: React.ReactNode }) {
  const store = useRootStore();
  const theme = useTheme();

  if (!store.session.isReady) {
    return (
      <View style={[styles.center, { backgroundColor: theme.color.bg }]}>
        <ActivityIndicator size="large" color={theme.color.accent} />
      </View>
    );
  }

  return <>{children}</>;
}

export const SessionHydrationGate = observer(SessionHydrationGateInner);

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
