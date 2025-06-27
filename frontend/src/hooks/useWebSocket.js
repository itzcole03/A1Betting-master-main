import useStore from "../store/useStore";
import { useEffect, useCallback, useRef } from "react";
export const useWebSocket = ({ url, onMessage, reconnectAttempts = 5, reconnectDelay = 1000, autoReconnect = true, }) => {


    const { addToast } = useStore();
    const connect = useCallback(() => {
        // Safety checks to prevent invalid WebSocket connections;
        // Disable ALL WebSocket connections for debugging;
        if (!url ||
            url === "" ||
            url === "wss://api.betproai.com/ws" ||
            url.includes("api.betproai.com") ||
            url.includes("localhost") ||
            url.includes("ws://") ||
            url.includes("wss://") ||
            import.meta.env.VITE_ENABLE_WEBSOCKET === "false" ||
            import.meta.env.NODE_ENV === "development") {
            // console statement removed
            return;
        }
        try {
            // console statement removed
            ws.current = new WebSocket(url);
            ws.current.onopen = () => {
                // console statement removed
                reconnectCount.current = 0;
            };
            ws.current.onmessage = (event) => {
                try {

                    onMessage?.(message);
                }
                catch (error) {
                    // console statement removed
                }
            };
            ws.current.onclose = () => {
                if (autoReconnect && reconnectCount.current < reconnectAttempts) {

                    setTimeout(() => {
                        reconnectCount.current++;
                        connect();
                    }, delay);
                }
                else if (reconnectCount.current >= reconnectAttempts) {
                    addToast({
                        id: "ws-error",
                        type: "error",
                        title: "Connection Error",
                        message: "Failed to establish WebSocket connection. Please try again later.",
                    });
                }
            };
            ws.current.onerror = (error) => {
                // console statement removed
            };
        }
        catch (error) {
            // console statement removed
        }
    }, [
        url,
        onMessage,
        reconnectAttempts,
        reconnectDelay,
        autoReconnect,
        addToast,
    ]);
    const disconnect = useCallback(() => {
        if (ws.current) {
            ws.current.close();
            ws.current = null;
        }
    }, []);
    const send = useCallback((data) => {
        if (ws.current?.readyState === WebSocket.OPEN) {
            ws.current.send(JSON.stringify(data));
        }
        else {
            // console statement removed
        }
    }, []);
    useEffect(() => {
        // Only attempt connection if URL is valid - DISABLED FOR DEBUGGING;
        if (url &&
            url !== "" &&
            url !== "wss://api.betproai.com/ws" &&
            !url.includes("api.betproai.com") &&
            !url.includes("localhost") &&
            !url.includes("ws://") &&
            !url.includes("wss://") &&
            import.meta.env.VITE_ENABLE_WEBSOCKET !== "false" &&
            import.meta.env.NODE_ENV !== "development") {
            connect();
        }
        else {
            // console statement removed
        }
        return () => {
            disconnect();
        };
    }, [connect, disconnect, url]);
    return {
        send,
        disconnect,
        reconnect: connect,
        isConnected: ws.current?.readyState === WebSocket.OPEN,
    };
};
