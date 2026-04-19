import type { CommentDto } from '@/features/detailPost/model/types';

export type WsPing = { type: 'ping' };
export type WsLikeUpdated = { type: 'like_updated'; postId: string; likesCount: number };
export type WsCommentAdded = { type: 'comment_added'; postId: string; comment: CommentDto };
export type WsMessage = WsPing | WsLikeUpdated | WsCommentAdded;

export function parseMecenateWsMessage(rawPayload: string): WsMessage | null {
  try {
    return JSON.parse(rawPayload) as WsMessage;
  } catch {
    return null;
  }
}
