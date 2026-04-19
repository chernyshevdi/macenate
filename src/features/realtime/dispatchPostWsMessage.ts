import type { PostWsEventBus } from '@/features/detailPost/realtime/postWsEventBus';
import { WsRealtimeEventType } from '@/features/detailPost/realtime/wsRealtimeEventType';

import type { WsMessage } from './wsMessage';

export function dispatchPostWsMessage(bus: PostWsEventBus, message: WsMessage): void {
  if (message.type === 'ping') return;

  if (message.type === 'like_updated') {
    bus.publish({
      type: WsRealtimeEventType.LikeUpdated,
      postId: message.postId,
      likesCount: message.likesCount,
    });
    return;
  }

  if (message.type === 'comment_added') {
    bus.publish({
      type: WsRealtimeEventType.CommentAdded,
      postId: message.postId,
      comment: message.comment,
    });
  }
}
