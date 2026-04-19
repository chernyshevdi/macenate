import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { useTheme } from '@/shared/theme/ThemeProvider';

export type SegmentationTabValue = 'all' | 'free' | 'paid';

const TABS: { value: SegmentationTabValue; label: string }[] = [
  { value: 'all', label: 'Все' },
  { value: 'free', label: 'Бесплатные' },
  { value: 'paid', label: 'Платные' },
];

type Props = {
  value: SegmentationTabValue;
  onChange: (value: SegmentationTabValue) => void;
};

export function SegmentationTab({ value, onChange }: Props) {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.track,
        {
          backgroundColor: theme.color.surface,
          borderColor: theme.color.border,
          borderRadius: theme.radius[12],
          padding: theme.spacing[4],
        },
      ]}>
      <View style={styles.row}>
        {TABS.map((tab) => {
          const active = value === tab.value;
          return (
            <Pressable
              key={tab.value}
              accessibilityRole="tab"
              accessibilityState={{ selected: active }}
              onPress={() => onChange(tab.value)}
              style={({ pressed }) => [
                styles.segment,
                {
                  borderRadius: theme.radius[8],
                  backgroundColor: active ? theme.color.accent : 'transparent',
                  opacity: pressed ? 0.92 : 1,
                },
              ]}>
              <Text
                numberOfLines={1}
                style={[
                  active ? theme.typography.segmentTabActive : theme.typography.segmentTabInactive,
                  styles.label,
                  { color: active ? '#FFFFFF' : theme.color.textCounter },
                ]}>
                {tab.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    borderWidth: StyleSheet.hairlineWidth,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  segment: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    textAlign: 'center',
  },
});
