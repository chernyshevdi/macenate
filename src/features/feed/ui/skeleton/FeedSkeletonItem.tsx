import React from 'react';
import { StyleSheet, View } from 'react-native';

import { useTheme } from '@/shared/theme/ThemeProvider';
import { SkeletonBlock } from '@/shared/ui/Skeleton/SkeletonBlock';

export function FeedSkeletonItem() {
  const theme = useTheme();

  return (
    <View style={[styles.card, { borderRadius: theme.radius[16] }]}>
      <View style={styles.header}>
        <SkeletonBlock width={32} height={32} radius={theme.radius.pill} />
        <SkeletonBlock width={120} height={12} radius={theme.radius.pill} />
      </View>

      <View style={{ height: theme.spacing[10] }} />

      <SkeletonBlock width="100%" height={180} radius={theme.radius[16]} />

      <View style={{ height: theme.spacing[12] }} />

      <SkeletonBlock width={180} height={14} radius={theme.radius.pill} />
      <View style={{ height: theme.spacing[8] }} />
      <SkeletonBlock width="100%" height={12} radius={theme.radius.pill} />
      <View style={{ height: theme.spacing[6] }} />
      <SkeletonBlock width="80%" height={12} radius={theme.radius.pill} />

      <View style={{ height: theme.spacing[14] }} />

      <View style={styles.footer}>
        <SkeletonBlock width={56} height={22} radius={theme.radius.pill} />
        <View style={{ width: theme.spacing[12] }} />
        <SkeletonBlock width={56} height={22} radius={theme.radius.pill} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
