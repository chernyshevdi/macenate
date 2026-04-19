export class ReconnectingWebSocket {
  private ws: WebSocket | null = null;
  private reconnectTimer: ReturnType<typeof setTimeout> | null = null;
  private closedByUser = false;

  constructor(
    private readonly wsUrlFactory: (token: string) => string,
    private readonly onMessageText: (text: string) => void
  ) {}

  connect(token: string) {
    this.closedByUser = false;
    this.open(token);
  }

  disconnect() {
    this.closedByUser = true;
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
    this.ws?.close();
    this.ws = null;
  }

  private scheduleReconnect(token: string) {
    if (this.closedByUser) return;
    if (this.reconnectTimer) return;
    this.reconnectTimer = setTimeout(() => {
      this.reconnectTimer = null;
      this.open(token);
    }, 1200);
  }

  private open(token: string) {
    if (this.ws && (this.ws.readyState === WebSocket.OPEN || this.ws.readyState === WebSocket.CONNECTING)) {
      return;
    }

    const url = this.wsUrlFactory(token);
    const ws = new WebSocket(url);
    this.ws = ws;

    ws.onmessage = (messageEvent) => {
      if (typeof messageEvent.data === 'string') this.onMessageText(messageEvent.data);
    };

    ws.onerror = () => {
      // RN WebSocket errors are sparse; rely on close/reconnect.
    };

    ws.onclose = () => {
      this.ws = null;
      if (!this.closedByUser) this.scheduleReconnect(token);
    };
  }
}
