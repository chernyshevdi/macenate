import { useInfiniteQuery } from '@tanstack/react-query';

import { useRootStore } from '@/stores/rootStore';
import { createHttpClient } from '@/shared/api/httpClient';
import type { PostDto, PostTier } from '@/entities/post/types';
import { env } from '@/shared/config/env';

import { getPosts } from '../api/getPosts';

type FeedPage = { posts: PostDto[]; nextCursor: string | null; hasMore: boolean };

export function useFeedInfinite(opts?: { tier?: PostTier; limit?: number; simulateError?: boolean }) {
  const store = useRootStore();
  const token = store.session.token;
  const isReady = store.session.isReady;

  return useInfiniteQuery({
    queryKey: ['feed', { tier: opts?.tier ?? null, limit: opts?.limit ?? 20, simulateError: !!opts?.simulateError }, token],
    enabled: isReady,
    initialPageParam: undefined as string | undefined,
    queryFn: async ({ pageParam }) => {
      const client = createHttpClient({ baseUrl: env.apiBaseUrl, getToken: () => store.session.token });
      const res = await getPosts(client, {
        limit: opts?.limit ?? 20,
        cursor: pageParam,
        tier: opts?.tier,
        simulateError: opts?.simulateError,
      });

      if (!res.ok) {
        throw new Error(res.error.message);
      }

      return res.data as FeedPage;
    },
    getNextPageParam: (lastPage) => (lastPage.hasMore ? lastPage.nextCursor ?? undefined : undefined),
  });
}

