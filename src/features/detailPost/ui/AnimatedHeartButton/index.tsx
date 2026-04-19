import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, View } from 'react-native';
import Reanimated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { useTheme } from '@/shared/theme/ThemeProvider';

import { useAnimatedHeartButtonStyles } from './styles';

type Props = {
  active: boolean;
  /** Parent supplies Pressable + scale (e.g. whole like pill) */
  embedded?: boolean;
  disabled?: boolean;
  onPress?: () => void;
};

export function AnimatedHeartButton({ active, embedded = false, disabled, onPress }: Props) {
  const styles = useAnimatedHeartButtonStyles();
  const theme = useTheme();
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const iconColor = active ? theme.color.feedLikeActiveContrast : theme.color.textCounter;

  if (embedded) {
    return (
      <View style={styles.likePill}>
        <Ionicons name={active ? 'heart' : 'heart-outline'} size={18} color={iconColor} />
      </View>
    );
  }

  return (
    <Pressable
      disabled={disabled}
      onPressIn={() => {
        if (disabled) return;
        scale.value = withTiming(0.94, {
          duration: 90,
          easing: Easing.out(Easing.cubic),
        });
      }}
      onPressOut={() => {
        scale.value = withTiming(1, {
          duration: 110,
          easing: Easing.out(Easing.cubic),
        });
      }}
      onPress={onPress}
      style={styles.likePill}>
      <Reanimated.View style={[styles.likeInner, animatedStyle]}>
        <Ionicons name={active ? 'heart' : 'heart-outline'} size={18} color={iconColor} />
      </Reanimated.View>
    </Pressable>
  );
}
