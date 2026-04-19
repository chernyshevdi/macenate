import { useMutation, useQueryClient } from '@tanstack/react-query';

import { applyLikeUpdatedToFeed } from '@/features/feed/realtime/wsFeedCachePatches';
import { togglePostLike } from '@/features/detailPost/api/togglePostLike';
import { createHttpClient } from '@/shared/api/httpClient';
import type { PostDto } from '@/entities/post/types';
import { env } from '@/shared/config/env';
import { useRootStore } from '@/stores/rootStore';

export function useTogglePostLikeMutation(postId: string) {
  const store = useRootStore();
  const token = store.session.token;
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const client = createHttpClient({ baseUrl: env.apiBaseUrl, getToken: () => store.session.token });
      const res = await togglePostLike(client, postId);
      if (!res.ok) throw new Error(res.error.message);
      return res.data;
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['post', postId, token] });

      const prev = queryClient.getQueryData<PostDto>(['post', postId, token]);
      if (!prev) return { prev };

      const nextLiked = !prev.isLiked;
      const nextCount = Math.max(0, prev.likesCount + (nextLiked ? 1 : -1));

      queryClient.setQueryData<PostDto>(['post', postId, token], { ...prev, isLiked: nextLiked, likesCount: nextCount });
      applyLikeUpdatedToFeed(queryClient, postId, { isLiked: nextLiked, likesCount: nextCount });
      return { prev };
    },
    onError: (_err, _vars, ctx) => {
      const prev = ctx?.prev as PostDto | undefined;
      if (!prev) return;
      queryClient.setQueryData(['post', postId, token], prev);
      applyLikeUpdatedToFeed(queryClient, postId, { isLiked: prev.isLiked, likesCount: prev.likesCount });
    },
    onSuccess: (likeResponse) => {
      queryClient.setQueryData<PostDto | undefined>(['post', postId, token], (previousPost) =>
        previousPost
          ? { ...previousPost, isLiked: likeResponse.isLiked, likesCount: likeResponse.likesCount }
          : previousPost
      );
      applyLikeUpdatedToFeed(queryClient, postId, {
        isLiked: likeResponse.isLiked,
        likesCount: likeResponse.likesCount,
      });
    },
  });
}
