import { useInfiniteQuery } from '@tanstack/react-query';

import { getComments } from '@/features/detailPost/api/getComments';
import { createHttpClient } from '@/shared/api/httpClient';
import type { CommentDto } from '@/features/detailPost/model/types';
import { env } from '@/shared/config/env';
import { useRootStore } from '@/stores/rootStore';

export type CommentSort = 'new' | 'old';

type Page = { comments: CommentDto[]; nextCursor: string | null; hasMore: boolean };

function sortComments(comments: CommentDto[], sort: CommentSort) {
  const copy = [...comments];
  copy.sort((commentA, commentB) => {
    const timeA = Date.parse(commentA.createdAt);
    const timeB = Date.parse(commentB.createdAt);
    return sort === 'new' ? timeB - timeA : timeA - timeB;
  });
  return copy;
}

export function usePostCommentsInfinite(postId: string, sort: CommentSort) {
  const store = useRootStore();
  const token = store.session.token;
  const isReady = store.session.isReady;

  return useInfiniteQuery({
    queryKey: ['postComments', postId, { sort }, token],
    enabled: isReady && !!postId,
    initialPageParam: undefined as string | undefined,
    queryFn: async ({ pageParam }) => {
      const client = createHttpClient({ baseUrl: env.apiBaseUrl, getToken: () => store.session.token });
      const res = await getComments(client, postId, { limit: 20, cursor: pageParam });
      if (!res.ok) throw new Error(res.error.message);

      return {
        comments: sortComments(res.data.comments, sort),
        nextCursor: res.data.nextCursor,
        hasMore: res.data.hasMore,
      } satisfies Page;
    },
    getNextPageParam: (lastPage) => (lastPage.hasMore ? lastPage.nextCursor ?? undefined : undefined),
  });
}
