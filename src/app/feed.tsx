import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import FeedList from '@/features/feed/ui/feedlist';
import { useTheme } from '@/shared/theme/ThemeProvider';

export default function FeedRoute() {
  const theme = useTheme();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.color.bg }} edges={['top']}>
      <FeedList />
    </SafeAreaView>
  );
}
