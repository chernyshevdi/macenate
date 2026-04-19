import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React, { type FC, memo } from 'react';
import { Pressable, Text, View } from 'react-native';

import type { PostDto } from '@/entities/post/types';
import PostReactionPills from '@/features/feed/ui/postReactionPills';
import { Spacer } from '@/shared/ui/Spacer';

import { FeedPostPreview } from './FeedPostPreview';
import PaidPostCard from './paidPostCard';
import { useFeedPostCardStyles } from './styles';

type Props = {
  post: PostDto;
};

function arePostCardsEqual(previous: Props, next: Props): boolean {
  const previousPost = previous.post;
  const nextPost = next.post;
  return (
    previousPost.id === nextPost.id &&
    previousPost.preview === nextPost.preview &&
    previousPost.body === nextPost.body &&
    previousPost.title === nextPost.title &&
    previousPost.tier === nextPost.tier &&
    previousPost.likesCount === nextPost.likesCount &&
    previousPost.commentsCount === nextPost.commentsCount &&
    previousPost.isLiked === nextPost.isLiked &&
    previousPost.author.displayName === nextPost.author.displayName &&
    previousPost.author.avatarUrl === nextPost.author.avatarUrl &&
    previousPost.coverUrl === nextPost.coverUrl
  );
}

const PostCard: FC<Props> = ({ post }) => {
  const styles = useFeedPostCardStyles();
  const router = useRouter();
  const isPaid = post.tier === 'paid';

  const onCardPressHandler = () => {
    router.push(`/posts/${post.id}`);
  };

  if (isPaid) {
    return <PaidPostCard post={post} />;
  }

  return (
    <Pressable accessibilityRole="button" onPress={onCardPressHandler}>
      <View style={styles.surface}>
        <View style={styles.header}>
          <Image source={{ uri: post.author.avatarUrl }} style={styles.avatar} />
          <Text style={styles.authorText} numberOfLines={1}>
            {post.author.displayName}
          </Text>
        </View>

        <Image source={{ uri: post.coverUrl }} style={styles.image} />

        <Spacer size={10} />

        <View style={styles.body}>
          <Text style={styles.titleText}>{post.title}</Text>
          <Spacer size={8} />
          <FeedPostPreview
            preview={post.preview}
            body={post.body}
            styles={{
              readMoreHost: styles.previewReadMoreHost,
              measureSlot: styles.previewMeasureSlot,
              measureText: styles.previewMeasureText,
              previewText: styles.previewText,
              showMorePressable: styles.previewShowMorePressable,
              showMoreLabel: styles.previewShowMoreLabel,
            }}
          />
        </View>

        <Spacer size={16} />
        <PostReactionPills likesCount={post.likesCount} commentsCount={post.commentsCount} isLiked={post.isLiked} />
      </View>
    </Pressable>
  );
};

export default memo(PostCard, arePostCardsEqual);
