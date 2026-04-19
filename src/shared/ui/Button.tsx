import React from 'react';
import { Pressable, StyleSheet, Text, type PressableProps, type TextStyle, type ViewStyle } from 'react-native';

import { useTheme } from '@/shared/theme/ThemeProvider';

export function Button({
  title,
  onPress,
  style,
  textStyle,
  variant = 'primary',
  ...rest
}: PressableProps & {
  title: string;
  variant?: 'primary' | 'secondary';
  style?: ViewStyle;
  textStyle?: TextStyle;
}) {
  const theme = useTheme();
  const bg = variant === 'primary' ? theme.color.accent : theme.color.surface;
  const border = variant === 'secondary' ? theme.color.border : 'transparent';
  const color = variant === 'primary' ? '#FFFFFF' : theme.color.textPrimary;

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      style={({ pressed }) => [
        styles.base,
        { backgroundColor: bg, borderColor: border, opacity: pressed ? 0.85 : 1 },
        style,
      ]}
      {...rest}>
      <Text style={[theme.typography.buttonLabel, { color }, textStyle]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    height: 44,
    paddingHorizontal: 16,
    borderRadius: 999,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
});

