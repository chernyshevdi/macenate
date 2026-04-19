import type { HttpClient } from '@/shared/api/httpClient';
import type { PostDetailResponseDto } from '@/features/detailPost/model/types';

export async function getPost(client: HttpClient, postId: string): Promise<PostDetailResponseDto> {
  return client.get<PostDetailResponseDto>(`/posts/${encodeURIComponent(postId)}`);
}
