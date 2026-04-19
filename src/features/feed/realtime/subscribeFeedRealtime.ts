import type { QueryClient } from '@tanstack/react-query';

import type { PostWsEventBus } from '@/features/detailPost/realtime/postWsEventBus';
import { WsRealtimeEventType } from '@/features/detailPost/realtime/wsRealtimeEventType';
import { applyCommentAddedToFeed, applyLikeUpdatedToFeed } from '@/features/feed/realtime/wsFeedCachePatches';

export function subscribeFeedRealtime(bus: PostWsEventBus, queryClient: QueryClient) {
  return bus.subscribe((event) => {
    if (event.type === WsRealtimeEventType.LikeUpdated) {
      applyLikeUpdatedToFeed(queryClient, event.postId, { likesCount: event.likesCount });
      return;
    }

    if (event.type === WsRealtimeEventType.CommentAdded) {
      applyCommentAddedToFeed(queryClient, event.postId);
    }
  });
}
