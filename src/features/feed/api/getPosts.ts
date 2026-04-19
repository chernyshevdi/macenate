import type { PostsResponseDto } from '@/features/feed/model/types';
import type { PostTier } from '@/entities/post/types';
import type { HttpClient } from '@/shared/api/httpClient';

export async function getPosts(
  client: HttpClient,
  params: { limit: number; cursor?: string; tier?: PostTier; simulateError?: boolean }
): Promise<PostsResponseDto> {
  return client.get<PostsResponseDto>('/posts', {
    query: {
      limit: params.limit,
      cursor: params.cursor,
      tier: params.tier,
      simulate_error: params.simulateError,
    },
  });
}

