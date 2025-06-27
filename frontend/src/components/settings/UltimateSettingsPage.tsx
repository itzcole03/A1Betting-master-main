import React, { useState, useEffect  } from 'react.ts';
import { motion } from 'framer-motion.ts';
import {
  Settings,
  User,
  Shield,
  Bell,
  Palette,
  Database,
  Key,
  TrendingUp,
  DollarSign,
  BarChart3,
  Smartphone,
  Globe,
  Download,
  Upload,
  RefreshCw,
  Save,
  AlertTriangle,
  CheckCircle,
  Info,
  Sun,
  Moon,
  Monitor,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Target,
  Zap,
  Volume2,
  VolumeX,
  Wifi,
  WifiOff,
  ToggleLeft,
  ToggleRight,
  Sliders,
  Filter,
  SortDesc,
} from 'lucide-react';
import { useTheme } from '@/providers/SafeThemeProvider';
// Import hook directly to avoid module resolution issues;
import useUltimateSettings from '@/hooks/useUltimateSettings';
// Use direct imports to avoid module resolution issues;
const Card = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div;
    className={`rounded-2xl bg-card text-card-foreground transition-all duration-300 hover:shadow-2xl ${className}`}
    style={{
      background: "rgba(255, 255, 255, 0.04)",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      backdropFilter: "blur(40px) saturate(200%)",
      boxShadow:
        "0 8px 32px rgba(0, 0, 0, 0.15), 0 1px 0 rgba(255, 255, 255, 0.05) inset",
    }}
   key={602860}>
    {children}
  </div>
);

const CardHeader = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={`flex flex-col space-y-2 p-8 ${className}`} key={26714}>{children}</div>
);

const CardTitle = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <h3;
    className={`text-2xl font-bold leading-none tracking-tight ${className}`}
    style={{
      color: "#ffffff",
      letterSpacing: "-0.02em",
      fontSize: "20px",
      fontWeight: "700",
    }}
   key={999605}>
    {children}
  </h3>
);

const CardContent = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => <div className={`p-8 pt-0 ${className}`} key={369220}>{children}</div>;

const Badge = ({
  children,
  className = "",
  variant = "default",
}: {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "success" | "destructive" | "outline" | "secondary";
}) => {
  const variantClasses = {
    default: "bg-primary text-primary-foreground",
    success: "bg-green-500 text-white",
    destructive: "bg-red-500 text-white",
    outline: "border border-input",
    secondary: "bg-secondary text-secondary-foreground",
  };

  return (
    <span;
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${variantClasses[variant]} ${className}`}
     key={372871}>
      {children}
    </span>
  );
};

const Button = ({
  children,
  className = "",
  variant = "default",
  size = "default",
  disabled = false,
  onClick,
  ...props;
}: {
  children: React.ReactNode;
  className?: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
  disabled?: boolean;
  onClick?: () => void;
  [key: string]: any;
}) => {
  const variantClasses = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    destructive:
      "bg-destructive text-destructive-foreground hover:bg-destructive/90",
    outline: "border border-input hover:bg-accent hover:text-accent-foreground",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    link: "underline-offset-4 hover:underline text-primary",
  };

  const sizeClasses = {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3",
    lg: "h-11 rounded-md px-8",
    icon: "h-10 w-10",
  };

  return (
    <button;
      className={`inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      disabled={disabled}
      onClick={onClick}
      {...props}
     key={552497}>
      {children}
    </button>
  );
};
// Create inline theme toggle to avoid import issues;
const SimpleThemeToggle = () => {
  const { isDark, toggleDarkMode, variant: themeVariant } = useTheme();

  return (
    <button;
      onClick={toggleDarkMode}
      className="flex items-center gap-2 px-4 py-2 rounded-lg border transition-all hover:bg-muted"
      style={{
        background: isDark;
          ? "rgba(255, 255, 255, 0.05)"
          : "rgba(255, 255, 255, 0.8)",
        backdropFilter: "blur(20px) saturate(180%)",
        border: `1px solid ${isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(15, 23, 42, 0.1)"}`,
        color: isDark ? "#ffffff" : "#0f172a",
      }}
     key={560229}>
      {isDark ? <Sun className="w-4 h-4" / key={939664}> : <Moon className="w-4 h-4" / key={807662}>}
      <span key={595076}>{isDark ? "Light Mode" : "Dark Mode"}</span>
      <div className="text-xs text-muted-foreground" key={159456}>({themeVariant})</div>
    </button>
  );
};

interface SettingsSection {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  color: string;
}

