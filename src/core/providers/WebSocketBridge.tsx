import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useMemo, useRef } from 'react';

import { dispatchPostWsMessage } from '@/features/realtime/dispatchPostWsMessage';
import { parseMecenateWsMessage } from '@/features/realtime/wsMessage';
import { subscribeFeedRealtime } from '@/features/feed/realtime/subscribeFeedRealtime';
import { createPostWsEventBus } from '@/features/detailPost/realtime/postWsEventBus';
import { subscribePostRealtime } from '@/features/detailPost/realtime/subscribePostRealtime';
import { ReconnectingWebSocket } from '@/shared/api/ws/reconnectingWebSocket';
import { httpToWebSocketBaseUrl } from '@/shared/api/ws/wsUrl';
import { env } from '@/shared/config/env';
import { useRootStore } from '@/stores/rootStore';

export function WebSocketBridge() {
  const queryClient = useQueryClient();
  const store = useRootStore();
  const token = store.session.token;
  const isReady = store.session.isReady;

  const tokenRef = useRef<string | null>(null);
  tokenRef.current = token;

  const bus = useMemo(() => createPostWsEventBus(), []);

  useEffect(() => {
    const unsubscribePost = subscribePostRealtime(bus, queryClient, () => tokenRef.current);
    const unsubscribeFeed = subscribeFeedRealtime(bus, queryClient);
    return () => {
      unsubscribePost();
      unsubscribeFeed();
    };
  }, [bus, queryClient]);

  const client = useMemo(() => {
    const wsBase = httpToWebSocketBaseUrl(env.apiBaseUrl);
    return new ReconnectingWebSocket(
      (sessionToken) => `${wsBase}/ws?token=${encodeURIComponent(sessionToken)}`,
      (textPayload) => {
        const parsed = parseMecenateWsMessage(textPayload);
        if (!parsed) return;
        dispatchPostWsMessage(bus, parsed);
      }
    );
  }, [bus]);

  useEffect(() => {
    if (!isReady || !token) {
      client.disconnect();
      return;
    }

    client.connect(token);
    return () => client.disconnect();
  }, [client, isReady, token]);

  return null;
}
