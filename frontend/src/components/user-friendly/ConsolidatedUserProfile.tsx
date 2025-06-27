import React, { useState, useEffect  } from 'react.ts';
import { motion } from 'framer-motion.ts';
import {
  User,
  Settings,
  Shield,
  Bell,
  Key,
  Edit3,
  Save,
  X,
  Camera,
  Mail,
  Phone,
  MapPin,
  Calendar,
  DollarSign,
  TrendingUp,
  Trophy,
  Target,
  Award,
  Activity,
  Eye,
  Download,
  Upload,
  AlertTriangle,
  CheckCircle,
  BarChart3,
  Clock,
  Zap,
  Brain,
} from 'lucide-react.ts';
import toast from 'react-hot-toast.ts';
import {
  getUserSettings,
  saveUserSettings,
  getUserDisplayName,
  getUserEmail,
  type UserSettings,
} from '@/utils/userSettings.ts';

interface ExtendedUserProfile {
  // Basic Profile;
  name: string;
  email: string;
  phone?: string;
  location?: string;
  avatar?: string;
  joinDate: string;
  tier: string;
  verified: boolean;
  twoFactorEnabled: boolean;
  bio?: string;

  // Betting Stats;
  stats: {
    totalProfit: number;
    winRate: number;
    totalBets: number;
    avgROI: number;
    currentStreak: number;
    bestStreak: number;
    totalVolume: number;
  };

  // Risk Profile;
  riskProfile: {
    type: "conservative" | "moderate" | "aggressive";
    maxStake: number;
    minStake: number;
    confidenceThreshold: number;
    maxExposure: number;
    stopLossPercentage: number;
    takeProfitPercentage: number;
  };

  // Achievements;
  achievements: Array<{
    id: number;
    title: string;
    description: string;
    icon: string;
    unlockedAt?: string;
    progress?: number;
    target?: number;
  }>;

  // Recent Activity;
  recentActivity: Array<{
    id: number;
    type: "bet_won" | "bet_lost" | "bet_pending" | "milestone" | "achievement";
    title: string;
    description: string;
    amount?: number;
    timestamp: string;
    confidence?: number;
  }>;
}

interface ConsolidatedUserProfileProps {
  onNavigate: (page: string) => void;
}

export const ConsolidatedUserProfile: React.FC<
  ConsolidatedUserProfileProps;
