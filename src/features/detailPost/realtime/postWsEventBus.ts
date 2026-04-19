import { createDedupingEventBus } from '@/shared/api/dedupingEventBus';

import type { WsDomainEvent } from './wsDomainEvent';
import { WsRealtimeEventType } from './wsRealtimeEventType';

export function createPostWsEventBus() {
  return createDedupingEventBus<WsDomainEvent>({
    getDedupeKey: (event) =>
      event.type === WsRealtimeEventType.LikeUpdated
        ? `like:${event.postId}:${event.likesCount}`
        : `comment:${event.comment.id}`,
  });
}

export type PostWsEventBus = ReturnType<typeof createPostWsEventBus>;
