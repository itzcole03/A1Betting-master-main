import { EventEmitter } from 'events';
export class NotificationManager extends EventEmitter {
    constructor() {
        super();
        this.notifications = new Map();
        this.MAX_NOTIFICATIONS = 100;
        this.preferences = {
            arbitrage: true,
            lineShopping: true,
            modelUpdates: true,
            systemAlerts: true,
            minProfitThreshold: 0.5, // 0.5%
            minConfidenceThreshold: 0.7, // 70%
            quietHours: {
                enabled: false,
                start: 22, // 10 PM;
                end: 7, // 7 AM;
            },
        };
    }
    /**
     * Update notification preferences;
     */
    updatePreferences(preferences) {
        this.preferences = { ...this.preferences, ...preferences };
        this.emit('preferencesUpdated', this.preferences);
    }
    /**
     * Get current notification preferences;
     */
    getPreferences() {
        return { ...this.preferences };
    }
    /**
     * Check if notifications should be sent based on quiet hours;
     */
    isWithinQuietHours() {
        if (!this.preferences.quietHours.enabled) {
            return false;
        }


        const { start, end } = this.preferences.quietHours;
        if (start <= end) {
            return currentHour >= start && currentHour < end;
        }
        else {
            // Handles overnight quiet hours (e.g., 22:00 - 07:00)
            return currentHour >= start || currentHour < end;
        }
    }
    /**
     * Create a new notification;
     */
    createNotification(type, title, message, priority, data) {
        const notification = {
            id: `${type}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            type,
            title,
            message,
            priority,
            timestamp: Date.now(),
            data,
            read: false,
        };
        // Maintain maximum notification limit;
        if (this.notifications.size >= this.MAX_NOTIFICATIONS) {

            this.notifications.delete(oldestNotification.id);
        }
        this.notifications.set(notification.id, notification);
        return notification;
    }
    /**
     * Notify about arbitrage opportunity;
     */
    notifyArbitrageOpportunity(opportunity) {
        if (!this.preferences.arbitrage || this.isWithinQuietHours()) {
            return;
        }
        if (opportunity.profitMargin * 100 < this.preferences.minProfitThreshold ||
            opportunity.risk.confidence < this.preferences.minConfidenceThreshold) {
            return;
        }

        this.emit('newNotification', notification);
    }
    /**
     * Notify about line shopping opportunity;
     */
    notifyLineShoppingOpportunity(result) {
        if (!this.preferences.lineShopping || this.isWithinQuietHours()) {
            return;
        }
        if (result.priceImprovement < this.preferences.minProfitThreshold ||
            result.confidence < this.preferences.minConfidenceThreshold) {
            return;
        }

        this.emit('newNotification', notification);
    }
    /**
     * Notify about model updates;
     */
    notifyModelUpdate(message, data) {
        if (!this.preferences.modelUpdates || this.isWithinQuietHours()) {
            return;
        }

        this.emit('newNotification', notification);
    }
    /**
     * Notify about system alerts;
     */
    notifySystemAlert(title, message, priority = 'medium') {
        if (!this.preferences.systemAlerts || this.isWithinQuietHours()) {
            return;
        }

        this.emit('newNotification', notification);
    }
    /**
     * Mark notification as read;
     */
    markAsRead(notificationId) {

        if (notification) {
            notification.read = true;
            this.emit('notificationUpdated', notification);
        }
    }
    /**
     * Mark all notifications as read;
     */
    markAllAsRead() {
        this.notifications.forEach(notification => {
            notification.read = true;
        });
        this.emit('allNotificationsRead');
    }
    /**
     * Get all notifications;
     */
    getNotifications() {
        return Array.from(this.notifications.values()).sort((a, b) => b.timestamp - a.timestamp);
    }
    /**
     * Get unread notifications;
     */
    getUnreadNotifications() {
        return this.getNotifications().filter(n => !n.read);
    }
    /**
     * Clear all notifications;
     */
    clearNotifications() {
        this.notifications.clear();
        this.emit('notificationsCleared');
    }
}
