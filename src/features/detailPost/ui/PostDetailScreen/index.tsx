import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import React, { useMemo, useState } from 'react';
import { ActivityIndicator, FlatList, Pressable, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import type { CommentSort } from '@/features/detailPost/model/usePostCommentsInfinite';
import { usePostCommentsInfinite } from '@/features/detailPost/model/usePostCommentsInfinite';
import { useCreateCommentMutation } from '@/features/detailPost/model/useCreateCommentMutation';
import { usePostQuery } from '@/features/detailPost/model/usePostQuery';
import { useTogglePostLikeMutation } from '@/features/detailPost/model/useTogglePostLikeMutation';
import {
  formatCommentsCount,
  postDetailCopy,
  POST_DETAIL_KEYBOARD_EXTRA_BOTTOM,
  POST_DETAIL_SORT_HIT_SLOP,
} from '@/features/detailPost/ui/copy';
import { CommentRow } from '@/features/detailPost/ui/CommentRow';
import { PostHeader } from '@/features/detailPost/ui/PostHeader';
import { useTheme } from '@/shared/theme/ThemeProvider';
import { ErrorState } from '@/shared/ui/ErrorState';
import { useKeyboardBottomInset } from '@/shared/utils/useKeyboardBottomInset';

import { usePostDetailScreenStyles } from './styles';

export function PostDetailScreen({ postId }: { postId: string }) {
  const styles = usePostDetailScreenStyles();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const keyboardBottomInset = useKeyboardBottomInset();
  const postQuery = usePostQuery(postId);
  const likeMutation = useTogglePostLikeMutation(postId);
  const commentMutation = useCreateCommentMutation(postId);

  const [sort, setSort] = useState<CommentSort>('new');
  const commentsQuery = usePostCommentsInfinite(postId, sort);

  const [draft, setDraft] = useState('');
  const [manualRefreshing, setManualRefreshing] = useState(false);

  const post = postQuery.data;
  const comments = useMemo(
    () => commentsQuery.data?.pages.flatMap((page) => page.comments) ?? [],
    [commentsQuery.data?.pages]
  );

  if (postQuery.isError) {
    return (
      <View style={[styles.screenRoot, styles.center, { paddingBottom: insets.bottom }]}>
        <ErrorState onRetry={() => postQuery.refetch()} />
      </View>
    );
  }

  if (postQuery.isLoading || !post) {
    return (
      <View style={[styles.center, styles.screenRoot, { paddingBottom: insets.bottom }]}>
        <ActivityIndicator />
      </View>
    );
  }

  const screenBottomInset =
    keyboardBottomInset > 0
      ? keyboardBottomInset + POST_DETAIL_KEYBOARD_EXTRA_BOTTOM
      : insets.bottom;

  return (
    <View style={[styles.screenRoot, { paddingBottom: screenBottomInset }]}>
      <FlatList
        style={styles.listFlex}
        contentContainerStyle={styles.listContent}
        keyboardShouldPersistTaps="handled"
        data={comments}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <View>
            <PostHeader
              post={post}
              likePending={likeMutation.isPending}
              onToggleLike={() => {
                void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                void likeMutation.mutateAsync();
              }}
            />
            <View style={styles.commentsHeader}>
              <Text style={styles.commentsTitle}>{formatCommentsCount(post.commentsCount)}</Text>
              <Pressable
                onPress={() => setSort((currentSort) => (currentSort === 'new' ? 'old' : 'new'))}
                hitSlop={POST_DETAIL_SORT_HIT_SLOP}>
                <Text style={styles.sortLink}>
                  {sort === 'new' ? postDetailCopy.sortNewFirst : postDetailCopy.sortOldFirst}
                </Text>
              </Pressable>
            </View>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.commentRowOuter}>
            <CommentRow comment={item} />
          </View>
        )}
        onEndReachedThreshold={0.7}
        onEndReached={() => {
          if (commentsQuery.hasNextPage && !commentsQuery.isFetchingNextPage) void commentsQuery.fetchNextPage();
        }}
        ListFooterComponent={
          <View style={styles.listFooter}>
            {commentsQuery.isFetchingNextPage ? (
              <ActivityIndicator style={styles.listFooterSpinner} />
            ) : null}
          </View>
        }
        refreshing={manualRefreshing}
        onRefresh={async () => {
          setManualRefreshing(true);
          try {
            await commentsQuery.refetch();
          } finally {
            setManualRefreshing(false);
          }
        }}
      />

      <View style={[styles.composer, { paddingBottom: theme.spacing[10] }]}>
        <TextInput
          value={draft}
          onChangeText={setDraft}
          placeholder={postDetailCopy.commentPlaceholder}
          placeholderTextColor={theme.color.textSecondary}
          style={styles.input}
          multiline
        />
        <Pressable
          disabled={!draft.trim() || commentMutation.isPending}
          onPress={async () => {
            const text = draft.trim();
            if (!text) return;
            await commentMutation.mutateAsync(text);
            setDraft('');
          }}
          style={styles.sendBtn}>
          <Ionicons name="send" size={20} color={theme.color.accent} />
        </Pressable>
      </View>
    </View>
  );
}
