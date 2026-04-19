import type { ApiResponse } from '@/shared/api/types';
import type { AuthorDto, PostDto, PostTier } from '@/entities/post/types';

export type { AuthorDto, PostDto, PostTier };

export type PostDetailResponseDto = ApiResponse<{
  post: PostDto;
}>;

export type LikeResponseDto = ApiResponse<{
  isLiked: boolean;
  likesCount: number;
}>;

export type CommentDto = {
  id: string;
  postId: string;
  author: AuthorDto;
  text: string;
  createdAt: string;
};

export type CommentsResponseDto = ApiResponse<{
  comments: CommentDto[];
  nextCursor: string | null;
  hasMore: boolean;
}>;

export type CommentCreatedResponseDto = ApiResponse<{
  comment: CommentDto;
}>;
