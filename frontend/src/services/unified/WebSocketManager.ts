// Minimal browser-compatible EventEmitter;
class EventEmitter {
  private listeners: { [event: string]: Function[] } = {};
  on(event: string, fn: Function) {
    this.listeners[event] = this.listeners[event] || [];
    this.listeners[event].push(fn);
  }
  off(event: string, fn: Function) {
    if (!this.listeners[event]) return;
    this.listeners[event] = this.listeners[event].filter((f) => f !== fn);
  }
  emit(event: string, ...args: any[]) {
    (this.listeners[event] || []).forEach((fn) => fn(...args));
  }
}
import { useAppStore } from '@/stores/appStore.ts';
import { WSMessage, WebSocketConfig } from '@/types/core.ts';

interface WebSocketConnection {
  socket: WebSocket;
  messageQueue: WSMessage[];
  isConnected: boolean;
  reconnectAttempts: number;
  heartbeatTimer?: NodeJS.Timeout;
}

export class WebSocketManager extends EventEmitter {
  private static instance: WebSocketManager;
  private connections: Map<string, WebSocketConnection>;
  private readonly defaultConfig: Required<WebSocketConfig>;

  private constructor() {
    super();
    this.connections = new Map();
    this.defaultConfig = {
      url:
        typeof import.meta !== "undefined" &&
        import.meta.env &&
        import.meta.env.VITE_WS_URL;
          ? import.meta.env.VITE_WS_URL;
          : "",
      reconnectInterval: 1000,
      maxRetries: 5,
    };
  }

  public static getInstance(): WebSocketManager {
    if (!WebSocketManager.instance) {
      WebSocketManager.instance = new WebSocketManager();
    }
    return WebSocketManager.instance;
  }

  public connect(config: Partial<WebSocketConfig> = {}): void {
    // console statement removed called with config:", config);

    // console statement removed

    // Skip connection if WebSocket is disabled or no valid URL is configured;
    if (
      !fullConfig.url ||
      fullConfig.url === "" ||
      fullConfig.url === "wss://api.betproai.com/ws" ||
      fullConfig.url.includes("api.betproai.com") ||
      import.meta.env.VITE_ENABLE_WEBSOCKET === "false"
    ) {
      // console statement removed
      return;
    }

    const clientId =
      userId || `anon_client_${Math.random().toString(36).substring(2, 10)}`;

    if (this.connections.has(wsUrl)) {
      return;
    }

    const connection: WebSocketConnection = {
      socket: new WebSocket(wsUrl),
      messageQueue: [],
      isConnected: false,
      reconnectAttempts: 0,
    };

    this.setupSocketHandlers(connection, fullConfig);
    this.connections.set(wsUrl, connection);
  }

  private setupSocketHandlers(
    connection: WebSocketConnection,
    config: Required<WebSocketConfig>,
  ): void {
    const { socket } = connection;

    socket.onopen = () => {
      connection.isConnected = true;
      connection.reconnectAttempts = 0;
      this.processMessageQueue(connection);
      this.setupHeartbeat(connection, config);
      this.emit("connected", config.url);
    };

    socket.onclose = () => {
      connection.isConnected = false;
      this.clearHeartbeat(connection);
      this.emit("disconnected", config.url);
      this.handleReconnect(connection, config);
    };

    socket.onerror = (error) => {
      // console statement removed
      this.emit("error", { url: config.url, error });
    };

    socket.onmessage = (event) => {
      try {

        this.emit("message", { url: config.url, message });
      } catch (error) {
        this.emit("error", {
          url: config.url,
          error: new Error("Failed to parse WebSocket message"),
        });
      }
    };
  }

  private setupHeartbeat(
    connection: WebSocketConnection,
    config: Required<WebSocketConfig>,
  ): void {
    connection.heartbeatTimer = setInterval(() => {
      if (connection.isConnected) {
        this.send(config.url, {
          type: "ping",
          data: {},
          timestamp: Date.now(),
        });
      }
    }, config.reconnectInterval);
  }

  private clearHeartbeat(connection: WebSocketConnection): void {
    if (connection.heartbeatTimer) {
      clearInterval(connection.heartbeatTimer);
      connection.heartbeatTimer = undefined;
    }
  }

  private handleReconnect(
    connection: WebSocketConnection,
    config: Required<WebSocketConfig>,
  ): void {
    if (connection.reconnectAttempts < config.maxRetries) {
      connection.reconnectAttempts++;
      // console statement removed
      setTimeout(
        () => {
          this.connect(config);
        },
        config.reconnectInterval *
          Math.pow(2, connection.reconnectAttempts - 1),
      );
    } else {
      // console statement removed
      this.emit("reconnect_failed", config.url);
    }
  }

  private processMessageQueue(connection: WebSocketConnection): void {
    while (connection.messageQueue.length > 0) {

      if (message) {
        connection.socket.send(JSON.stringify(message));
      }
    }
  }

  public send(url: string, message: WSMessage): void {

    if (!connection) {
      throw new Error(`No WebSocket connection found for URL: ${url}`);
    }

    if (connection.isConnected) {
      connection.socket.send(JSON.stringify(message));
    } else {
      connection.messageQueue.push(message);
    }
  }

  public disconnect(url: string): void {

    if (connection) {
      this.clearHeartbeat(connection);
      connection.socket.close();
      this.connections.delete(url);
    }
  }

  public isConnected(url: string): boolean {
    return this.connections.get(url)?.isConnected ?? false;
  }

  public getConnectionStatus(): Record<string, boolean> {
    const status: Record<string, boolean> = {};
    Array.from(this.connections.entries()).forEach(([url, connection]) => {
      status[url] = connection.isConnected;
    });
    return status;
  }
}

export const webSocketManager = WebSocketManager.getInstance();
