import { Ionicons } from '@expo/vector-icons';
import React, { type FC, memo } from 'react';
import { Text, View } from 'react-native';

import { useTheme } from '@/shared/theme/ThemeProvider';
import { Spacer } from '@/shared/ui/Spacer';

import { usePostReactionPillsStyles } from './styles';

type Props = {
  likesCount: number;
  commentsCount: number;
  isLiked: boolean;
};

const PostReactionPills: FC<Props> = ({ likesCount, commentsCount, isLiked }) => {
  const styles = usePostReactionPillsStyles();
  const theme = useTheme();
  const likeIconColor = isLiked ? theme.color.feedLikeActiveContrast : theme.color.textCounter;
  const commentIconColor = theme.color.textCounter;

  return (
    <View style={styles.footer}>
      <View style={[styles.pill, isLiked ? styles.pillLikeActive : styles.pillNeutral]}>
        <Ionicons name={isLiked ? 'heart' : 'heart-outline'} size={16} color={likeIconColor} />
        <Spacer size={8} orientation="horizontal" />
        <Text style={isLiked ? styles.likeMetaActive : styles.metaSecondary}>{likesCount}</Text>
      </View>
      <Spacer size={8} orientation="horizontal" />
      <View style={[styles.pill, styles.pillNeutral]}>
        <Ionicons name="chatbubble" size={16} color={commentIconColor} />
        <Spacer size={6} orientation="horizontal" />
        <Text style={styles.metaSecondary}>{commentsCount}</Text>
      </View>
    </View>
  );
};

export default memo(PostReactionPills);
