import { useQuery } from '@tanstack/react-query';

import { getPost } from '@/features/detailPost/api/getPost';
import { createHttpClient } from '@/shared/api/httpClient';
import { env } from '@/shared/config/env';
import { useRootStore } from '@/stores/rootStore';

export function usePostQuery(postId: string) {
  const store = useRootStore();
  const token = store.session.token;
  const isReady = store.session.isReady;

  return useQuery({
    queryKey: ['post', postId, token],
    enabled: isReady && !!postId,
    queryFn: async () => {
      const client = createHttpClient({ baseUrl: env.apiBaseUrl, getToken: () => store.session.token });
      const res = await getPost(client, postId);
      if (!res.ok) throw new Error(res.error.message);
      return res.data.post;
    },
  });
}
