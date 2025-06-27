import { BaseService } from './BaseService';
export class UnifiedNotificationService extends BaseService {
    constructor(registry) {
        super('notification', registry);
        this.defaultDuration = 5000;
        this.maxNotifications = 100;


        if (!errorService || !stateService) {
            throw new Error('Required services not found in registry');
        }
        this.errorService = errorService;
        this.stateService = stateService;
    }
    notifyUser(notification, options = {}) {
        try {
            const newNotification = {
                ...notification,
                id: this.generateId(),
                timestamp: Date.now(),
                read: false,
            };
            // Add to state;


            this.stateService.setState({ notifications: updatedNotifications });
            // Play sound if enabled;
            if (options.sound && this.stateService.getState().settings.sound) {
                this.playNotificationSound(notification.type);
            }
            // Auto-dismiss if duration is specified;
            if (options.duration !== 0) {
                setTimeout(() => {
                    this.dismissNotification(newNotification.id);
                }, options.duration || this.defaultDuration);
            }
        }
        catch (error) {
            this.errorService.handleError(error, {
                code: 'NOTIFICATION_ERROR',
                source: 'UnifiedNotificationService',
                details: { method: 'notifyUser', notification, options },
            });
        }
    }
    dismissNotification(notificationId) {
        try {


            this.stateService.setState({ notifications: updatedNotifications });
        }
        catch (error) {
            this.errorService.handleError(error, {
                code: 'NOTIFICATION_ERROR',
                source: 'UnifiedNotificationService',
                details: { method: 'dismissNotification', notificationId },
            });
        }
    }
    markAsRead(notificationId) {
        try {


            this.stateService.setState({ notifications: updatedNotifications });
        }
        catch (error) {
            this.errorService.handleError(error, {
                code: 'NOTIFICATION_ERROR',
                source: 'UnifiedNotificationService',
                details: { method: 'markAsRead', notificationId },
            });
        }
    }
    clearAll() {
        try {
            this.stateService.setState({ notifications: [] });
        }
        catch (error) {
            this.errorService.handleError(error, {
                code: 'NOTIFICATION_ERROR',
                source: 'UnifiedNotificationService',
                details: { method: 'clearAll' },
            });
        }
    }
    getUnreadCount() {
        try {
            return this.stateService.getState().notifications.filter(notification => !notification.read)
                .length;
        }
        catch (error) {
            this.errorService.handleError(error, {
                code: 'NOTIFICATION_ERROR',
                source: 'UnifiedNotificationService',
                details: { method: 'getUnreadCount' },
            });
            return 0;
        }
    }
    generateId() {
        return `notif_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }
    playNotificationSound(type) {
        try {

            switch (type) {
                case 'success':
                    audio.src = '/sounds/success.mp3';
                    break;
                case 'error':
                    audio.src = '/sounds/error.mp3';
                    break;
                case 'warning':
                    audio.src = '/sounds/warning.mp3';
                    break;
                default:
                    audio.src = '/sounds/info.mp3';
            }
            audio.play().catch(error => {
                this.errorService.handleError(error, {
                    code: 'NOTIFICATION_ERROR',
                    source: 'UnifiedNotificationService',
                    details: { method: 'playNotificationSound', type },
                });
            });
        }
        catch (error) {
            this.errorService.handleError(error, {
                code: 'NOTIFICATION_ERROR',
                source: 'UnifiedNotificationService',
                details: { method: 'playNotificationSound', type },
            });
        }
    }
    notify(type, message) {
        const notification = {
            id: Math.random().toString(36).substr(2, 9),
            type,
            message,
            timestamp: Date.now(),
            read: false,
        };
        // Log notification;
        this.logger.info(`Notification [${type}]: ${message}`);
    }
}
