import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createComment } from '@/features/detailPost/api/createComment';
import { createHttpClient } from '@/shared/api/httpClient';
import { env } from '@/shared/config/env';
import { useRootStore } from '@/stores/rootStore';

export function useCreateCommentMutation(postId: string) {
  const store = useRootStore();
  const token = store.session.token;
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (text: string) => {
      const client = createHttpClient({ baseUrl: env.apiBaseUrl, getToken: () => store.session.token });
      const res = await createComment(client, postId, text);
      if (!res.ok) throw new Error(res.error.message);
      return res.data.comment;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['postComments', postId] });
      await queryClient.invalidateQueries({ queryKey: ['post', postId, token] });
    },
  });
}
