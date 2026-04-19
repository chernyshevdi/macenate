import React from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';

import { useTheme } from '@/shared/theme/ThemeProvider';
import type { Theme } from '@/shared/theme/theme';

export type SpacingSize = keyof Theme['spacing'];

type SpacerProps = {
  size: SpacingSize;
  orientation?: 'vertical' | 'horizontal';
  style?: StyleProp<ViewStyle>;
};

export function Spacer({ size, orientation = 'vertical', style }: SpacerProps) {
  const theme = useTheme();
  const value = theme.spacing[size];

  const axisStyle: ViewStyle =
    orientation === 'vertical' ? { height: value } : { width: value };

  return <View style={[axisStyle, style]} />;
}
