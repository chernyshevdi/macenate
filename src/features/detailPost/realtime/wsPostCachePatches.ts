import type { QueryClient } from '@tanstack/react-query';

import type { PostDto } from '@/entities/post/types';

export function applyLikeUpdatedToPostDetail(
  queryClient: QueryClient,
  token: string,
  postId: string,
  likesCount: number
) {
  queryClient.setQueryData<PostDto | undefined>(['post', postId, token], (previousPost) => {
    if (!previousPost) return previousPost;
    return { ...previousPost, likesCount };
  });
}

export function applyCommentAddedToPostDetail(queryClient: QueryClient, token: string, postId: string) {
  void queryClient.invalidateQueries({ queryKey: ['postComments', postId] });
  void queryClient.invalidateQueries({ queryKey: ['post', postId, token] });
}
