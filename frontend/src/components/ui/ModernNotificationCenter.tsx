import React, { useState  } from 'react.ts';
import { motion, AnimatePresence } from 'framer-motion.ts';
import {
  Bell,
  X,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Info,
  DollarSign,
  Activity,
  Clock,
  Star,
  Trash2,
  MoreHorizontal,
} from 'lucide-react.ts';

interface Notification {
  id: string;
  type: "success" | "warning" | "error" | "info" | "betting";
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  priority: "low" | "medium" | "high";
  action?: {
    label: string;
    onClick: () => void;
  };
  metadata?: {
    amount?: number;
    odds?: number;
    game?: string;
  };
}

interface ModernNotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
  notifications?: Notification[];
  onMarkAsRead?: (id: string) => void;
  onDelete?: (id: string) => void;
  onClearAll?: () => void;
}

const defaultNotifications: Notification[] = [
  {
    id: "1",
    type: "betting",
    title: "High Value Opportunity Detected",
    message: "Lakers vs Warriors - Over 235.5 points has 89% confidence",
    timestamp: new Date(Date.now() - 2 * 60 * 1000),
    read: false,
    priority: "high",
    metadata: {
      odds: 1.85,
      game: "Lakers vs Warriors",
    },
    action: {
      label: "View Bet",
      onClick: () => // console statement removed,
    },
  },
  {
    id: "2",
    type: "success",
    title: "Bet Won!",
    message: "Your bet on Celtics -5.5 won! +$247.50 added to balance.",
    timestamp: new Date(Date.now() - 15 * 60 * 1000),
    read: false,
    priority: "medium",
    metadata: {
      amount: 247.5,
    },
    action: {
      label: "View Details",
      onClick: () => // console statement removed,
    },
  },
  {
    id: "3",
    type: "info",
    title: "Model Update",
    message: "NBA prediction model updated with new player injury data",
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
    read: true,
    priority: "low",
  },
  {
    id: "4",
    type: "warning",
    title: "Bankroll Alert",
    message: "You've used 75% of your daily betting limit",
    timestamp: new Date(Date.now() - 45 * 60 * 1000),
    read: false,
    priority: "medium",
  },
];

const getNotificationIcon = (type: Notification["type"]) => {
  switch (type) {
    case "success":
      return <CheckCircle size={16} className="text-green-400" / key={105820}>;
    case "warning":
      return <AlertTriangle size={16} className="text-yellow-400" / key={704543}>;
    case "error":
      return <X size={16} className="text-red-400" / key={2360}>;
    case "betting":
      return <TrendingUp size={16} className="text-blue-400" / key={458054}>;
    default:
      return <Info size={16} className="text-gray-400" / key={714485}>;
  }
};

const getNotificationColor = (type: Notification["type"]) => {
  switch (type) {
    case "success":
      return "border-l-green-400 bg-green-500/5";
    case "warning":
      return "border-l-yellow-400 bg-yellow-500/5";
    case "error":
      return "border-l-red-400 bg-red-500/5";
    case "betting":
      return "border-l-blue-400 bg-blue-500/5";
    default:
      return "border-l-gray-400 bg-gray-500/5";
  }
};

const getPriorityIndicator = (priority: Notification["priority"]) => {
  switch (priority) {
    case "high":
      return <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" / key={460724}>;
    case "medium":
      return <div className="w-2 h-2 bg-yellow-400 rounded-full" / key={209834}>;
    default:
      return <div className="w-2 h-2 bg-gray-500 rounded-full" / key={837826}>;
  }
};

const formatTimestamp = (timestamp: Date) => {





  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
};

export const ModernNotificationCenter: React.FC<
  ModernNotificationCenterProps;
