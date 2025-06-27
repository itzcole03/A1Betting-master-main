import React, { useState  } from 'react.ts';
import { motion } from 'framer-motion.ts';
import {
  User,
  Settings,
  TrendingUp,
  DollarSign,
  Award,
  Target,
} from 'lucide-react.ts';
import { Card, CardContent, CardHeader, CardTitle } from '@/ui/card.ts';
import { Badge } from '@/ui/badge.ts';

export const UnifiedProfile: React.FC = () => {
  const [user] = useState({
    name: "Pro Bettor",
    email: "pro@a1betting.com",
    memberSince: "2023-01-15",
    tier: "Premium",
    avatar: null,
    stats: {
      totalProfit: 15420.75,
      winRate: 68.5,
      totalBets: 234,
      avgROI: 12.3,
    },
    achievements: [
      {
        id: 1,
        title: "High Roller",
        description: "Placed $10k+ in bets",
        icon: "💰",
      },
      {
        id: 2,
        title: "Accuracy Expert",
        description: "70%+ win rate for 30 days",
        icon: "🎯",
      },
      {
        id: 3,
        title: "Streak Master",
        description: "10+ win streak achieved",
        icon: "🔥",
      },
    ],
  });

  return (
    <div className="space-y-6" key={501869}>
      {/* Header */}
      <motion.div;
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
       key={951381}>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent" key={11526}>
          👤 User Profile;
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2" key={616181}>
          Your betting performance and achievements;
        </p>
      </motion.div>

      {/* Profile Card */}
      <Card className="glass-card" key={851506}>
        <CardHeader key={236869}>
          <div className="flex items-center gap-4" key={782146}>
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center" key={831836}>
              <User className="w-8 h-8 text-white" / key={791789}>
            </div>
            <div className="flex-1" key={745195}>
              <CardTitle className="text-xl" key={932730}>{user.name}</CardTitle>
              <p className="text-gray-600 dark:text-gray-400" key={300965}>{user.email}</p>
              <div className="flex items-center gap-2 mt-2" key={445302}>
                <Badge variant="success" key={925752}>{user.tier}</Badge>
                <span className="text-sm text-gray-500" key={346858}>
                  Member since {new Date(user.memberSince).toLocaleDateString()}
                </span>
              </div>
            </div>
            <button className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700" key={314346}>
              <Settings className="w-5 h-5" / key={735275}>
            </button>
          </div>
        </CardHeader>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" key={765662}>
        <Card className="text-center" key={494420}>
          <CardContent className="p-6" key={184394}>
            <DollarSign className="w-8 h-8 text-green-500 mx-auto mb-2" / key={389560}>
            <div className="text-2xl font-bold text-green-600" key={702696}>
              ${user.stats.totalProfit.toLocaleString()}
            </div>
            <div className="text-sm text-gray-500" key={826371}>Total Profit</div>
          </CardContent>
        </Card>

        <Card className="text-center" key={494420}>
          <CardContent className="p-6" key={184394}>
            <Target className="w-8 h-8 text-blue-500 mx-auto mb-2" / key={307834}>
            <div className="text-2xl font-bold text-blue-600" key={634378}>
              {user.stats.winRate}%
            </div>
            <div className="text-sm text-gray-500" key={826371}>Win Rate</div>
          </CardContent>
        </Card>

        <Card className="text-center" key={494420}>
          <CardContent className="p-6" key={184394}>
            <TrendingUp className="w-8 h-8 text-purple-500 mx-auto mb-2" / key={237401}>
            <div className="text-2xl font-bold text-purple-600" key={630773}>
              {user.stats.totalBets}
            </div>
            <div className="text-sm text-gray-500" key={826371}>Total Bets</div>
          </CardContent>
        </Card>

        <Card className="text-center" key={494420}>
          <CardContent className="p-6" key={184394}>
            <Award className="w-8 h-8 text-orange-500 mx-auto mb-2" / key={994855}>
            <div className="text-2xl font-bold text-orange-600" key={478722}>
              {user.stats.avgROI}%
            </div>
            <div className="text-sm text-gray-500" key={826371}>Avg ROI</div>
          </CardContent>
        </Card>
      </div>

      {/* Achievements */}
      <Card key={650115}>
        <CardHeader key={236869}>
          <CardTitle key={202979}>🏆 Achievements</CardTitle>
        </CardHeader>
        <CardContent key={452065}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4" key={223180}>
            {user.achievements.map((achievement) => (
              <div;
                key={achievement.id}
                className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg border border-yellow-200 dark:border-yellow-700/30"
               key={658885}>
                <div className="text-2xl mb-2" key={857669}>{achievement.icon}</div>
                <h4 className="font-semibold text-yellow-800 dark:text-yellow-200" key={780044}>
                  {achievement.title}
                </h4>
                <p className="text-sm text-yellow-600 dark:text-yellow-400" key={101162}>
                  {achievement.description}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card key={650115}>
        <CardHeader key={236869}>
          <CardTitle key={202979}>📈 Recent Activity</CardTitle>
        </CardHeader>
        <CardContent key={452065}>
          <div className="space-y-3" key={186520}>
            <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg" key={282641}>
              <div key={241917}>
                <div className="font-medium" key={471146}>
                  Lakers vs Warriors - Over 220.5;
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400" key={885780}>
                  Won • 2 hours ago;
                </div>
              </div>
              <div className="text-green-600 font-bold" key={592944}>+$150</div>
            </div>

            <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg" key={59329}>
              <div key={241917}>
                <div className="font-medium" key={471146}>Chiefs ML vs Bills</div>
                <div className="text-sm text-gray-600 dark:text-gray-400" key={885780}>
                  Pending • 1 day ago;
                </div>
              </div>
              <div className="text-blue-600 font-bold" key={892295}>$75</div>
            </div>

            <div className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 rounded-lg" key={909394}>
              <div key={241917}>
                <div className="font-medium" key={471146}>Patriots +7.5</div>
                <div className="text-sm text-gray-600 dark:text-gray-400" key={885780}>
                  Lost • 3 days ago;
                </div>
              </div>
              <div className="text-red-600 font-bold" key={701690}>-$100</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
