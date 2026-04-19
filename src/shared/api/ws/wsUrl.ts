export function httpToWebSocketBaseUrl(httpBaseUrl: string) {
  if (httpBaseUrl.startsWith('https://')) return `wss://${httpBaseUrl.slice('https://'.length)}`;
  if (httpBaseUrl.startsWith('http://')) return `ws://${httpBaseUrl.slice('http://'.length)}`;
  return httpBaseUrl;
}
