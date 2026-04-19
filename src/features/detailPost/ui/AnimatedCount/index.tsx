import React, { useEffect } from 'react';
import { Text } from 'react-native';
import Reanimated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

import { useTheme } from '@/shared/theme/ThemeProvider';

import { useAnimatedCountStyles } from './styles';

type Props = {
  value: number;
  active?: boolean;
};

export function AnimatedCount({ value, active = false }: Props) {
  const styles = useAnimatedCountStyles();
  const theme = useTheme();
  const scale = useSharedValue(1);

  useEffect(() => {
    scale.value = withSequence(
      withTiming(1.06, { duration: 90, easing: Easing.out(Easing.cubic) }),
      withTiming(1, { duration: 100, easing: Easing.in(Easing.cubic) })
    );
  }, [scale, value]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Reanimated.View style={animatedStyle}>
      <Text
        style={[
          styles.countText,
          active ? { color: theme.color.feedLikeActiveContrast } : undefined,
        ]}>
        {value}
      </Text>
    </Reanimated.View>
  );
}