> = ({ onNavigate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [userSettings, setUserSettings] =
    useState<UserSettings key={207290}>(getUserSettings());
  const [activeTab, setActiveTab] = useState<
    "overview" | "settings" | "security" | "risk" | "achievements" | "activity"
  >("overview");

  // Mock user profile data - in real app this would come from API;
  const [profile, setProfile] = useState<ExtendedUserProfile key={707551}>({
    name: getUserDisplayName(),
    email: getUserEmail(),
    phone: "+1 (555) 123-4567",
    location: "New York, NY",
    joinDate: "January 2023",
    tier: "Ultimate Brain Pro",
    verified: true,
    twoFactorEnabled: true,
    bio: "Professional sports bettor leveraging AI and machine learning for data-driven betting strategies. Focused on maximizing ROI through systematic analysis.",
    stats: {
      totalProfit: 47350.75,
      winRate: 84.7,
      totalBets: 234,
      avgROI: 23.8,
      currentStreak: 7,
      bestStreak: 15,
      totalVolume: 125000,
    },
    riskProfile: {
      type: "moderate",
      maxStake: 500,
      minStake: 25,
      confidenceThreshold: 0.75,
      maxExposure: 2500,
      stopLossPercentage: 0.15,
      takeProfitPercentage: 0.3,
    },
    achievements: [
      {
        id: 1,
        title: "High Roller",
        description: "Placed $50k+ in total bets",
        icon: "💰",
        unlockedAt: "2024-01-15",
      },
      {
        id: 2,
        title: "Accuracy Expert",
        description: "Maintain 80%+ win rate for 30 days",
        icon: "🎯",
        unlockedAt: "2024-02-20",
      },
      {
        id: 3,
        title: "Streak Master",
        description: "Achieve 15+ win streak",
        icon: "🔥",
        unlockedAt: "2024-03-10",
      },
      {
        id: 4,
        title: "Brain Power",
        description: "Complete 100 AI-assisted bets",
        icon: "🧠",
        progress: 87,
        target: 100,
      },
      {
        id: 5,
        title: "Profit King",
        description: "Earn $50k+ total profit",
        icon: "👑",
        progress: 47350,
        target: 50000,
      },
    ],
    recentActivity: [
      {
        id: 1,
        type: "bet_won",
        title: "Lakers vs Warriors - Over 220.5",
        description: "AI prediction confidence: 89%",
        amount: 275,
        timestamp: "2 hours ago",
        confidence: 89,
      },
      {
        id: 2,
        type: "bet_pending",
        title: "Chiefs ML vs Bills",
        description: "Ultimate Brain recommendation",
        amount: 150,
        timestamp: "1 day ago",
        confidence: 82,
      },
      {
        id: 3,
        type: "achievement",
        title: "Earned 'Accuracy Expert' achievement",
        description: "Maintained 80%+ win rate for 30 days",
        timestamp: "2 days ago",
      },
      {
        id: 4,
        type: "bet_won",
        title: "NBA Player Props - Parlay",
        description: "3-leg parlay hit perfectly",
        amount: 425,
        timestamp: "3 days ago",
        confidence: 76,
      },
      {
        id: 5,
        type: "milestone",
        title: "Reached $45k total profit",
        description: "Approaching profit milestone",
        timestamp: "5 days ago",
      },
    ],
  });

  const [editedProfile, setEditedProfile] =
    useState<ExtendedUserProfile key={707551}>(profile);

  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
    toast.success("Profile updated successfully!", {
      icon: "✅",
      duration: 3000,
    });
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  const handleSettingChange = (
    category: keyof UserSettings,
    setting: string,
    value: any,
  ) => {
    const newSettings = {
      ...userSettings,
      [category]: {
        ...userSettings[category],
        [setting]: value,
      },
    };
    setUserSettings(newSettings);
    saveUserSettings(newSettings);
    toast.success("Settings updated!", { icon: "⚙️" });
  };

  const getRiskProfileColor = (type: string) => {
    switch (type) {
      case "conservative":
        return "text-green-600 bg-green-100";
      case "moderate":
        return "text-yellow-600 bg-yellow-100";
      case "aggressive":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const TabButton: React.FC<{
    id: string;
    label: string;
    icon: React.ReactNode;
    active: boolean;
    onClick: () => void;
  }> = ({ id, label, icon, active, onClick }) => (
    <button;
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
        active;
          ? "bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 text-cyan-400"
          : "text-gray-400 hover:text-white hover:bg-gray-800/40"
      }`}
     key={479404}>
      {icon}
      <span className="font-medium" key={514486}>{label}</span>
    </button>
  );

  return (
    <div className="space-y-6" key={501869}>
      {/* Header */}
      <motion.div;
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
       key={951381}>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent" key={865246}>
          👤 Ultimate User Profile;
        </h2>
        <p className="text-gray-400 mt-2" key={874357}>
          Comprehensive profile management and performance analytics;
        </p>
      </motion.div>

      {/* Profile Header Card */}
      <motion.div;
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-800/40 backdrop-blur-sm rounded-2xl border border-cyan-500/20 p-6"
       key={98520}>
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6" key={910389}>
          {/* Avatar */}
          <div className="relative" key={579431}>
            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center overflow-hidden" key={164463}>
              {profile.avatar ? (
                <img;
                  src={profile.avatar}
                  alt="Profile"
                  className="w-full h-full object-cover"
                / key={886779}>
              ) : (
                <User size={32} className="text-white" / key={67415}>
              )}
            </div>
            {isEditing && (
              <label className="absolute bottom-0 right-0 p-2 bg-cyan-600 rounded-full cursor-pointer hover:bg-cyan-700 transition-colors" key={54582}>
                <Camera size={16} className="text-white" / key={658869}>
                <input type="file" accept="image/*" className="hidden" / key={345992}>
              </label>
            )}
          </div>

          {/* Profile Info */}
          <div className="flex-1" key={745195}>
            <div className="flex items-center gap-3 mb-2" key={283743}>
              <h3 className="text-2xl font-bold text-white" key={417493}>
                {isEditing ? (
                  <input;
                    type="text"
                    value={editedProfile.name}
                    onChange={(e) = key={226223}>
                      setEditedProfile((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    className="bg-transparent border-b-2 border-cyan-500 outline-none text-white"
                  />
                ) : (
                  profile.name;
                )}
              </h3>
              <span;
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  profile.verified;
                    ? "bg-green-500/20 text-green-400"
                    : "bg-gray-500/20 text-gray-400"
                }`}
               key={248677}>
                {profile.verified ? "✓ Verified" : "Unverified"}
              </span>
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-500/20 text-purple-400" key={57479}>
                {profile.tier}
              </span>
            </div>

            <div className="flex items-center gap-2 text-gray-400 mb-4" key={868180}>
              <Calendar size={16} / key={273406}>
              <span key={595076}>Member since {profile.joinDate}</span>
            </div>

            {isEditing ? (
              <textarea;
                value={editedProfile.bio}
                onChange={(e) = key={681406}>
                  setEditedProfile((prev) => ({
                    ...prev,
                    bio: e.target.value,
                  }))
                }
                className="w-full p-3 border border-gray-600 rounded-lg bg-gray-800/60 text-white resize-none"
                rows={3}
                placeholder="Tell us about yourself..."
              />
            ) : (
              <p className="text-gray-300" key={821246}>{profile.bio}</p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2" key={15266}>
            {isEditing ? (
              <>
                <button;
                  onClick={handleSave}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                 key={881047}>
                  <Save size={16} / key={580160}>
                  Save;
                </button>
                <button;
                  onClick={handleCancel}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2"
                 key={243261}>
                  <X size={16} / key={185282}>
                  Cancel;
                </button>
              </>
            ) : (
              <button;
                onClick={() = key={206350}> setIsEditing(true)}
                className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors flex items-center gap-2"
              >
                <Edit3 size={16} / key={99286}>
                Edit Profile;
              </button>
            )}
          </div>
        </div>
      </motion.div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2 bg-gray-800/40 backdrop-blur-sm rounded-xl p-2" key={553150}>
        <TabButton;
          id="overview"
          label="Overview"
          icon={<User className="w-4 h-4" / key={469308}>}
          active={activeTab === "overview"}
          onClick={() => setActiveTab("overview")}
        />
        <TabButton;
          id="settings"
          label="Settings"
          icon={<Settings className="w-4 h-4" / key={152091}>}
          active={activeTab === "settings"}
          onClick={() => setActiveTab("settings")}
        />
        <TabButton;
          id="security"
          label="Security"
          icon={<Shield className="w-4 h-4" / key={429859}>}
          active={activeTab === "security"}
          onClick={() => setActiveTab("security")}
        />
        <TabButton;
          id="risk"
          label="Risk Profile"
          icon={<Target className="w-4 h-4" / key={289577}>}
          active={activeTab === "risk"}
          onClick={() => setActiveTab("risk")}
        />
        <TabButton;
          id="achievements"
          label="Achievements"
          icon={<Award className="w-4 h-4" / key={681807}>}
          active={activeTab === "achievements"}
          onClick={() => setActiveTab("achievements")}
        />
        <TabButton;
          id="activity"
          label="Activity"
          icon={<Activity className="w-4 h-4" / key={441579}>}
          active={activeTab === "activity"}
          onClick={() => setActiveTab("activity")}
        />
      </div>

      {/* Tab Content */}
      <motion.div;
        key={activeTab}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
       key={604097}>
        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-6" key={501869}>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" key={765662}>
              <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl border border-green-500/20 p-6 text-center" key={882195}>
                <DollarSign className="w-8 h-8 text-green-400 mx-auto mb-2" / key={713408}>
                <div className="text-2xl font-bold text-green-400" key={77409}>
                  {formatCurrency(profile.stats.totalProfit)}
                </div>
                <div className="text-sm text-gray-400" key={372957}>Total Profit</div>
              </div>

              <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl border border-cyan-500/20 p-6 text-center" key={950497}>
                <Target className="w-8 h-8 text-cyan-400 mx-auto mb-2" / key={372102}>
                <div className="text-2xl font-bold text-cyan-400" key={312838}>
                  {profile.stats.winRate}%
                </div>
                <div className="text-sm text-gray-400" key={372957}>Win Rate</div>
              </div>

              <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl border border-purple-500/20 p-6 text-center" key={90154}>
                <TrendingUp className="w-8 h-8 text-purple-400 mx-auto mb-2" / key={159852}>
                <div className="text-2xl font-bold text-purple-400" key={618393}>
                  {profile.stats.totalBets}
                </div>
                <div className="text-sm text-gray-400" key={372957}>Total Bets</div>
              </div>

              <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl border border-orange-500/20 p-6 text-center" key={916370}>
                <BarChart3 className="w-8 h-8 text-orange-400 mx-auto mb-2" / key={731740}>
                <div className="text-2xl font-bold text-orange-400" key={988549}>
                  {profile.stats.avgROI}%
                </div>
                <div className="text-sm text-gray-400" key={372957}>Avg ROI</div>
              </div>
            </div>

            {/* Additional Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6" key={852085}>
              <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl border border-yellow-500/20 p-6" key={402634}>
                <div className="flex items-center gap-3 mb-3" key={734472}>
                  <Zap className="w-5 h-5 text-yellow-400" / key={315149}>
                  <h3 className="font-semibold text-white" key={766242}>Current Streak</h3>
                </div>
                <div className="text-xl font-bold text-yellow-400" key={490154}>
                  {profile.stats.currentStreak} wins;
                </div>
                <div className="text-sm text-gray-400" key={372957}>
                  Best: {profile.stats.bestStreak} wins;
                </div>
              </div>

              <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl border border-blue-500/20 p-6" key={304385}>
                <div className="flex items-center gap-3 mb-3" key={734472}>
                  <DollarSign className="w-5 h-5 text-blue-400" / key={630472}>
                  <h3 className="font-semibold text-white" key={766242}>Total Volume</h3>
                </div>
                <div className="text-xl font-bold text-blue-400" key={175215}>
                  {formatCurrency(profile.stats.totalVolume)}
                </div>
                <div className="text-sm text-gray-400" key={372957}>
                  All-time betting volume;
                </div>
              </div>

              <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl border border-indigo-500/20 p-6" key={812240}>
                <div className="flex items-center gap-3 mb-3" key={734472}>
                  <Brain className="w-5 h-5 text-indigo-400" / key={559099}>
                  <h3 className="font-semibold text-white" key={766242}>AI Assistance</h3>
                </div>
                <div className="text-xl font-bold text-indigo-400" key={126571}>87%</div>
                <div className="text-sm text-gray-400" key={372957}>
                  Of bets use AI predictions;
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === "settings" && (
          <div className="space-y-6" key={501869}>
            {/* Contact Information */}
            <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl border border-cyan-500/20 p-6" key={758829}>
              <div className="flex items-center gap-2 mb-4" key={515872}>
                <Mail className="w-5 h-5 text-cyan-400" / key={661124}>
                <h3 className="text-lg font-semibold text-white" key={430547}>
                  Contact Information;
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4" key={476625}>
                <div key={241917}>
                  <label className="block text-sm font-medium text-gray-300 mb-2" key={776378}>
                    Email Address;
                  </label>
                  <input;
                    type="email"
                    value={userSettings.profile.email}
                    onChange={(e) = key={573727}>
                      handleSettingChange("profile", "email", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-800/60 text-white"
                  />
                </div>
                <div key={241917}>
                  <label className="block text-sm font-medium text-gray-300 mb-2" key={776378}>
                    Display Name;
                  </label>
                  <input;
                    type="text"
                    value={userSettings.profile.name}
                    onChange={(e) = key={451580}>
                      handleSettingChange("profile", "name", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-800/60 text-white"
                  />
                </div>
              </div>
            </div>

            {/* Display Preferences */}
            <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl border border-purple-500/20 p-6" key={619347}>
              <div className="flex items-center gap-2 mb-4" key={515872}>
                <Eye className="w-5 h-5 text-purple-400" / key={202097}>
                <h3 className="text-lg font-semibold text-white" key={430547}>
                  Display Preferences;
                </h3>
              </div>
              <div className="space-y-4" key={160407}>
                <div className="flex items-center justify-between" key={96335}>
                  <div key={241917}>
                    <div className="font-medium text-white" key={897749}>Dark Mode</div>
                    <div className="text-sm text-gray-400" key={372957}>
                      Enable dark theme across the application;
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer" key={742813}>
                    <input;
                      type="checkbox"
                      checked={userSettings.display.darkMode}
                      onChange={(e) = key={418118}>
                        handleSettingChange(
                          "display",
                          "darkMode",
                          e.target.checked,
                        )
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-cyan-600" key={332784}></div>
                  </label>
                </div>

                <div className="flex items-center justify-between" key={96335}>
                  <div key={241917}>
                    <div className="font-medium text-white" key={897749}>Compact View</div>
                    <div className="text-sm text-gray-400" key={372957}>
                      Reduce spacing and use smaller elements;
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer" key={742813}>
                    <input;
                      type="checkbox"
                      checked={userSettings.display.compactView}
                      onChange={(e) = key={110789}>
                        handleSettingChange(
                          "display",
                          "compactView",
                          e.target.checked,
                        )
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-cyan-600" key={332784}></div>
                  </label>
                </div>
              </div>
            </div>

            {/* Notification Settings */}
            <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl border border-yellow-500/20 p-6" key={402634}>
              <div className="flex items-center gap-2 mb-4" key={515872}>
                <Bell className="w-5 h-5 text-yellow-400" / key={97548}>
                <h3 className="text-lg font-semibold text-white" key={430547}>
                  Notifications;
                </h3>
              </div>
              <div className="space-y-4" key={160407}>
                <div className="flex items-center justify-between" key={96335}>
                  <div key={241917}>
                    <div className="font-medium text-white" key={897749}>
                      Email Notifications;
                    </div>
                    <div className="text-sm text-gray-400" key={372957}>
                      Receive updates and alerts via email;
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer" key={742813}>
                    <input;
                      type="checkbox"
                      checked={userSettings.notifications.email}
                      onChange={(e) = key={223862}>
                        handleSettingChange(
                          "notifications",
                          "email",
                          e.target.checked,
                        )
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-cyan-600" key={332784}></div>
                  </label>
                </div>

                <div className="flex items-center justify-between" key={96335}>
                  <div key={241917}>
                    <div className="font-medium text-white" key={897749}>
                      Push Notifications;
                    </div>
                    <div className="text-sm text-gray-400" key={372957}>
                      Real-time browser notifications;
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer" key={742813}>
                    <input;
                      type="checkbox"
                      checked={userSettings.notifications.push}
                      onChange={(e) = key={456615}>
                        handleSettingChange(
                          "notifications",
                          "push",
                          e.target.checked,
                        )
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-cyan-600" key={332784}></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Security Tab */}
        {activeTab === "security" && (
          <div className="space-y-6" key={501869}>
            <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl border border-green-500/20 p-6" key={725716}>
              <div className="flex items-center gap-2 mb-4" key={515872}>
                <Shield className="w-5 h-5 text-green-400" / key={839875}>
                <h3 className="text-lg font-semibold text-white" key={430547}>
                  Security Settings;
                </h3>
              </div>

              <div className="space-y-4" key={160407}>
                <div className="flex items-center justify-between p-4 bg-green-500/10 rounded-lg border border-green-500/20" key={732246}>
                  <div className="flex items-center gap-3" key={443099}>
                    <Key className="w-5 h-5 text-green-400" / key={236456}>
                    <div key={241917}>
                      <div className="font-medium text-green-300" key={135534}>
                        Two-Factor Authentication;
                      </div>
                      <div className="text-sm text-green-400" key={572030}>
                        Extra security for your account;
                      </div>
                    </div>
                  </div>
                  <span;
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      profile.twoFactorEnabled;
                        ? "bg-green-500/20 text-green-400"
                        : "bg-gray-500/20 text-gray-400"
                    }`}
                   key={535904}>
                    {profile.twoFactorEnabled ? "Enabled" : "Disabled"}
                  </span>
                </div>

                <div className="space-y-3" key={186520}>
                  <button className="w-full px-4 py-3 text-left bg-gray-700/40 rounded-lg hover:bg-gray-700/60 transition-colors" key={563602}>
                    <div className="font-medium text-white" key={897749}>
                      Change Password;
                    </div>
                    <div className="text-sm text-gray-400" key={372957}>
                      Update your account password;
                    </div>
                  </button>

                  <button className="w-full px-4 py-3 text-left bg-gray-700/40 rounded-lg hover:bg-gray-700/60 transition-colors" key={563602}>
                    <div className="font-medium text-white" key={897749}>Login Sessions</div>
                    <div className="text-sm text-gray-400" key={372957}>
                      Manage your active sessions;
                    </div>
                  </button>

                  <button className="w-full px-4 py-3 text-left bg-gray-700/40 rounded-lg hover:bg-gray-700/60 transition-colors" key={563602}>
                    <div className="font-medium text-white" key={897749}>
                      Download Security Report;
                    </div>
                    <div className="text-sm text-gray-400" key={372957}>
                      View your security activity and recommendations;
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Risk Profile Tab */}
        {activeTab === "risk" && (
          <div className="space-y-6" key={501869}>
            <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl border border-orange-500/20 p-6" key={712147}>
              <div className="flex items-center gap-2 mb-4" key={515872}>
                <Target className="w-5 h-5 text-orange-400" / key={223440}>
                <h3 className="text-lg font-semibold text-white" key={430547}>
                  Risk Management;
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6" key={151516}>
                <div key={241917}>
                  <label className="block text-sm font-medium text-gray-300 mb-2" key={776378}>
                    Risk Profile Type;
                  </label>
                  <div;
                    className={`px-3 py-2 rounded-md text-center font-medium ${getRiskProfileColor(
                      profile.riskProfile.type,
                    )}`}
                   key={870304}>
                    {profile.riskProfile.type.charAt(0).toUpperCase() +
                      profile.riskProfile.type.slice(1)}
                  </div>
                </div>

                <div key={241917}>
                  <label className="block text-sm font-medium text-gray-300 mb-2" key={776378}>
                    Confidence Threshold;
                  </label>
                  <div className="text-lg font-bold text-cyan-400" key={363247}>
                    {(profile.riskProfile.confidenceThreshold * 100).toFixed(0)}
                    %
                  </div>
                </div>

                <div key={241917}>
                  <label className="block text-sm font-medium text-gray-300 mb-2" key={776378}>
                    Maximum Stake;
                  </label>
                  <div className="text-lg font-bold text-green-400" key={499793}>
                    {formatCurrency(profile.riskProfile.maxStake)}
                  </div>
                </div>

                <div key={241917}>
                  <label className="block text-sm font-medium text-gray-300 mb-2" key={776378}>
                    Minimum Stake;
                  </label>
                  <div className="text-lg font-bold text-blue-400" key={930283}>
                    {formatCurrency(profile.riskProfile.minStake)}
                  </div>
                </div>

                <div key={241917}>
                  <label className="block text-sm font-medium text-gray-300 mb-2" key={776378}>
                    Maximum Exposure;
                  </label>
                  <div className="text-lg font-bold text-purple-400" key={77027}>
                    {formatCurrency(profile.riskProfile.maxExposure)}
                  </div>
                </div>

                <div key={241917}>
                  <label className="block text-sm font-medium text-gray-300 mb-2" key={776378}>
                    Stop Loss;
                  </label>
                  <div className="text-lg font-bold text-red-400" key={175036}>
                    {(profile.riskProfile.stopLossPercentage * 100).toFixed(0)}%
                  </div>
                </div>
              </div>

              <div className="mt-6" key={469583}>
                <button;
                  onClick={() = key={887064}> onNavigate("settings")}
                  className="w-full px-4 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                >
                  Modify Risk Settings;
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Achievements Tab */}
        {activeTab === "achievements" && (
          <div className="space-y-6" key={501869}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" key={881323}>
              {profile.achievements.map((achievement) => (
                <motion.div;
                  key={achievement.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`p-6 rounded-xl border-2 ${
                    achievement.unlockedAt;
                      ? "bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border-yellow-500/30"
                      : "bg-gray-800/40 border-gray-600/30"
                  }`}
                 key={940650}>
                  <div className="text-3xl mb-3" key={309441}>{achievement.icon}</div>
                  <h4;
                    className={`font-bold mb-2 ${
                      achievement.unlockedAt;
                        ? "text-yellow-400"
                        : "text-gray-400"
                    }`}
                   key={47475}>
                    {achievement.title}
                  </h4>
                  <p;
                    className={`text-sm mb-3 ${
                      achievement.unlockedAt;
                        ? "text-yellow-300"
                        : "text-gray-500"
                    }`}
                   key={627118}>
                    {achievement.description}
                  </p>

                  {achievement.progress !== undefined && achievement.target && (
                    <div className="mb-3" key={6076}>
                      <div className="flex justify-between text-xs mb-1" key={1303}>
                        <span className="text-gray-400" key={912100}>Progress</span>
                        <span className="text-gray-400" key={912100}>
                          {achievement.progress}/{achievement.target}
                        </span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2" key={811414}>
                        <div;
                          className="bg-gradient-to-r from-cyan-500 to-purple-500 h-2 rounded-full"
                          style={{
                            width: `${Math.min(
                              (achievement.progress / achievement.target) * 100,
                              100,
                            )}%`,
                          }}
                         key={355416}></div>
                      </div>
                    </div>
                  )}

                  {achievement.unlockedAt && (
                    <div className="text-xs text-yellow-500" key={996367}>
                      Unlocked on {achievement.unlockedAt}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Activity Tab */}
        {activeTab === "activity" && (
          <div className="space-y-6" key={501869}>
            <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl border border-cyan-500/20 p-6" key={758829}>
              <div className="flex items-center gap-2 mb-4" key={515872}>
                <Activity className="w-5 h-5 text-cyan-400" / key={97232}>
                <h3 className="text-lg font-semibold text-white" key={430547}>
                  Recent Activity;
                </h3>
              </div>

              <div className="space-y-4" key={160407}>
                {profile.recentActivity.map((activity) => (
                  <motion.div;
                    key={activity.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`p-4 rounded-lg border ${
                      activity.type === "bet_won"
                        ? "bg-green-500/10 border-green-500/20"
                        : activity.type === "bet_lost"
                          ? "bg-red-500/10 border-red-500/20"
                          : activity.type === "bet_pending"
                            ? "bg-blue-500/10 border-blue-500/20"
                            : activity.type === "achievement"
                              ? "bg-yellow-500/10 border-yellow-500/20"
                              : "bg-gray-700/40 border-gray-600/20"
                    }`}
                   key={241904}>
                    <div className="flex items-start justify-between" key={653478}>
                      <div className="flex-1" key={745195}>
                        <h4 className="font-semibold text-white mb-1" key={788793}>
                          {activity.title}
                        </h4>
                        <p className="text-sm text-gray-400 mb-2" key={89418}>
                          {activity.description}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-gray-500" key={803713}>
                          <Clock className="w-3 h-3" / key={652987}>
                          <span key={595076}>{activity.timestamp}</span>
                          {activity.confidence && (
                            <>
                              <span key={595076}>•</span>
                              <span key={595076}>Confidence: {activity.confidence}%</span>
                            </>
                          )}
                        </div>
                      </div>

                      {activity.amount && (
                        <div;
                          className={`text-lg font-bold ${
                            activity.type === "bet_won"
                              ? "text-green-400"
                              : activity.type === "bet_lost"
                                ? "text-red-400"
                                : "text-blue-400"
                          }`}
                         key={797787}>
                          {activity.type === "bet_won" ? "+" : ""}
                          {formatCurrency(activity.amount)}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 text-center" key={81087}>
                <button className="px-6 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors" key={807668}>
                  View Full History;
                </button>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ConsolidatedUserProfile;
