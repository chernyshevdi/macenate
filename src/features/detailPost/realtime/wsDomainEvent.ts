import type { CommentDto } from '@/features/detailPost/model/types';

import { WsRealtimeEventType } from './wsRealtimeEventType';

export type WsDomainEvent =
  | { type: WsRealtimeEventType.LikeUpdated; postId: string; likesCount: number }
  | { type: WsRealtimeEventType.CommentAdded; postId: string; comment: CommentDto };
