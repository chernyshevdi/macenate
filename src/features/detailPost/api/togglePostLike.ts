import type { HttpClient } from '@/shared/api/httpClient';
import type { LikeResponseDto } from '@/features/detailPost/model/types';

export async function togglePostLike(client: HttpClient, postId: string): Promise<LikeResponseDto> {
  return client.postJson<LikeResponseDto>(`/posts/${encodeURIComponent(postId)}/like`, {});
}
