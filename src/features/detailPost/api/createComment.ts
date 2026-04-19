import type { HttpClient } from '@/shared/api/httpClient';
import type { CommentCreatedResponseDto } from '@/features/detailPost/model/types';

export async function createComment(
  client: HttpClient,
  postId: string,
  text: string
): Promise<CommentCreatedResponseDto> {
  return client.postJson<CommentCreatedResponseDto>(`/posts/${encodeURIComponent(postId)}/comments`, { text });
}