const settingsSections: SettingsSection[] = [
  {
    id: "account",
    title: "Account & Profile",
    icon: <User className="w-5 h-5" / key={663216}>,
    description: "Personal information, subscription, and account security",
    color: "blue",
  },
  {
    id: "betting",
    title: "Betting Preferences",
    icon: <Target className="w-5 h-5" / key={201057}>,
    description: "Risk profiles, stake sizing, and betting automation",
    color: "green",
  },
  {
    id: "appearance",
    title: "Appearance & Display",
    icon: <Palette className="w-5 h-5" / key={304042}>,
    description: "Theme, layout, currency, and visual preferences",
    color: "purple",
  },
  {
    id: "notifications",
    title: "Notifications & Alerts",
    icon: <Bell className="w-5 h-5" / key={689128}>,
    description: "Customize alerts, emails, and push notifications",
    color: "orange",
  },
  {
    id: "privacy",
    title: "Privacy & Security",
    icon: <Shield className="w-5 h-5" / key={812583}>,
    description: "Data sharing, 2FA, and privacy controls",
    color: "red",
  },
  {
    id: "analytics",
    title: "Analytics & Data",
    icon: <BarChart3 className="w-5 h-5" / key={878433}>,
    description: "Data sources, model preferences, and analytics settings",
    color: "indigo",
  },
  {
    id: "automation",
    title: "Automation & AI",
    icon: <Zap className="w-5 h-5" / key={683575}>,
    description: "Auto-betting, ML recommendations, and smart features",
    color: "cyan",
  },
  {
    id: "system",
    title: "System & Performance",
    icon: <Database className="w-5 h-5" / key={117669}>,
    description: "Cache, performance, API settings, and system health",
    color: "gray",
  },
];

