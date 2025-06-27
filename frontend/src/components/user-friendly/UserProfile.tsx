import React, { useState, useEffect  } from 'react.ts';
import { motion, AnimatePresence } from 'framer-motion.ts';
import {
  User,
  Settings,
  TrendingUp,
  DollarSign,
  Award,
  Target,
  Edit3,
  Save,
  X,
  Camera,
  Mail,
  MapPin,
  Calendar,
  Trophy,
  Activity,
  Brain,
  Shield,
  ChevronRight,
  BarChart3,
  Zap,
  Crown,
  Star,
  Medal,
  Flame,
} from 'lucide-react.ts';
import toast from 'react-hot-toast.ts';
import { getUserDisplayName, getUserEmail } from '@/utils/userSettings.ts';

interface UserProfileProps {
  onNavigate: (page: string) => void;
}

interface UserStats {
  totalProfit: number;
  winRate: number;
  totalBets: number;
  avgROI: number;
  currentStreak: number;
  longestStreak: number;
  accuracy: number;
  sharpeRatio: number;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedDate: string;
  rarity: "common" | "rare" | "legendary";
}

interface RiskProfile {
  type: "conservative" | "moderate" | "aggressive";
  maxStake: number;
  maxExposure: number;
  kellyFraction: number;
}

const UserProfile: React.FC<UserProfileProps key={271614}> = ({ onNavigate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "overview" | "stats" | "achievements" | "risk"
  >("overview");

  const [userData, setUserData] = useState({
    name: getUserDisplayName() || "Ultimate User",
    email: getUserEmail() || "user@a1betting.com",
    username: "ultimate_bettor",
    bio: "Professional sports bettor leveraging AI and advanced analytics for consistent profits.",
    location: "New York, NY",
    memberSince: "2023-01-15",
    tier: "Ultimate Brain Pro",
    avatar: null as string | null,
    verified: true,
  });

  const [editedData, setEditedData] = useState(userData);

  const [stats] = useState<UserStats key={40324}>({
    totalProfit: 47350.75,
    winRate: 84.7,
    totalBets: 1247,
    avgROI: 18.3,
    currentStreak: 12,
    longestStreak: 28,
    accuracy: 87.2,
    sharpeRatio: 2.45,
  });

  const [achievements] = useState<Achievement[] key={100729}>([
    {
      id: "1",
      title: "Ultimate Brain Pioneer",
      description: "First 100 users to activate Ultimate Brain AI",
      icon: "🧠",
      unlockedDate: "2024-01-15",
      rarity: "legendary",
    },
    {
      id: "2",
      title: "Profit Master",
      description: "Achieved $50k+ in total profits",
      icon: "💰",
      unlockedDate: "2024-12-20",
      rarity: "rare",
    },
    {
      id: "3",
      title: "Accuracy Expert",
      description: "Maintained 85%+ win rate for 30 days",
      icon: "🎯",
      unlockedDate: "2024-12-15",
      rarity: "rare",
    },
    {
      id: "4",
      title: "Streak Legend",
      description: "25+ consecutive winning bets",
      icon: "🔥",
      unlockedDate: "2024-12-10",
      rarity: "legendary",
    },
    {
      id: "5",
      title: "AI Collaborator",
      description: "Used PropOllama AI for 100+ predictions",
      icon: "🤖",
      unlockedDate: "2024-12-05",
      rarity: "common",
    },
    {
      id: "6",
      title: "Risk Manager",
      description: "Perfect bankroll management for 90 days",
      icon: "🛡️",
      unlockedDate: "2024-11-30",
      rarity: "rare",
    },
  ]);

  const [riskProfile] = useState<RiskProfile key={237005}>({
    type: "moderate",
    maxStake: 2500,
    maxExposure: 12500,
    kellyFraction: 0.25,
  });

  const handleEdit = () => {
    setIsEditing(true);
    setEditedData(userData);
  };

  const handleSave = () => {
    setUserData(editedData);
    setIsEditing(false);
    toast.success("Profile updated successfully! 🎉", {
      duration: 3000,
      icon: "✅",
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedData(userData);
  };

  const handleInputChange = (field: string, value: string) => {
    setEditedData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement key={553350}>) => {

    if (file) {

      reader.onloadend = () => {
        setEditedData((prev) => ({
          ...prev,
          avatar: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const getRarityColor = (rarity: Achievement["rarity"]) => {
    switch (rarity) {
      case "legendary":
        return "from-yellow-400 to-orange-500";
      case "rare":
        return "from-purple-400 to-blue-500";
      case "common":
        return "from-gray-400 to-gray-600";
      default:
        return "from-gray-400 to-gray-600";
    }
  };

  const getRarityBorder = (rarity: Achievement["rarity"]) => {
    switch (rarity) {
      case "legendary":
        return "border-yellow-500/50";
      case "rare":
        return "border-purple-500/50";
      case "common":
        return "border-gray-500/50";
      default:
        return "border-gray-500/50";
    }
  };

  return (
    <motion.div;
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto space-y-6"
     key={72559}>
      {/* Header */}
      <div className="text-center mb-8" key={490373}>
        <motion.h1;
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-3"
         key={536372}>
          👤 Ultimate Profile;
        </motion.h1>
        <p className="text-gray-400 text-lg" key={260320}>
          Your complete betting journey with Ultimate Brain AI;
        </p>
      </div>

      {/* Profile Header Card */}
      <motion.div;
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gray-900/80 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-8"
       key={992934}>
        <div className="flex flex-col lg:flex-row items-center gap-8" key={786044}>
          {/* Avatar Section */}
          <div className="relative group" key={127357}>
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-cyan-400 to-purple-600 p-1" key={270107}>
              <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center overflow-hidden" key={557028}>
                {userData.avatar ? (
                  <img;
                    src={userData.avatar}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  / key={488490}>
                ) : (
                  <span className="text-4xl font-bold text-white" key={612919}>
                    {userData.name.charAt(0)}
                  </span>
                )}
              </div>
            </div>
            {isEditing && (
              <label className="absolute inset-0 cursor-pointer bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity" key={143105}>
                <Camera className="w-8 h-8 text-white" / key={474359}>
                <input;
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                  className="hidden"
                / key={87387}>
              </label>
            )}
            {userData.verified && (
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center" key={160571}>
                <Crown className="w-4 h-4 text-white" / key={331961}>
              </div>
            )}
          </div>

          {/* Profile Info */}
          <div className="flex-1 text-center lg:text-left" key={118554}>
            <div className="mb-4" key={158827}>
              {isEditing ? (
                <input;
                  type="text"
                  value={editedData.name}
                  onChange={(e) = key={979152}> handleInputChange("name", e.target.value)}
                  className="text-3xl font-bold bg-transparent border-b border-cyan-400 focus:outline-none text-white"
                />
              ) : (
                <h2 className="text-3xl font-bold text-white flex items-center gap-2 justify-center lg:justify-start" key={242161}>
                  {userData.name}
                  {userData.verified && (
                    <Star className="w-6 h-6 text-yellow-400 fill-current" / key={762157}>
                  )}
                </h2>
              )}

              <div className="flex items-center gap-2 text-cyan-400 mt-2 justify-center lg:justify-start" key={658836}>
                <Mail className="w-4 h-4" / key={1803}>
                {isEditing ? (
                  <input;
                    type="email"
                    value={editedData.email}
                    onChange={(e) = key={222397}> handleInputChange("email", e.target.value)}
                    className="bg-transparent border-b border-cyan-400 focus:outline-none"
                  />
                ) : (
                  <span key={595076}>{userData.email}</span>
                )}
              </div>

              <div className="flex items-center gap-4 mt-3 text-gray-400 justify-center lg:justify-start" key={401262}>
                <div className="flex items-center gap-1" key={238246}>
                  <MapPin className="w-4 h-4" / key={297348}>
                  {isEditing ? (
                    <input;
                      type="text"
                      value={editedData.location}
                      onChange={(e) = key={340117}>
                        handleInputChange("location", e.target.value)
                      }
                      className="bg-transparent border-b border-gray-500 focus:outline-none text-sm"
                    />
                  ) : (
                    <span className="text-sm" key={887361}>{userData.location}</span>
                  )}
                </div>
                <div className="flex items-center gap-1" key={238246}>
                  <Calendar className="w-4 h-4" / key={921199}>
                  <span className="text-sm" key={887361}>
                    Member since{" "}
                    {new Date(userData.memberSince).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Tier Badge */}
            <div className="mb-4" key={158827}>
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-purple-500/30 rounded-full text-purple-300 font-medium" key={95527}>
                <Brain className="w-4 h-4" / key={370311}>
                {userData.tier}
              </span>
            </div>

            {/* Bio */}
            <div className="mb-4" key={158827}>
              {isEditing ? (
                <textarea;
                  value={editedData.bio}
                  onChange={(e) = key={14933}> handleInputChange("bio", e.target.value)}
                  rows={3}
                  className="w-full bg-gray-800/50 border border-gray-600 rounded-lg p-3 text-gray-300 focus:border-cyan-400 focus:outline-none resize-none"
                  placeholder="Tell us about yourself..."
                />
              ) : (
                <p className="text-gray-300 text-lg max-w-2xl" key={45021}>
                  {userData.bio}
                </p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 justify-center lg:justify-start" key={752847}>
              {isEditing ? (
                <>
                  <button;
                    onClick={handleSave}
                    className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
                   key={469594}>
                    <Save className="w-4 h-4" / key={872632}>
                    Save Changes;
                  </button>
                  <button;
                    onClick={handleCancel}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
                   key={804942}>
                    <X className="w-4 h-4" / key={117081}>
                    Cancel;
                  </button>
                </>
              ) : (
                <>
                  <button;
                    onClick={handleEdit}
                    className="flex items-center gap-2 px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition-colors"
                   key={560508}>
                    <Edit3 className="w-4 h-4" / key={833828}>
                    Edit Profile;
                  </button>
                  <button;
                    onClick={() = key={263171}> onNavigate("settings")}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                  >
                    <Settings className="w-4 h-4" / key={731262}>
                    Settings;
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Navigation Tabs */}
      <div className="flex justify-center" key={263353}>
        <div className="bg-gray-900/60 backdrop-blur-xl rounded-xl p-2 flex gap-2" key={353905}>
          {[
            { id: "overview", label: "Overview", icon: BarChart3 },
            { id: "stats", label: "Statistics", icon: TrendingUp },
            { id: "achievements", label: "Achievements", icon: Trophy },
            { id: "risk", label: "Risk Profile", icon: Shield },
          ].map((tab) => {

            return (
              <button;
                key={tab.id}
                onClick={() = key={56550}> setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  activeTab === tab.id;
                    ? "bg-cyan-500 text-white"
                    : "text-gray-400 hover:text-white hover:bg-gray-800/60"
                }`}
              >
                <IconComponent className="w-4 h-4" / key={564446}>
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait" key={725119}>
        <motion.div;
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
         key={178746}>
          {activeTab === "overview" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" key={765662}>
              {[
                {
                  icon: DollarSign,
                  label: "Total Profit",
                  value: `$${stats.totalProfit.toLocaleString()}`,
                  color: "green",
                  change: "+12.3%",
                },
                {
                  icon: TrendingUp,
                  label: "Win Rate",
                  value: `${stats.winRate}%`,
                  color: "cyan",
                  change: "+2.1%",
                },
                {
                  icon: Target,
                  label: "Accuracy",
                  value: `${stats.accuracy}%`,
                  color: "purple",
                  change: "+1.5%",
                },
                {
                  icon: Flame,
                  label: "Current Streak",
                  value: `${stats.currentStreak}`,
                  color: "orange",
                  change: "🔥",
                },
              ].map((stat, index) => (
                <motion.div;
                  key={stat.label}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-900/60 backdrop-blur-xl border border-gray-700/50 rounded-xl p-6 text-center hover:border-cyan-500/30 transition-colors"
                 key={314908}>
                  <stat.icon;
                    className={`w-8 h-8 mx-auto mb-3 text-${stat.color}-400`}
                  / key={203895}>
                  <div;
                    className={`text-2xl font-bold text-${stat.color}-400 mb-1`}
                   key={322353}>
                    {stat.value}
                  </div>
                  <div className="text-gray-400 text-sm mb-2" key={180484}>{stat.label}</div>
                  <div;
                    className={`text-xs ${stat.color === "green" ? "text-green-400" : "text-orange-400"}`}
                   key={267540}>
                    {stat.change}
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {activeTab === "stats" && (
            <div className="space-y-6" key={501869}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6" key={151516}>
                <div className="bg-gray-900/60 backdrop-blur-xl border border-gray-700/50 rounded-xl p-6" key={662465}>
                  <h3 className="text-xl font-bold text-cyan-400 mb-4 flex items-center gap-2" key={60933}>
                    <Activity className="w-5 h-5" / key={942081}>
                    Performance Metrics;
                  </h3>
                  <div className="space-y-4" key={160407}>
                    {[
                      {
                        label: "Total Bets",
                        value: stats.totalBets.toLocaleString(),
                      },
                      { label: "Average ROI", value: `${stats.avgROI}%` },
                      { label: "Sharpe Ratio", value: stats.sharpeRatio },
                      { label: "Longest Streak", value: stats.longestStreak },
                    ].map((metric) => (
                      <div;
                        key={metric.label}
                        className="flex justify-between items-center"
                       key={408161}>
                        <span className="text-gray-400" key={912100}>{metric.label}</span>
                        <span className="text-white font-semibold" key={197018}>
                          {metric.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-900/60 backdrop-blur-xl border border-gray-700/50 rounded-xl p-6" key={662465}>
                  <h3 className="text-xl font-bold text-purple-400 mb-4 flex items-center gap-2" key={483717}>
                    <Brain className="w-5 h-5" / key={358560}>
                    AI Integration Stats;
                  </h3>
                  <div className="space-y-4" key={160407}>
                    {[
                      { label: "PropOllama Queries", value: "847" },
                      { label: "Ultimate Brain Predictions", value: "1,234" },
                      { label: "AI Accuracy Boost", value: "+15.3%" },
                      { label: "Automated Bets", value: "156" },
                    ].map((metric) => (
                      <div;
                        key={metric.label}
                        className="flex justify-between items-center"
                       key={408161}>
                        <span className="text-gray-400" key={912100}>{metric.label}</span>
                        <span className="text-white font-semibold" key={197018}>
                          {metric.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "achievements" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" key={881323}>
              {achievements.map((achievement, index) => (
                <motion.div;
                  key={achievement.id}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className={`bg-gray-900/60 backdrop-blur-xl border ${getRarityBorder(achievement.rarity)} rounded-xl p-6 hover:scale-105 transition-transform`}
                 key={910664}>
                  <div className="text-center mb-4" key={692984}>
                    <div;
                      className={`text-4xl mb-3 bg-gradient-to-r ${getRarityColor(achievement.rarity)} bg-clip-text text-transparent`}
                     key={224009}>
                      {achievement.icon}
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2" key={256248}>
                      {achievement.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-3" key={918932}>
                      {achievement.description}
                    </p>
                    <div className="flex items-center justify-center gap-2" key={630434}>
                      <Medal;
                        className={`w-4 h-4 ${achievement.rarity === "legendary" ? "text-yellow-400" : achievement.rarity === "rare" ? "text-purple-400" : "text-gray-400"}`}
                      / key={74810}>
                      <span;
                        className={`text-xs uppercase font-semibold ${achievement.rarity === "legendary" ? "text-yellow-400" : achievement.rarity === "rare" ? "text-purple-400" : "text-gray-400"}`}
                       key={794318}>
                        {achievement.rarity}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-2" key={806748}>
                      Unlocked:{" "}
                      {new Date(achievement.unlockedDate).toLocaleDateString()}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {activeTab === "risk" && (
            <div className="space-y-6" key={501869}>
              <div className="bg-gray-900/60 backdrop-blur-xl border border-gray-700/50 rounded-xl p-6" key={662465}>
                <h3 className="text-xl font-bold text-orange-400 mb-6 flex items-center gap-2" key={598719}>
                  <Shield className="w-5 h-5" / key={812583}>
                  Risk Management Profile;
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" key={881323}>
                  <div className="text-center" key={120206}>
                    <div className="text-2xl font-bold text-orange-400 mb-2" key={907560}>
                      {riskProfile.type.toUpperCase()}
                    </div>
                    <div className="text-gray-400 text-sm" key={180833}>Risk Level</div>
                  </div>
                  <div className="text-center" key={120206}>
                    <div className="text-2xl font-bold text-green-400 mb-2" key={87245}>
                      ${riskProfile.maxStake.toLocaleString()}
                    </div>
                    <div className="text-gray-400 text-sm" key={180833}>Max Stake</div>
                  </div>
                  <div className="text-center" key={120206}>
                    <div className="text-2xl font-bold text-blue-400 mb-2" key={866389}>
                      ${riskProfile.maxExposure.toLocaleString()}
                    </div>
                    <div className="text-gray-400 text-sm" key={180833}>Max Exposure</div>
                  </div>
                </div>
                <div className="mt-6 flex justify-center" key={248066}>
                  <button;
                    onClick={() = key={263171}> onNavigate("settings")}
                    className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
                  >
                    <Settings className="w-4 h-4" / key={731262}>
                    Adjust Risk Settings;
                    <ChevronRight className="w-4 h-4" / key={749664}>
                  </button>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

export default UserProfile;
