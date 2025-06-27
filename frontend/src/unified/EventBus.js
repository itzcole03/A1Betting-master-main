export class EventBus {
    /**
     * Publishes an event to all registered handlers.
     * @param event The event object with type and payload.
     */
    async publish(event) {

        if (handlers) {
            handlers.forEach((handler) => {
                handler(event.payload);
            });
        }
    }
    constructor() {
        this.handlers = new Map();
    }
    static getInstance() {
        if (!EventBus.instance) {
            EventBus.instance = new EventBus();
        }
        return EventBus.instance;
    }
    on(event, handler) {
        if (!this.handlers.has(event)) {
            this.handlers.set(event, new Set());
        }
        this.handlers.get(event).add(handler);
    }
    off(event, handler) {

        if (handlers) {
            handlers.delete(handler);
            if (handlers.size === 0) {
                this.handlers.delete(event);
            }
        }
    }
    emit(event, data) {

        if (handlers) {
            handlers.forEach(handler => {
                try {
                    handler(data);
                }
                catch (error) {
                    // console statement removed
                }
            });
        }
    }
    clear() {
        this.handlers.clear();
    }
    getHandlerCount(event) {
        return this.handlers.get(event)?.size || 0;
    }
    hasHandlers(event) {
        return this.handlers.has(event) && this.handlers.get(event).size > 0;
    }
}
