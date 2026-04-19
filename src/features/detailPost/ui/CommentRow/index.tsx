import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { Image } from 'expo-image';
import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import type { CommentDto } from '@/features/detailPost/model/types';
import { useTheme } from '@/shared/theme/ThemeProvider';

import { useCommentRowStyles } from './styles';

type Props = {
  comment: CommentDto;
};

export function CommentRow({ comment }: Props) {
  const styles = useCommentRowStyles();
  const theme = useTheme();
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);

  const heartColor = liked ? theme.color.feedLikeActive : theme.color.textSecondary;

  return (
    <View style={styles.commentRow}>
      <Image source={{ uri: comment.author.avatarUrl }} style={styles.commentAvatar} />
      <View style={styles.commentBody}>
        <Text style={styles.commentAuthor} numberOfLines={1}>
          {comment.author.displayName}
        </Text>
        <Text style={styles.commentText}>{comment.text}</Text>
      </View>

      <Pressable
        onPress={() => {
          void Haptics.selectionAsync();
          setLiked((prev) => {
            const next = !prev;
            setLikes((previousCount) => Math.max(0, previousCount + (next ? 1 : -1)));
            return next;
          });
        }}
        style={styles.commentLike}>
        <Ionicons name={liked ? 'heart' : 'heart-outline'} size={18} color={heartColor} />
        <Text style={styles.commentLikeText}>{likes}</Text>
      </Pressable>
    </View>
  );
}
