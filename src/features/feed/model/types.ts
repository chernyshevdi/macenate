import type { PostDto } from '@/entities/post/types';
import type { ApiResponse } from '@/shared/api/types';

export type PostsResponseDto = ApiResponse<{
  posts: PostDto[];
  nextCursor: string | null;
  hasMore: boolean;
}>;
