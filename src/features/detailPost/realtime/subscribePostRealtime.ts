import type { QueryClient } from '@tanstack/react-query';

import type { PostWsEventBus } from '@/features/detailPost/realtime/postWsEventBus';
import { WsRealtimeEventType } from '@/features/detailPost/realtime/wsRealtimeEventType';
import {
  applyCommentAddedToPostDetail,
  applyLikeUpdatedToPostDetail,
} from '@/features/detailPost/realtime/wsPostCachePatches';

export function subscribePostRealtime(
  bus: PostWsEventBus,
  queryClient: QueryClient,
  getToken: () => string | null
) {
  return bus.subscribe((event) => {
    const token = getToken();
    if (!token) return;

    if (event.type === WsRealtimeEventType.LikeUpdated) {
      applyLikeUpdatedToPostDetail(queryClient, token, event.postId, event.likesCount);
      return;
    }

    if (event.type === WsRealtimeEventType.CommentAdded) {
      applyCommentAddedToPostDetail(queryClient, token, event.postId);
    }
  });
}
