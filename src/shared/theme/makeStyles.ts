import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

import type { Theme } from './theme';
import { useTheme } from './ThemeProvider';

export function makeStyles<T extends StyleSheet.NamedStyles<T>>(
  factory: (theme: Theme) => T
): () => T {
  return function useStyles() {
    const theme = useTheme();
    return useMemo(() => StyleSheet.create(factory(theme)), [theme]);
  };
}