export const UltimateSettingsPage: React.FC = () => {
  const { theme, isDark, toggleDarkMode, variant: themeVariant } = useTheme();
  const {
    settings,
    updateSetting,
    updateSection,
    saveSettings,
    resetSection,
    exportSettings,
    importSettings,
    isLoading,
    hasUnsavedChanges,
  } = useUltimateSettings();

  const [activeSection, setActiveSection] = useState("account");
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleImportSettings = (event: React.ChangeEvent<HTMLInputElement key={553350}>) => {

    if (!file) return;

    reader.onload = (e) => {
      try {


        if (!result.success) {
          // console statement removed
        }
      } catch (error) {
        // console statement removed
      }
    };
    reader.readAsText(file);
  };

  const getSectionColor = (color: string) => {
    const colors = {
      blue: "from-blue-500 to-blue-600",
      green: "from-green-500 to-green-600",
      purple: "from-purple-500 to-purple-600",
      orange: "from-orange-500 to-orange-600",
      red: "from-red-500 to-red-600",
      indigo: "from-indigo-500 to-indigo-600",
      cyan: "from-cyan-500 to-cyan-600",
      gray: "from-gray-500 to-gray-600",
    };
    return colors[color] || colors.blue;
  };

  const renderToggleSwitch = (
    checked: boolean,
    onChange: () => void,
    disabled: boolean = false,
  ) => (
    <button;
      onClick={onChange}
      disabled={disabled}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        checked ? "bg-cyber-primary" : "bg-gray-300 dark:bg-gray-600"
      } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
     key={761675}>
      <span;
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          checked ? "translate-x-6" : "translate-x-1"
        }`}
      / key={770160}>
    </button>
  );

  const renderAccountSection = () => (
    <div className="space-y-6" key={501869}>
      <h3 className="text-xl font-semibold flex items-center gap-2" key={988355}>
        <User className="w-5 h-5 text-blue-500" / key={567876}>
        Account & Profile;
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6" key={151516}>
        {/* Personal Information */}
        <Card className="glass-card" key={851506}>
          <CardHeader key={236869}>
            <CardTitle className="text-lg" key={558245}>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4" key={796196}>
            <div key={241917}>
              <label className="block text-sm font-medium mb-2" key={787449}>
                Full Name;
              </label>
              <input;
                type="text"
                value={settings.account.name}
                onChange={(e) = key={265977}>
                  updateSetting("account", "name", e.target.value)
                }
                className="w-full border rounded-xl bg-background transition-all duration-300 focus:ring-2 focus:ring-cyan-500/50"
                style={{
                  padding: "14px 18px",
                  backgroundColor: "rgba(255, 255, 255, 0.04)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "12px",
                  color: "#ffffff",
                  fontSize: "15px",
                  fontWeight: "500",
                  backdropFilter: "blur(20px) saturate(180%)",
                  boxShadow: "0 4px 16px rgba(0, 0, 0, 0.05)",
                }}
              />
            </div>
            <div key={241917}>
              <label className="block text-sm font-medium mb-2" key={787449}>Email</label>
              <input;
                type="email"
                value={settings.account.email}
                onChange={(e) = key={711492}>
                  updateSetting("account", "email", e.target.value)
                }
                className="w-full border rounded-xl bg-background transition-all duration-300 focus:ring-2 focus:ring-cyan-500/50"
                style={{
                  padding: "14px 18px",
                  backgroundColor: "rgba(255, 255, 255, 0.04)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "12px",
                  color: "#ffffff",
                  fontSize: "15px",
                  fontWeight: "500",
                  backdropFilter: "blur(20px) saturate(180%)",
                  boxShadow: "0 4px 16px rgba(0, 0, 0, 0.05)",
                }}
              />
            </div>
            <div key={241917}>
              <label className="block text-sm font-medium mb-2" key={787449}>Phone</label>
              <input;
                type="tel"
                value={settings.account.phone}
                onChange={(e) = key={55780}>
                  updateSetting("account", "phone", e.target.value)
                }
                className="w-full px-3 py-2 border rounded-lg bg-background"
              />
            </div>
          </CardContent>
        </Card>

        {/* Subscription & Security */}
        <Card className="glass-card" key={851506}>
          <CardHeader key={236869}>
            <CardTitle className="text-lg" key={558245}>Subscription & Security</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4" key={796196}>
            <div className="flex items-center justify-between p-3 bg-gradient-to-r from-green-500/10 to-green-600/10 rounded-lg" key={603081}>
              <div key={241917}>
                <div className="font-medium" key={471146}>Subscription Tier</div>
                <div className="text-sm text-muted-foreground" key={384606}>
                  Premium Plan;
                </div>
              </div>
              <Badge className="bg-green-500 text-white" key={289845}>Active</Badge>
            </div>

            <div className="flex items-center justify-between" key={96335}>
              <div key={241917}>
                <div className="font-medium" key={471146}>Two-Factor Authentication</div>
                <div className="text-sm text-muted-foreground" key={384606}>
                  Enhanced security;
                </div>
              </div>
              {renderToggleSwitch(settings.account.twoFactorEnabled, () =>
                updateSetting(
                  "account",
                  "twoFactorEnabled",
                  !settings.account.twoFactorEnabled,
                ),
              )}
            </div>

            <div key={241917}>
              <label className="block text-sm font-medium mb-2" key={787449}>Timezone</label>
              <select;
                value={settings.account.timezone}
                onChange={(e) = key={486594}>
                  updateSetting("account", "timezone", e.target.value)
                }
                className="w-full px-3 py-2 border rounded-lg bg-background"
              >
                <option value="America/New_York" key={993033}>Eastern Time</option>
                <option value="America/Chicago" key={852814}>Central Time</option>
                <option value="America/Denver" key={32562}>Mountain Time</option>
                <option value="America/Los_Angeles" key={351996}>Pacific Time</option>
                <option value="Europe/London" key={617591}>GMT</option>
              </select>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderBettingSection = () => (
    <div className="space-y-6" key={501869}>
      <h3 className="text-xl font-semibold flex items-center gap-2" key={988355}>
        <Target className="w-5 h-5 text-green-500" / key={940729}>
        Betting Preferences;
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6" key={151516}>
        {/* Risk Management */}
        <Card className="glass-card" key={851506}>
          <CardHeader key={236869}>
            <CardTitle className="text-lg" key={558245}>Risk Management</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4" key={796196}>
            <div key={241917}>
              <label className="block text-sm font-medium mb-2" key={787449}>
                Risk Profile;
              </label>
              <select;
                value={settings.betting.riskProfile}
                onChange={(e) = key={607823}>
                  updateSetting("betting", "riskProfile", e.target.value)
                }
                className="w-full px-3 py-2 border rounded-lg bg-background"
              >
                <option value="conservative" key={170632}>Conservative</option>
                <option value="medium" key={248541}>Medium</option>
                <option value="aggressive" key={736701}>Aggressive</option>
                <option value="custom" key={195892}>Custom</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4" key={354810}>
              <div key={241917}>
                <label className="block text-sm font-medium mb-2" key={787449}>
                  Default Stake ($)
                </label>
                <input;
                  type="number"
                  value={settings.betting.defaultStake}
                  onChange={(e) = key={92263}>
                    updateSetting(
                      "betting",
                      "defaultStake",
                      Number(e.target.value),
                    )
                  }
                  className="w-full px-3 py-2 border rounded-lg bg-background"
                />
              </div>
              <div key={241917}>
                <label className="block text-sm font-medium mb-2" key={787449}>
                  Max Stake ($)
                </label>
                <input;
                  type="number"
                  value={settings.betting.maxStake}
                  onChange={(e) = key={173271}>
                    updateSetting("betting", "maxStake", Number(e.target.value))
                  }
                  className="w-full px-3 py-2 border rounded-lg bg-background"
                />
              </div>
            </div>

            <div key={241917}>
              <label className="block text-sm font-medium mb-2" key={787449}>
                Kelly Multiplier;
              </label>
              <input;
                type="range"
                min="0.1"
                max="1"
                step="0.05"
                value={settings.betting.kellyMultiplier}
                onChange={(e) = key={607044}>
                  updateSetting(
                    "betting",
                    "kellyMultiplier",
                    Number(e.target.value),
                  )
                }
                className="w-full"
              />
              <div className="text-sm text-muted-foreground mt-1" key={344406}>
                Current: {settings.betting.kellyMultiplier}x;
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Automation Settings */}
        <Card className="glass-card" key={851506}>
          <CardHeader key={236869}>
            <CardTitle className="text-lg" key={558245}>Automation & AI</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4" key={796196}>
            <div className="flex items-center justify-between" key={96335}>
              <div key={241917}>
                <div className="font-medium" key={471146}>Follow ML Recommendations</div>
                <div className="text-sm text-muted-foreground" key={384606}>
                  Auto-execute high-confidence bets;
                </div>
              </div>
              {renderToggleSwitch(
                settings.betting.followMLRecommendations,
                () =>
                  updateSetting(
                    "betting",
                    "followMLRecommendations",
                    !settings.betting.followMLRecommendations,
                  ),
              )}
            </div>

            <div className="flex items-center justify-between" key={96335}>
              <div key={241917}>
                <div className="font-medium" key={471146}>Auto Hedging</div>
                <div className="text-sm text-muted-foreground" key={384606}>
                  Automatically hedge profitable positions;
                </div>
              </div>
              {renderToggleSwitch(settings.betting.autoHedging, () =>
                updateSetting(
                  "betting",
                  "autoHedging",
                  !settings.betting.autoHedging,
                ),
              )}
            </div>

            <div key={241917}>
              <label className="block text-sm font-medium mb-2" key={787449}>
                Confidence Threshold;
              </label>
              <input;
                type="range"
                min="0.5"
                max="0.95"
                step="0.05"
                value={settings.betting.confidenceThreshold}
                onChange={(e) = key={882066}>
                  updateSetting(
                    "betting",
                    "confidenceThreshold",
                    Number(e.target.value),
                  )
                }
                className="w-full"
              />
              <div className="text-sm text-muted-foreground mt-1" key={344406}>
                Current:{" "}
                {(settings.betting.confidenceThreshold * 100).toFixed(0)}%
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderAppearanceSection = () => (
    <div className="space-y-6" key={501869}>
      <h3 className="text-xl font-semibold flex items-center gap-2" key={988355}>
        <Palette className="w-5 h-5 text-purple-500" / key={497231}>
        Appearance & Display;
      </h3>

      <Card className="glass-card" key={851506}>
        <CardHeader key={236869}>
          <CardTitle className="text-lg" key={558245}>Theme & Visual Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6" key={853847}>
          {/* Theme Selection */}
          <div key={241917}>
            <label className="block text-sm font-medium mb-3" key={274611}>Theme</label>
            <div className="flex items-center gap-4" key={782146}>
              <SimpleThemeToggle / key={987215}>
              <div className="text-sm text-muted-foreground" key={384606}>
                Current: {themeVariant} ({isDark ? "Dark" : "Light"})
              </div>
            </div>
          </div>

          {/* Display Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6" key={151516}>
            <div className="space-y-4" key={160407}>
              <div className="flex items-center justify-between" key={96335}>
                <div key={241917}>
                  <div className="font-medium" key={471146}>Compact Mode</div>
                  <div className="text-sm text-muted-foreground" key={384606}>
                    Reduce spacing and padding;
                  </div>
                </div>
                {renderToggleSwitch(settings.appearance.compactMode, () =>
                  updateSetting(
                    "appearance",
                    "compactMode",
                    !settings.appearance.compactMode,
                  ),
                )}
              </div>

              <div className="flex items-center justify-between" key={96335}>
                <div key={241917}>
                  <div className="font-medium" key={471146}>Show Animations</div>
                  <div className="text-sm text-muted-foreground" key={384606}>
                    Enable smooth transitions;
                  </div>
                </div>
                {renderToggleSwitch(settings.appearance.showAnimations, () =>
                  updateSetting(
                    "appearance",
                    "showAnimations",
                    !settings.appearance.showAnimations,
                  ),
                )}
              </div>

              <div className="flex items-center justify-between" key={96335}>
                <div key={241917}>
                  <div className="font-medium" key={471146}>High Contrast</div>
                  <div className="text-sm text-muted-foreground" key={384606}>
                    Improve accessibility;
                  </div>
                </div>
                {renderToggleSwitch(settings.appearance.highContrast, () =>
                  updateSetting(
                    "appearance",
                    "highContrast",
                    !settings.appearance.highContrast,
                  ),
                )}
              </div>
            </div>

            <div className="space-y-4" key={160407}>
              <div key={241917}>
                <label className="block text-sm font-medium mb-2" key={787449}>
                  Odds Format;
                </label>
                <select;
                  value={settings.appearance.oddsFormat}
                  onChange={(e) = key={687878}>
                    updateSetting("appearance", "oddsFormat", e.target.value)
                  }
                  className="w-full px-3 py-2 border rounded-lg bg-background"
                >
                  <option value="decimal" key={481045}>Decimal (1.85)</option>
                  <option value="american" key={503967}>American (+110)</option>
                  <option value="fractional" key={91740}>Fractional (17/20)</option>
                </select>
              </div>

              <div key={241917}>
                <label className="block text-sm font-medium mb-2" key={787449}>
                  Chart Style;
                </label>
                <select;
                  value={settings.appearance.chartStyle}
                  onChange={(e) = key={716494}>
                    updateSetting("appearance", "chartStyle", e.target.value)
                  }
                  className="w-full px-3 py-2 border rounded-lg bg-background"
                >
                  <option value="modern" key={452932}>Modern</option>
                  <option value="classic" key={858313}>Classic</option>
                  <option value="minimal" key={692132}>Minimal</option>
                </select>
              </div>

              <div key={241917}>
                <label className="block text-sm font-medium mb-2" key={787449}>
                  Currency;
                </label>
                <select;
                  value={settings.account.currency}
                  onChange={(e) = key={359452}>
                    updateSetting("account", "currency", e.target.value)
                  }
                  className="w-full px-3 py-2 border rounded-lg bg-background"
                >
                  <option value="USD" key={42064}>USD ($)</option>
                  <option value="EUR" key={973543}>EUR (€)</option>
                  <option value="GBP" key={681888}>GBP (£)</option>
                  <option value="CAD" key={946387}>CAD (C$)</option>
                </select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderNotificationsSection = () => (
    <div className="space-y-6" key={501869}>
      <h3 className="text-xl font-semibold flex items-center gap-2" key={988355}>
        <Bell className="w-5 h-5 text-orange-500" / key={958098}>
        Notifications & Alerts;
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6" key={151516}>
        <Card className="glass-card" key={851506}>
          <CardHeader key={236869}>
            <CardTitle className="text-lg" key={558245}>Alert Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4" key={796196}>
            <div className="flex items-center justify-between" key={96335}>
              <div key={241917}>
                <div className="font-medium" key={471146}>Bet Alerts</div>
                <div className="text-sm text-muted-foreground" key={384606}>
                  Notifications when bets are settled;
                </div>
              </div>
              {renderToggleSwitch(settings.notifications.betAlerts, () =>
                updateSetting(
                  "notifications",
                  "betAlerts",
                  !settings.notifications.betAlerts,
                ),
              )}
            </div>

            <div className="flex items-center justify-between" key={96335}>
              <div key={241917}>
                <div className="font-medium" key={471146}>Price Changes</div>
                <div className="text-sm text-muted-foreground" key={384606}>
                  Alert when odds move significantly;
                </div>
              </div>
              {renderToggleSwitch(settings.notifications.priceChanges, () =>
                updateSetting(
                  "notifications",
                  "priceChanges",
                  !settings.notifications.priceChanges,
                ),
              )}
            </div>

            <div className="flex items-center justify-between" key={96335}>
              <div key={241917}>
                <div className="font-medium" key={471146}>Daily Reports</div>
                <div className="text-sm text-muted-foreground" key={384606}>
                  Daily performance summaries;
                </div>
              </div>
              {renderToggleSwitch(settings.notifications.dailyReports, () =>
                updateSetting(
                  "notifications",
                  "dailyReports",
                  !settings.notifications.dailyReports,
                ),
              )}
            </div>

            <div className="flex items-center justify-between" key={96335}>
              <div key={241917}>
                <div className="font-medium" key={471146}>Sound Enabled</div>
                <div className="text-sm text-muted-foreground" key={384606}>
                  Audio notifications;
                </div>
              </div>
              {renderToggleSwitch(settings.notifications.soundEnabled, () =>
                updateSetting(
                  "notifications",
                  "soundEnabled",
                  !settings.notifications.soundEnabled,
                ),
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card" key={851506}>
          <CardHeader key={236869}>
            <CardTitle className="text-lg" key={558245}>Delivery Methods</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4" key={796196}>
            <div className="flex items-center justify-between" key={96335}>
              <div key={241917}>
                <div className="font-medium" key={471146}>Email Notifications</div>
                <div className="text-sm text-muted-foreground" key={384606}>
                  Send alerts to email;
                </div>
              </div>
              {renderToggleSwitch(
                settings.notifications.emailNotifications,
                () =>
                  updateSetting(
                    "notifications",
                    "emailNotifications",
                    !settings.notifications.emailNotifications,
                  ),
              )}
            </div>

            <div className="flex items-center justify-between" key={96335}>
              <div key={241917}>
                <div className="font-medium" key={471146}>Push Notifications</div>
                <div className="text-sm text-muted-foreground" key={384606}>
                  Browser/mobile push alerts;
                </div>
              </div>
              {renderToggleSwitch(
                settings.notifications.pushNotifications,
                () =>
                  updateSetting(
                    "notifications",
                    "pushNotifications",
                    !settings.notifications.pushNotifications,
                  ),
              )}
            </div>

            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg" key={633132}>
              <div className="flex items-center gap-2 mb-2" key={988706}>
                <Moon className="w-4 h-4 text-blue-600" / key={471383}>
                <span className="font-medium" key={514486}>Quiet Hours</span>
                {renderToggleSwitch(
                  settings.notifications.quietHours.enabled,
                  () =>
                    updateSetting("notifications", "quietHours", {
                      ...settings.notifications.quietHours,
                      enabled: !settings.notifications.quietHours.enabled,
                    }),
                )}
              </div>
              {settings.notifications.quietHours.enabled && (
                <div className="grid grid-cols-2 gap-2 mt-2" key={606552}>
                  <input;
                    type="time"
                    value={settings.notifications.quietHours.start}
                    onChange={(e) = key={136325}>
                      updateSetting("notifications", "quietHours", {
                        ...settings.notifications.quietHours,
                        start: e.target.value,
                      })
                    }
                    className="px-2 py-1 text-sm border rounded bg-background"
                  />
                  <input;
                    type="time"
                    value={settings.notifications.quietHours.end}
                    onChange={(e) = key={474900}>
                      updateSetting("notifications", "quietHours", {
                        ...settings.notifications.quietHours,
                        end: e.target.value,
                      })
                    }
                    className="px-2 py-1 text-sm border rounded bg-background"
                  />
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderPrivacySection = () => (
    <div className="space-y-6" key={501869}>
      <h3 className="text-xl font-semibold flex items-center gap-2" key={988355}>
        <Shield className="w-5 h-5 text-red-500" / key={322406}>
        Privacy & Security;
      </h3>

      <Card className="glass-card" key={851506}>
        <CardHeader key={236869}>
          <CardTitle className="text-lg" key={558245}>Privacy Controls</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4" key={796196}>
          <div className="flex items-center justify-between" key={96335}>
            <div key={241917}>
              <div className="font-medium" key={471146}>Share Statistics</div>
              <div className="text-sm text-muted-foreground" key={384606}>
                Allow others to see your betting stats;
              </div>
            </div>
            {renderToggleSwitch(settings.privacy.shareStats, () =>
              updateSetting(
                "privacy",
                "shareStats",
                !settings.privacy.shareStats,
              ),
            )}
          </div>

          <div className="flex items-center justify-between" key={96335}>
            <div key={241917}>
              <div className="font-medium" key={471146}>Public Profile</div>
              <div className="text-sm text-muted-foreground" key={384606}>
                Make your profile visible to others;
              </div>
            </div>
            {renderToggleSwitch(settings.privacy.publicProfile, () =>
              updateSetting(
                "privacy",
                "publicProfile",
                !settings.privacy.publicProfile,
              ),
            )}
          </div>

          <div className="flex items-center justify-between" key={96335}>
            <div key={241917}>
              <div className="font-medium" key={471146}>Analytics Opt-in</div>
              <div className="text-sm text-muted-foreground" key={384606}>
                Help improve the platform with usage data;
              </div>
            </div>
            {renderToggleSwitch(settings.privacy.analyticsOptIn, () =>
              updateSetting(
                "privacy",
                "analyticsOptIn",
                !settings.privacy.analyticsOptIn,
              ),
            )}
          </div>

          <div key={241917}>
            <label className="block text-sm font-medium mb-2" key={787449}>
              Session Timeout (minutes)
            </label>
            <input;
              type="number"
              min="30"
              max="480"
              value={settings.privacy.sessionTimeout}
              onChange={(e) = key={697221}>
                updateSetting(
                  "privacy",
                  "sessionTimeout",
                  Number(e.target.value),
                )
              }
              className="w-full px-3 py-2 border rounded-lg bg-background"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderAnalyticsSection = () => (
    <div className="space-y-6" key={501869}>
      <h3 className="text-xl font-semibold flex items-center gap-2" key={988355}>
        <BarChart3 className="w-5 h-5 text-indigo-500" / key={688247}>
        Analytics & Data;
      </h3>

      <Card className="glass-card" key={851506}>
        <CardHeader key={236869}>
          <CardTitle className="text-lg" key={558245}>Data Sources & Performance</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4" key={796196}>
          <div key={241917}>
            <label className="block text-sm font-medium mb-2" key={787449}>
              Enabled Data Sources;
            </label>
            <div className="space-y-2" key={725977}>
              {[
                "ESPN",
                "SportsRadar",
                "PrizePicks",
                "DraftKings",
                "FanDuel",
              ].map((source) => (
                <div key={source} className="flex items-center justify-between" key={920326}>
                  <span className="text-sm" key={887361}>{source}</span>
                  {renderToggleSwitch(
                    settings.analytics.enabledSources.includes(
                      source.toLowerCase(),
                    ),
                    () => {


                      const newSources = current.includes(sourceLower)
                        ? current.filter((s) => s !== sourceLower)
                        : [...current, sourceLower];
                      updateSetting("analytics", "enabledSources", newSources);
                    },
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4" key={354810}>
            <div key={241917}>
              <label className="block text-sm font-medium mb-2" key={787449}>
                Refresh Interval (sec)
              </label>
              <input;
                type="number"
                min="60"
                max="3600"
                value={settings.analytics.refreshInterval}
                onChange={(e) = key={923014}>
                  updateSetting(
                    "analytics",
                    "refreshInterval",
                    Number(e.target.value),
                  )
                }
                className="w-full px-3 py-2 border rounded-lg bg-background"
              />
            </div>
            <div key={241917}>
              <label className="block text-sm font-medium mb-2" key={787449}>
                Cache Duration (sec)
              </label>
              <input;
                type="number"
                min="300"
                max="86400"
                value={settings.analytics.cacheDuration}
                onChange={(e) = key={479864}>
                  updateSetting(
                    "analytics",
                    "cacheDuration",
                    Number(e.target.value),
                  )
                }
                className="w-full px-3 py-2 border rounded-lg bg-background"
              />
            </div>
          </div>

          <div className="flex items-center justify-between" key={96335}>
            <div key={241917}>
              <div className="font-medium" key={471146}>Cache Enabled</div>
              <div className="text-sm text-muted-foreground" key={384606}>
                Improve performance with local caching;
              </div>
            </div>
            {renderToggleSwitch(settings.analytics.cacheEnabled, () =>
              updateSetting(
                "analytics",
                "cacheEnabled",
                !settings.analytics.cacheEnabled,
              ),
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderSystemSection = () => (
    <div className="space-y-6" key={501869}>
      <h3 className="text-xl font-semibold flex items-center gap-2" key={988355}>
        <Database className="w-5 h-5 text-gray-500" / key={487970}>
        System & Performance;
      </h3>

      <Card className="glass-card" key={851506}>
        <CardHeader key={236869}>
          <CardTitle className="text-lg" key={558245}>Performance & System Health</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4" key={796196}>
          <div key={241917}>
            <label className="block text-sm font-medium mb-2" key={787449}>
              Performance Mode;
            </label>
            <select;
              value={settings.system.performanceMode}
              onChange={(e) = key={498535}>
                updateSetting("system", "performanceMode", e.target.value)
              }
              className="w-full px-3 py-2 border rounded-lg bg-background"
            >
              <option value="performance" key={712462}>High Performance</option>
              <option value="balanced" key={586397}>Balanced</option>
              <option value="power-saver" key={987151}>Power Saver</option>
            </select>
          </div>

          <div className="flex items-center justify-between" key={96335}>
            <div key={241917}>
              <div className="font-medium" key={471146}>Auto Updates</div>
              <div className="text-sm text-muted-foreground" key={384606}>
                Automatically install updates;
              </div>
            </div>
            {renderToggleSwitch(settings.system.autoUpdate, () =>
              updateSetting(
                "system",
                "autoUpdate",
                !settings.system.autoUpdate,
              ),
            )}
          </div>

          <div className="flex items-center justify-between" key={96335}>
            <div key={241917}>
              <div className="font-medium" key={471146}>Debug Mode</div>
              <div className="text-sm text-muted-foreground" key={384606}>
                Enable detailed logging;
              </div>
            </div>
            {renderToggleSwitch(settings.system.debugMode, () =>
              updateSetting("system", "debugMode", !settings.system.debugMode),
            )}
          </div>

          {showAdvanced && (
            <div className="space-y-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg" key={856152}>
              <h4 className="font-medium text-orange-600" key={38297}>
                Advanced System Settings;
              </h4>

              <div key={241917}>
                <label className="block text-sm font-medium mb-2" key={787449}>
                  Log Level;
                </label>
                <select;
                  value={settings.system.logLevel}
                  onChange={(e) = key={398326}>
                    updateSetting("system", "logLevel", e.target.value)
                  }
                  className="w-full px-3 py-2 border rounded-lg bg-background"
                >
                  <option value="error" key={586637}>Error Only</option>
                  <option value="warn" key={968797}>Warnings</option>
                  <option value="info" key={51209}>Info</option>
                  <option value="debug" key={263652}>Debug</option>
                </select>
              </div>

              <div key={241917}>
                <label className="block text-sm font-medium mb-2" key={787449}>
                  Max Log Size (MB)
                </label>
                <input;
                  type="number"
                  min="10"
                  max="500"
                  value={settings.system.maxLogSize}
                  onChange={(e) = key={691862}>
                    updateSetting(
                      "system",
                      "maxLogSize",
                      Number(e.target.value),
                    )
                  }
                  className="w-full px-3 py-2 border rounded-lg bg-background"
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );

  const renderSectionContent = () => {
    switch (activeSection) {
      case "account":
        return renderAccountSection();
      case "betting":
        return renderBettingSection();
      case "appearance":
        return renderAppearanceSection();
      case "notifications":
        return renderNotificationsSection();
      case "privacy":
        return renderPrivacySection();
      case "analytics":
        return renderAnalyticsSection();
      case "system":
        return renderSystemSection();
      default:
        return renderAccountSection();
    }
  };

  return (
    <div className="min-h-screen bg-background" key={522528}>
      {/* Header */}
      <motion.div;
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border"
       key={491899}>
        <div className="container mx-auto px-6 py-4" key={704326}>
          <div className="flex items-center justify-between" key={96335}>
            <div className="flex items-center gap-3" key={443099}>
              <div className="p-2 rounded-lg bg-gradient-to-r from-cyber-primary to-cyber-secondary" key={822670}>
                <Settings className="w-6 h-6 text-black" / key={918611}>
              </div>
              <div key={241917}>
                <h1 className="text-2xl font-bold" key={199849}>Ultimate Settings</h1>
                <p className="text-muted-foreground" key={402625}>
                  Customize your A1Betting experience;
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3" key={443099}>
              <Button;
                variant="outline"
                size="sm"
                onClick={() = key={40543}> setShowAdvanced(!showAdvanced)}
                className="flex items-center gap-2"
              >
                <Sliders className="w-4 h-4" / key={225951}>
                {showAdvanced ? "Basic" : "Advanced"}
              </Button>

              <Button;
                variant="outline"
                size="sm"
                onClick={exportSettings}
                className="flex items-center gap-2"
               key={7894}>
                <Download className="w-4 h-4" / key={222723}>
                Export;
              </Button>

              <label className="relative cursor-pointer" key={291197}>
                <input;
                  type="file"
                  accept=".json"
                  onChange={handleImportSettings}
                  className="sr-only"
                / key={6613}>
                <Button;
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                  type="button"
                 key={890053}>
                  <Upload className="w-4 h-4" / key={431300}>
                  Import;
                </Button>
              </label>

              <Button;
                onClick={saveSettings}
                disabled={!hasUnsavedChanges || isLoading}
                className="flex items-center gap-2 bg-gradient-to-r from-cyber-primary to-cyber-secondary text-black font-medium"
               key={812478}>
                {isLoading ? (
                  <RefreshCw className="w-4 h-4 animate-spin" / key={971972}>
                ) : (
                  <Save className="w-4 h-4" / key={872632}>
                )}
                Save Changes;
              </Button>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="container mx-auto px-6 py-8" key={527852}>
        <div className="flex gap-8" key={900594}>
          {/* Sidebar Navigation */}
          <div className="w-80 flex-shrink-0" key={78809}>
            <div className="sticky top-32" key={343944}>
              <nav className="space-y-2" key={533789}>
                {settingsSections.map((section) => (
                  <button;
                    key={section.id}
                    onClick={() = key={320690}> setActiveSection(section.id)}
                    className={`w-full text-left p-4 rounded-lg transition-all duration-200 ${
                      activeSection === section.id;
                        ? `bg-gradient-to-r ${getSectionColor(section.color)} text-white shadow-lg`
                        : "hover:bg-muted"
                    }`}
                  >
                    <div className="flex items-center gap-3" key={443099}>
                      {section.icon}
                      <div key={241917}>
                        <div className="font-medium" key={471146}>{section.title}</div>
                        <div;
                          className={`text-sm ${
                            activeSection === section.id;
                              ? "text-white/80"
                              : "text-muted-foreground"
                          }`}
                         key={941632}>
                          {section.description}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0" key={704093}>
            <motion.div;
              key={activeSection}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
             key={697825}>
              {renderSectionContent()}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Changes Indicator */}
      {hasUnsavedChanges && (
        <motion.div;
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-6 right-6 bg-amber-500 text-black px-4 py-2 rounded-lg shadow-lg flex items-center gap-2"
         key={511019}>
          <AlertTriangle className="w-4 h-4" / key={138590}>
          You have unsaved changes;
        </motion.div>
      )}
    </div>
  );
};

export default UltimateSettingsPage;