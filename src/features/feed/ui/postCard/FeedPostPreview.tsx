import React, { useCallback, useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import type { LayoutChangeEvent, NativeSyntheticEvent, TextLayoutEventData, TextStyle, ViewStyle } from 'react-native';

const PREVIEW_LINES = 2;
const SHOW_MORE = 'Показать еще';

export type FeedPostPreviewStyles = {
  readMoreHost: ViewStyle;
  measureSlot: ViewStyle;
  measureText: TextStyle;
  previewText: TextStyle;
  showMorePressable: ViewStyle;
  showMoreLabel: TextStyle;
};

type Props = {
  /** Усечённый текст в ленте; по нему считаем, нужна ли кнопка */
  preview: string;
  /** Полный текст после «Показать еще» */
  body: string;
  styles: FeedPostPreviewStyles;
};

export function FeedPostPreview({ preview, body, styles }: Props) {
  const [expanded, setExpanded] = useState(false);
  const [hostWidth, setHostWidth] = useState(0);
  const [isTruncatable, setIsTruncatable] = useState<boolean | null>(null);

  const expandedText = body.trim().length > 0 ? body : preview;

  useEffect(() => {
    setExpanded(false);
    setIsTruncatable(null);
  }, [preview, body]);

  useEffect(() => {
    setIsTruncatable(null);
  }, [hostWidth]);

  const onHostLayout = useCallback((e: LayoutChangeEvent) => {
    const w = e.nativeEvent.layout.width;
    setHostWidth((prev) => (prev === w ? prev : w));
  }, []);

  const onMeasureTextLayout = useCallback((e: NativeSyntheticEvent<TextLayoutEventData>) => {
    if (!preview.trim()) {
      setIsTruncatable(false);
      return;
    }
    const lineCount = e.nativeEvent.lines.length;
    setIsTruncatable(lineCount > PREVIEW_LINES);
  }, [preview]);

  const showToggle = isTruncatable === true;

  return (
    <View style={styles.readMoreHost} collapsable={false} onLayout={onHostLayout}>
      {hostWidth > 0 && !!preview.trim() ? (
        <View pointerEvents="none" accessible={false} style={styles.measureSlot}>
          <Text style={styles.measureText} onTextLayout={onMeasureTextLayout}>
            {preview}
          </Text>
        </View>
      ) : null}
      <Text style={styles.previewText} numberOfLines={expanded ? undefined : PREVIEW_LINES}>
        {expanded ? expandedText : preview}
      </Text>
      {showToggle && !expanded ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={SHOW_MORE}
          hitSlop={8}
          style={styles.showMorePressable}
          onPress={() => setExpanded(true)}>
          <Text style={styles.showMoreLabel}>{SHOW_MORE}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}
