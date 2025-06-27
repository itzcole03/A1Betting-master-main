import React, { useState, useEffect  } from 'react.ts';
import { UnifiedInput } from './base/UnifiedInput.ts';
import { motion, AnimatePresence } from 'framer-motion.ts';
import { useStore } from '@/stores/useStore.ts';
import {
  FaMoon,
  FaSun,
  FaBell,
  FaDatabase,
  FaKey,
  FaGlobe,
  FaDownload,
  FaTrash,
} from 'react-icons/fa.ts';

interface NotificationSetting {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
}

const Settings: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isCompactView, setIsCompactView] = useState(false);
  const [apiKeys, setApiKeys] = useState({
    sportsRadar: 'zi7atwynSXOAyizHo1L3fR5Yv8mfBX12LccJbCHb',
    theOddsApi: '8684be37505fc5ce63b0337d472af0ee',
  });

  const [notifications, setNotifications] = useState<NotificationSetting[] key={649393}>([
    {
      id: 'live_updates',
      label: 'Live Updates',
      description: 'Receive notifications for odds changes and game updates',
      enabled: true,
    },
    {
      id: 'arbitrage',
      label: 'Arbitrage Alerts',
      description: 'Get notified when profitable arbitrage opportunities arise',
      enabled: true,
    },
    {
      id: 'high_confidence',
      label: 'High Confidence Picks',
      description: 'Notifications for picks with >90% confidence',
      enabled: true,
    },
  ]);

  useEffect(() => {
    // Check system theme preference;

    setIsDarkMode(prefersDark);

    // Apply theme;
    document.documentElement.classList.toggle('dark', prefersDark);
  }, []);

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const handleNotificationToggle = (id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, enabled: !notification.enabled } : notification;
      )
    );
  };

  const handleApiKeyChange = (key: keyof typeof apiKeys, value: string) => {
    setApiKeys(prev => ({ ...prev, [key]: value }));
  };

  const handleExportData = () => {
    const data = {
      settings: {
        isDarkMode,
        isCompactView,
        notifications,
        apiKeys,
      },
      // Add other data to export;
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json',
    });


    a.href = url;
    a.download = 'betpro-settings.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleClearData = () => {
    if (window.confirm('Are you sure you want to clear all data? This cannot be undone.')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className="space-y-6" key={501869}>
      {/* Theme Settings */}
      <motion.div;
        animate={{ opacity: 1, y: 0 }}
        className="glass-morphism p-6 rounded-xl"
        initial={{ opacity: 0, y: 20 }}
       key={501823}>
        <h3 className="text-lg font-semibold mb-4" key={792268}>Display Settings</h3>
        <div className="space-y-4" key={160407}>
          <div className="flex items-center justify-between" key={96335}>
            <div className="flex items-center space-x-2" key={740830}>
              {isDarkMode ? (
                <FaMoon className="w-5 h-5 text-primary-500" / key={522085}>
              ) : (
                <FaSun className="w-5 h-5 text-primary-500" / key={776873}>
              )}
              <span key={595076}>Dark Mode</span>
            </div>
            <button;
              className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 dark:bg-gray-700"
              onClick={handleThemeToggle}
             key={649977}>
              <span;
                className={`${isDarkMode ? 'translate-x-6' : 'translate-x-1'
                  } inline-block h-4 w-4 transform rounded-full bg-white transition`}
              / key={721571}>
            </button>
          </div>
          <div className="flex items-center justify-between" key={96335}>
            <div className="flex items-center space-x-2" key={740830}>
              <FaGlobe className="w-5 h-5 text-primary-500" / key={552677}>
              <span key={595076}>Compact View</span>
            </div>
            <button;
              className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 dark:bg-gray-700"
              onClick={() = key={259028}> setIsCompactView(!isCompactView)}
            >
              <span;
                className={`${isCompactView ? 'translate-x-6' : 'translate-x-1'
                  } inline-block h-4 w-4 transform rounded-full bg-white transition`}
              / key={362918}>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Notification Settings */}
      <motion.div;
        animate={{ opacity: 1, y: 0 }}
        className="glass-morphism p-6 rounded-xl"
        initial={{ opacity: 0, y: 20 }}
        transition={{ delay: 0.2 }}
       key={572647}>
        <h3 className="text-lg font-semibold mb-4 flex items-center" key={729357}>
          <FaBell className="w-5 h-5 mr-2 text-primary-500" / key={970813}>
          Notification Settings;
        </h3>
        <div className="space-y-4" key={160407}>
          {notifications.map(notification => (
            <div key={notification.id} className="flex items-center justify-between" key={973405}>
              <div key={241917}>
                <p className="font-medium" key={787187}>{notification.label}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400" key={316578}>
                  {notification.description}
                </p>
              </div>
              <button;
                className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 dark:bg-gray-700"
                onClick={() = key={487363}> handleNotificationToggle(notification.id)}
              >
                <span;
                  className={`${notification.enabled ? 'translate-x-6' : 'translate-x-1'
                    } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                / key={452007}>
              </button>
            </div>
          ))}
        </div>
      </motion.div>

      {/* API Keys */}
      <motion.div;
        animate={{ opacity: 1, y: 0 }}
        className="glass-morphism p-6 rounded-xl"
        initial={{ opacity: 0, y: 20 }}
        transition={{ delay: 0.4 }}
       key={753910}>
        <h3 className="text-lg font-semibold mb-4 flex items-center" key={729357}>
          <FaKey className="w-5 h-5 mr-2 text-primary-500" / key={26623}>
          API Keys;
        </h3>
        <div className="space-y-4" key={160407}>
          <UnifiedInput;
            label="SportRadar API Key"
            placeholder="Enter API key"
            type="text"
            value={apiKeys.sportsRadar}
            onChange={e = key={269771}> handleApiKeyChange('sportsRadar', e.target.value)}
          />
          <UnifiedInput;
            label="TheOdds API Key"
            placeholder="Enter API key"
            type="text"
            value={apiKeys.theOddsApi}
            onChange={e = key={606869}> handleApiKeyChange('theOddsApi', e.target.value)}
          />
        </div>
      </motion.div>

      {/* Data Management */}
      <motion.div;
        animate={{ opacity: 1, y: 0 }}
        className="glass-morphism p-6 rounded-xl"
        initial={{ opacity: 0, y: 20 }}
        transition={{ delay: 0.6 }}
       key={960330}>
        <h3 className="text-lg font-semibold mb-4 flex items-center" key={729357}>
          <FaDatabase className="w-5 h-5 mr-2 text-primary-500" / key={486915}>
          Data Management;
        </h3>
        <div className="space-y-4" key={160407}>
          <button;
            className="flex items-center space-x-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition"
            onClick={handleExportData}
           key={838540}>
            <FaDownload className="w-4 h-4" / key={964370}>
            <span key={595076}>Export Settings</span>
          </button>
          <button;
            className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            onClick={handleClearData}
           key={836610}>
            <FaTrash className="w-4 h-4" / key={897173}>
            <span key={595076}>Clear All Data</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default React.memo(Settings);