> = ({
  isOpen,
  onClose,
  notifications = defaultNotifications,
  onMarkAsRead,
  onDelete,
  onClearAll,
}) => {
  const [selectedNotification, setSelectedNotification] = useState<
    string | null;
  >(null);

  const sortedNotifications = [...notifications].sort(
    (a, b) => b.timestamp.getTime() - a.timestamp.getTime(),
  );

  if (!isOpen) return null;

  return (
    <AnimatePresence key={359944}>
      <motion.div;
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50"
        onClick={onClose}
       key={364953}>
        <motion.div;
          initial={{ opacity: 0, x: 400 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 400 }}
          className="absolute right-0 top-0 h-full w-full max-w-md bg-gray-900/95 backdrop-blur-xl border-l border-gray-700/50 shadow-2xl"
          onClick={(e) = key={519186}> e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-700/50" key={669253}>
            <div className="flex items-center space-x-3" key={602729}>
              <Bell size={20} className="text-gray-400" / key={809824}>
              <h2 className="text-lg font-semibold text-white" key={480781}>
                Notifications;
              </h2>
              {unreadCount > 0 && (
                <span className="px-2 py-1 bg-blue-600 text-white text-xs rounded-full" key={958610}>
                  {unreadCount}
                </span>
              )}
            </div>
            <div className="flex items-center space-x-2" key={740830}>
              {notifications.length > 0 && (
                <button;
                  onClick={onClearAll}
                  className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
                  title="Clear all"
                 key={267317}>
                  <Trash2 size={16} / key={773816}>
                </button>
              )}
              <button;
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
               key={736349}>
                <X size={16} / key={185282}>
              </button>
            </div>
          </div>

          {/* Notifications List */}
          <div className="flex-1 overflow-y-auto" key={726436}>
            {notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-gray-500" key={264319}>
                <Bell size={32} className="mb-4 opacity-50" / key={442979}>
                <p className="text-lg font-medium" key={774542}>No notifications</p>
                <p className="text-sm" key={364551}>You're all caught up!</p>
              </div>
            ) : (
              <div className="space-y-1 p-4" key={143956}>
                {sortedNotifications.map((notification, index) => (
                  <motion.div;
                    key={notification.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`
                      group relative p-4 rounded-xl border-l-4 cursor-pointer transition-all;
                      ${getNotificationColor(notification.type)}
                      ${notification.read ? "opacity-70" : ""}
                      ${selectedNotification === notification.id ? "bg-gray-800/50" : "hover:bg-gray-800/30"}
                    `}
                    onClick={() = key={271834}> {
                      setSelectedNotification(notification.id);
                      if (!notification.read && onMarkAsRead) {
                        onMarkAsRead(notification.id);
                      }
                    }}
                  >
                    <div className="flex items-start space-x-3" key={717969}>
                      <div className="flex-shrink-0 pt-1" key={209048}>
                        {getNotificationIcon(notification.type)}
                      </div>

                      <div className="flex-1 min-w-0" key={704093}>
                        <div className="flex items-start justify-between" key={653478}>
                          <div className="flex items-center space-x-2" key={740830}>
                            <h4 className="text-sm font-medium text-white truncate" key={22680}>
                              {notification.title}
                            </h4>
                            {!notification.read && (
                              <div className="w-2 h-2 bg-blue-400 rounded-full flex-shrink-0" / key={89483}>
                            )}
                          </div>
                          <div className="flex items-center space-x-2 ml-2" key={677920}>
                            {getPriorityIndicator(notification.priority)}
                            <button;
                              onClick={(e) = key={434070}> {
                                e.stopPropagation();
                                onDelete?.(notification.id);
                              }}
                              className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-red-400 transition-all"
                            >
                              <X size={12} / key={781788}>
                            </button>
                          </div>
                        </div>

                        <p className="mt-1 text-sm text-gray-300 line-clamp-2" key={419742}>
                          {notification.message}
                        </p>

                        {/* Metadata */}
                        {notification.metadata && (
                          <div className="mt-2 flex items-center space-x-4 text-xs" key={32360}>
                            {notification.metadata.amount && (
                              <div className="flex items-center space-x-1 text-green-400" key={184688}>
                                <DollarSign size={12} / key={753878}>
                                <span key={595076}>+${notification.metadata.amount}</span>
                              </div>
                            )}
                            {notification.metadata.odds && (
                              <div className="flex items-center space-x-1 text-blue-400" key={613800}>
                                <Star size={12} / key={589636}>
                                <span key={595076}>{notification.metadata.odds}</span>
                              </div>
                            )}
                            {notification.metadata.game && (
                              <div className="flex items-center space-x-1 text-gray-400" key={430425}>
                                <Activity size={12} / key={430183}>
                                <span key={595076}>{notification.metadata.game}</span>
                              </div>
                            )}
                          </div>
                        )}

                        <div className="mt-3 flex items-center justify-between" key={124585}>
                          <div className="flex items-center space-x-1 text-xs text-gray-500" key={646958}>
                            <Clock size={12} / key={533564}>
                            <span key={595076}>
                              {formatTimestamp(notification.timestamp)}
                            </span>
                          </div>

                          {notification.action && (
                            <button;
                              onClick={(e) = key={434070}> {
                                e.stopPropagation();
                                notification.action!.onClick();
                              }}
                              className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded-lg transition-colors"
                            >
                              {notification.action.label}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-700/50" key={632746}>
            <div className="flex items-center justify-between text-xs text-gray-500" key={936167}>
              <span key={595076}>{notifications.length} total notifications</span>
              {unreadCount > 0 && (
                <button;
                  onClick={() = key={887064}> {
                    notifications.forEach((n) => {
                      if (!n.read && onMarkAsRead) {
                        onMarkAsRead(n.id);
                      }
                    });
                  }}
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Mark all as read;
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ModernNotificationCenter;
