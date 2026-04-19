import type { HttpClient } from '@/shared/api/httpClient';
import type { CommentsResponseDto } from '@/features/detailPost/model/types';

export async function getComments(
  client: HttpClient,
  postId: string,
  params: { limit?: number; cursor?: string }
): Promise<CommentsResponseDto> {
  return client.get<CommentsResponseDto>(`/posts/${encodeURIComponent(postId)}/comments`, {
    query: {
      limit: params.limit,
      cursor: params.cursor,
    },
  });
}
