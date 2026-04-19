import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import Reanimated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import type { PostDto } from '@/entities/post/types';
import { postDetailCopy } from '@/features/detailPost/ui/copy';
import { AnimatedCount } from '@/features/detailPost/ui/AnimatedCount';
import { AnimatedHeartButton } from '@/features/detailPost/ui/AnimatedHeartButton';
import { useTheme } from '@/shared/theme/ThemeProvider';
import { Button } from '@/shared/ui/Button';
import { Spacer } from '@/shared/ui/Spacer';

import { usePostHeaderStyles } from './styles';

type Props = {
  post: PostDto;
  onToggleLike: () => void;
  likePending: boolean;
  onOpenPremium?: () => void;
};

export function PostHeader({ post, onToggleLike, likePending, onOpenPremium }: Props) {
  const styles = usePostHeaderStyles();
  const theme = useTheme();
  const isPaid = post.tier === 'paid';
  const likePillScale = useSharedValue(1);
  const likePillAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: likePillScale.value }],
  }));

  return (
    <View style={styles.headerRoot}>
      <View style={styles.authorRow}>
        <Image source={{ uri: post.author.avatarUrl }} style={styles.authorAvatar} />
        <Text style={styles.authorName} numberOfLines={1}>
          {post.author.displayName}
        </Text>
      </View>

      <Spacer size={12} />

      <View style={styles.coverWrap}>
        <Image source={{ uri: post.coverUrl }} style={styles.cover} blurRadius={isPaid ? 18 : 0} />
        {isPaid ? (
          <>
            <View style={styles.overlayFill} />
            <View style={styles.paidOverlay}>
              <View style={styles.paidCard}>
                <Ionicons name="lock-closed" size={18} color={theme.color.textCounter} />
                <Spacer size={8} />
                <Text style={styles.paidTitle}>{postDetailCopy.paidTitle}</Text>
                <Spacer size={4} />
                <Text style={styles.paidText}>{postDetailCopy.paidDescription}</Text>
                <Spacer size={12} />
                <Button title={postDetailCopy.premiumButton} onPress={onOpenPremium ?? (() => {})} />
              </View>
            </View>
          </>
        ) : null}
      </View>

      <Spacer size={12} />

      <Text style={styles.postTitle}>{post.title}</Text>

      <Spacer size={8} />

      {!isPaid ? (
        <Text style={styles.postBody}>{post.body || post.preview}</Text>
      ) : (
        <Text style={styles.postBody}>{postDetailCopy.paidBodyStub}</Text>
      )}

      <Spacer size={16} />

      <View style={styles.metaRow}>
        <Pressable
          disabled={likePending}
          onPressIn={() => {
            if (likePending) return;
            likePillScale.value = withTiming(0.96, {
              duration: 90,
              easing: Easing.out(Easing.cubic),
            });
          }}
          onPressOut={() => {
            likePillScale.value = withTiming(1, {
              duration: 110,
              easing: Easing.out(Easing.cubic),
            });
          }}
          onPress={onToggleLike}>
          <Reanimated.View
            style={[likePillAnimatedStyle, styles.metaPill, post.isLiked && styles.metaPillLikeActive]}>
            <AnimatedHeartButton active={post.isLiked} embedded />
            <View style={styles.metaGap10} />
            <AnimatedCount value={post.likesCount} active={post.isLiked} />
          </Reanimated.View>
        </Pressable>

        <View style={styles.metaGap12} />

        <View style={styles.metaPill}>
          <Ionicons name="chatbubble-outline" size={18} color={theme.color.textCounter} />
          <View style={styles.metaGap8} />
          <Text style={styles.metaCountText}>{post.commentsCount}</Text>
        </View>
      </View>

      <Spacer size={16} />
    </View>
  );
}
