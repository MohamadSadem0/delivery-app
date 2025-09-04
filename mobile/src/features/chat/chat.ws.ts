/**
 * Optional WebSocket wrapper if your backend exposes WS for chat.
 * If `wsUrl` is not provided, you can ignore this and use polling in `useChatMessages` hook.
 */
export function connectChatWS(wsUrl: string, onMessage: (payload: any) => void) {
  const ws = new WebSocket(wsUrl);
  let alive = true;

  ws.onmessage = (ev) => {
    try { onMessage(JSON.parse(ev.data)); } catch { /* no-op */ }
  };
  ws.onclose = () => { if (alive) setTimeout(() => connectChatWS(wsUrl, onMessage), 1500); };
  ws.onerror = () => { try { ws.close(); } catch {} };

  return () => { alive = false; try { ws.close(); } catch {} };
}

