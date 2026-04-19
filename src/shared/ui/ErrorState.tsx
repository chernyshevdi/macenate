import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useTheme } from '@/shared/theme/ThemeProvider';

import { Button } from './Button';

export function ErrorState({
  message = 'Не удалось загрузить публикации',
  onRetry,
}: {
  message?: string;
  onRetry: () => void;
}) {
  const theme = useTheme();
  return (
    <View style={styles.container}>
      <Text style={[theme.typography.errorTitle, { color: theme.color.textPrimary }]}>{message}</Text>
      <View style={{ height: theme.spacing[12] }} />
      <Button title="Повторить" onPress={onRetry} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

