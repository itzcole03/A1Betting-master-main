import React, { useState  } from 'react.ts';
import { motion } from 'framer-motion.ts';
import { Settings, Bell, Shield, Palette, Database, Key } from 'lucide-react.ts';
import { Card, CardContent, CardHeader, CardTitle } from '@/ui/card.ts';
import { Badge } from '@/ui/badge.ts';

export const UnifiedSettingsInterface: React.FC = () => {
  const [isImporting, setIsImporting] = useState(false);
  const [settings, setSettings] = useState({
    notifications: {
      betAlerts: true,
      priceChanges: true,
      dailyReports: false,
      promotions: true,
    },
    privacy: {
      shareStats: false,
      publicProfile: false,
      dataCollection: true,
    },
    trading: {
      riskLevel: "medium",
      maxBetAmount: 500,
      autoHedging: false,
      followMLRecommendations: true,
    },
    display: {
      theme: "dark",
      currency: "USD",
      timezone: "America/New_York",
      decimalOdds: true,
    },
  });

  const handleToggle = (section: keyof typeof settings, key: string) => {
    setSettings((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: !prev[section][key],
      },
    }));
  };

  const handleSelect = (
    section: keyof typeof settings,
    key: string,
    value: any,
  ) => {
    setSettings((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));
  };

  return (
    <div className="space-y-6" key={501869}>
      {/* Header */}
      <motion.div;
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
       key={951381}>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent" key={11526}>
          ⚙️ Settings & Preferences;
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2" key={616181}>
          Customize your betting experience and account preferences;
        </p>
      </motion.div>

      {/* Notifications */}
      <Card className="glass-card" key={851506}>
        <CardHeader key={236869}>
          <CardTitle className="flex items-center gap-2" key={587456}>
            <Bell className="w-5 h-5 text-blue-500" / key={211316}>
            Notifications;
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4" key={796196}>
          <div className="flex items-center justify-between" key={96335}>
            <div key={241917}>
              <div className="font-medium" key={471146}>Bet Alerts</div>
              <div className="text-sm text-gray-500" key={826371}>
                Get notified when your bets are settled;
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer" key={742813}>
              <input;
                type="checkbox"
                checked={settings.notifications.betAlerts}
                onChange={() = key={299200}> handleToggle("notifications", "betAlerts")}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" key={734788}></div>
            </label>
          </div>

          <div className="flex items-center justify-between" key={96335}>
            <div key={241917}>
              <div className="font-medium" key={471146}>Price Changes</div>
              <div className="text-sm text-gray-500" key={826371}>
                Alert when odds move significantly;
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer" key={742813}>
              <input;
                type="checkbox"
                checked={settings.notifications.priceChanges}
                onChange={() = key={469310}> handleToggle("notifications", "priceChanges")}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" key={734788}></div>
            </label>
          </div>

          <div className="flex items-center justify-between" key={96335}>
            <div key={241917}>
              <div className="font-medium" key={471146}>Daily Reports</div>
              <div className="text-sm text-gray-500" key={826371}>
                Receive daily performance summaries;
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer" key={742813}>
              <input;
                type="checkbox"
                checked={settings.notifications.dailyReports}
                onChange={() = key={416819}> handleToggle("notifications", "dailyReports")}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" key={734788}></div>
            </label>
          </div>
        </CardContent>
      </Card>

      {/* Privacy & Security */}
      <Card className="glass-card" key={851506}>
        <CardHeader key={236869}>
          <CardTitle className="flex items-center gap-2" key={587456}>
            <Shield className="w-5 h-5 text-green-500" / key={178785}>
            Privacy & Security;
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4" key={796196}>
          <div className="flex items-center justify-between" key={96335}>
            <div key={241917}>
              <div className="font-medium" key={471146}>Share Statistics</div>
              <div className="text-sm text-gray-500" key={826371}>
                Allow others to see your betting stats;
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer" key={742813}>
              <input;
                type="checkbox"
                checked={settings.privacy.shareStats}
                onChange={() = key={882848}> handleToggle("privacy", "shareStats")}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" key={734788}></div>
            </label>
          </div>

          <div className="flex items-center justify-between" key={96335}>
            <div key={241917}>
              <div className="font-medium" key={471146}>Public Profile</div>
              <div className="text-sm text-gray-500" key={826371}>
                Make your profile visible to other users;
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer" key={742813}>
              <input;
                type="checkbox"
                checked={settings.privacy.publicProfile}
                onChange={() = key={560672}> handleToggle("privacy", "publicProfile")}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" key={734788}></div>
            </label>
          </div>

          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg" key={633132}>
            <div className="flex items-center gap-2 mb-2" key={988706}>
              <Key className="w-4 h-4 text-blue-600" / key={900248}>
              <span className="font-medium text-blue-800 dark:text-blue-200" key={217378}>
                Two-Factor Authentication;
              </span>
              <Badge variant="success" key={925752}>Enabled</Badge>
            </div>
            <p className="text-sm text-blue-600 dark:text-blue-400" key={20057}>
              Your account is protected with 2FA. You can manage this in your;
              account security settings.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Trading Preferences */}
      <Card className="glass-card" key={851506}>
        <CardHeader key={236869}>
          <CardTitle className="flex items-center gap-2" key={587456}>
            <Database className="w-5 h-5 text-purple-500" / key={758142}>
            Trading Preferences;
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4" key={796196}>
          <div className="flex items-center justify-between" key={96335}>
            <div key={241917}>
              <div className="font-medium" key={471146}>Risk Level</div>
              <div className="text-sm text-gray-500" key={826371}>
                Default risk tolerance for recommendations;
              </div>
            </div>
            <select;
              value={settings.trading.riskLevel}
              onChange={(e) = key={661820}>
                handleSelect("trading", "riskLevel", e.target.value)
              }
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
            >
              <option value="low" key={209001}>Low</option>
              <option value="medium" key={248541}>Medium</option>
              <option value="high" key={228722}>High</option>
            </select>
          </div>

          <div className="flex items-center justify-between" key={96335}>
            <div key={241917}>
              <div className="font-medium" key={471146}>Max Bet Amount</div>
              <div className="text-sm text-gray-500" key={826371}>
                Maximum amount for a single bet;
              </div>
            </div>
            <input;
              type="number"
              value={settings.trading.maxBetAmount}
              onChange={(e) = key={769340}>
                handleSelect("trading", "maxBetAmount", Number(e.target.value))
              }
              className="w-24 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
            />
          </div>

          <div className="flex items-center justify-between" key={96335}>
            <div key={241917}>
              <div className="font-medium" key={471146}>Follow ML Recommendations</div>
              <div className="text-sm text-gray-500" key={826371}>
                Auto-execute high-confidence ML predictions;
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer" key={742813}>
              <input;
                type="checkbox"
                checked={settings.trading.followMLRecommendations}
                onChange={() = key={559032}>
                  handleToggle("trading", "followMLRecommendations")
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" key={734788}></div>
            </label>
          </div>
        </CardContent>
      </Card>

      {/* Display Preferences */}
      <Card className="glass-card" key={851506}>
        <CardHeader key={236869}>
          <CardTitle className="flex items-center gap-2" key={587456}>
            <Palette className="w-5 h-5 text-orange-500" / key={161186}>
            Display Preferences;
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4" key={796196}>
          <div className="flex items-center justify-between" key={96335}>
            <div key={241917}>
              <div className="font-medium" key={471146}>Theme</div>
              <div className="text-sm text-gray-500" key={826371}>
                Choose your preferred color scheme;
              </div>
            </div>
            <select;
              value={settings.display.theme}
              onChange={(e) = key={58129}> handleSelect("display", "theme", e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
            >
              <option value="light" key={952149}>Light</option>
              <option value="dark" key={884357}>Dark</option>
              <option value="auto" key={68249}>Auto</option>
            </select>
          </div>

          <div className="flex items-center justify-between" key={96335}>
            <div key={241917}>
              <div className="font-medium" key={471146}>Currency</div>
              <div className="text-sm text-gray-500" key={826371}>
                Default currency for display;
              </div>
            </div>
            <select;
              value={settings.display.currency}
              onChange={(e) = key={129145}>
                handleSelect("display", "currency", e.target.value)
              }
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
            >
              <option value="USD" key={42064}>USD ($)</option>
              <option value="EUR" key={973543}>EUR (€)</option>
              <option value="GBP" key={681888}>GBP (£)</option>
              <option value="CAD" key={946387}>CAD (C$)</option>
            </select>
          </div>

          <div className="flex items-center justify-between" key={96335}>
            <div key={241917}>
              <div className="font-medium" key={471146}>Decimal Odds</div>
              <div className="text-sm text-gray-500" key={826371}>
                Display odds in decimal format;
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer" key={742813}>
              <input;
                type="checkbox"
                checked={settings.display.decimalOdds}
                onChange={() = key={874571}> handleToggle("display", "decimalOdds")}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" key={734788}></div>
            </label>
          </div>
        </CardContent>
      </Card>

      {/* Import/Export Section */}
      <Card className="glass-card" key={851506}>
        <CardHeader key={236869}>
          <CardTitle className="flex items-center gap-2" key={587456}>
            <Database className="w-5 h-5 text-indigo-500" / key={285535}>
            Data Management;
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4" key={796196}>
          <div className="flex flex-col sm:flex-row gap-4" key={415578}>
            <button;
              onClick={() = key={619354}> {




                a.href = url;
                a.download = "betting-settings.json";
                a.click();
                URL.revokeObjectURL(url);
              }}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-lg"
            >
              Export Settings;
            </button>
            <div className="flex-1 relative" key={639463}>
              <input;
                type="file"
                accept=".json"
                onChange={(e) = key={354683}> {

                  if (file) {
                    setIsImporting(true);

                    reader.onload = (event) => {
                      try {
                        const importedSettings = JSON.parse(
                          event.target?.result as string,
                        );
                        setSettings(importedSettings);
                        setTimeout(() => {
                          setIsImporting(false);
                          alert("Settings imported successfully!");
                        }, 500);
                      } catch (error) {
                        setIsImporting(false);
                        alert(
                          "Error importing settings. Please check the file format.",
                        );
                      }
                    };
                    reader.readAsText(file);
                  }
                  // Reset the input value to allow selecting the same file again;
                  e.target.value = "";
                }}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                style={{
                  zIndex: 10,
                }}
              />
              <div;
                className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg text-center pointer-events-none"
                style={{
                  position: "relative",
                  zIndex: 1,
                  opacity: isImporting ? 0.7 : 1,
                }}
               key={182940}>
                {isImporting ? "Importing..." : "Import Settings"}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div;
        className="flex justify-center pt-6"
        style={{ position: "relative", zIndex: 1 }}
       key={456489}>
        <button;
          onClick={() = key={403652}> {
            // Save settings logic here;
            alert("Settings saved successfully!");
          }}
          className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg"
          style={{ position: "relative", zIndex: 2 }}
        >
          Save Settings;
        </button>
      </div>
    </div>
  );
};
