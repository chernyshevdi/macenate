import type { QueryClient } from '@tanstack/react-query';

import type { PostDto } from '@/entities/post/types';

export type FeedLikePatch = { likesCount: number; isLiked?: boolean };

export function applyLikeUpdatedToFeed(
  queryClient: QueryClient,
  postId: string,
  patch: FeedLikePatch
) {
  queryClient.setQueriesData({ queryKey: ['feed'] }, (previousData: any) => {
    if (!previousData?.pages) return previousData;
    return {
      ...previousData,
      pages: previousData.pages.map((page: any) => ({
        ...page,
        posts: page.posts.map((postItem: PostDto) =>
          postItem.id === postId
            ? {
                ...postItem,
                likesCount: patch.likesCount,
                ...(patch.isLiked !== undefined ? { isLiked: patch.isLiked } : {}),
              }
            : postItem
        ),
      })),
    };
  });
}

export function applyCommentAddedToFeed(queryClient: QueryClient, postId: string) {
  queryClient.setQueriesData({ queryKey: ['feed'] }, (previousData: any) => {
    if (!previousData?.pages) return previousData;
    return {
      ...previousData,
      pages: previousData.pages.map((page: any) => ({
        ...page,
        posts: page.posts.map((postItem: PostDto) =>
          postItem.id === postId ? { ...postItem, commentsCount: postItem.commentsCount + 1 } : postItem
        ),
      })),
    };
  });
}
