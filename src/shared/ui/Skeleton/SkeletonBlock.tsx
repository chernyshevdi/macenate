import React, { useState } from 'react';
import { StyleSheet, View, type DimensionValue, type ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Reanimated, { Extrapolation, interpolate, useAnimatedStyle } from 'react-native-reanimated';

import { useTheme } from '@/shared/theme/ThemeProvider';

import { useSkeletonProgress } from './SkeletonGroup';

export function SkeletonBlock({
  width,
  height,
  radius,
  style,
}: {
  width: DimensionValue;
  height: number;
  radius: number;
  style?: ViewStyle;
}) {
  const theme = useTheme();
  const progress = useSkeletonProgress();
  const [measuredWidth, setMeasuredWidth] = useState(0);

  const animatedStyle = useAnimatedStyle(() => {
    if (measuredWidth <= 0) return { transform: [{ translateX: 0 }] };

    const shimmerWidth = Math.max(40, measuredWidth * 0.65);
    const shimmerTranslateX = interpolate(
      progress.value,
      [0, 1],
      [-shimmerWidth, measuredWidth],
      Extrapolation.CLAMP
    );
    return { transform: [{ translateX: shimmerTranslateX }] };
  }, [measuredWidth]);

  return (
    <View
      onLayout={(layoutEvent) => setMeasuredWidth(layoutEvent.nativeEvent.layout.width)}
      style={[
        styles.base,
        {
          width,
          height,
          borderRadius: radius,
          backgroundColor: theme.color.skeletonBase,
        },
        style,
      ]}>
      <Reanimated.View style={[StyleSheet.absoluteFill, animatedStyle]}>
        <LinearGradient
          colors={['transparent', theme.color.skeletonHighlight, 'transparent']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{ width: Math.max(40, measuredWidth * 0.65), height: '100%' }}
        />
      </Reanimated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    overflow: 'hidden',
  },
});

