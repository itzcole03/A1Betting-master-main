import React, { useState  } from 'react.ts';
import GlassCard from '@/components/ui/GlassCard.ts';
import GlowButton from '@/components/ui/GlowButton.ts';
import Tooltip from '@/components/ui/Tooltip.ts';

const mockUserData = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '+1 234 567 890',
  location: 'New York, USA',
  avatar: 'JD',
  joinDate: 'January 2024',
  stats: {
    totalPredictions: 1234,
    successRate: 78.5,
    winStreak: 5,
    totalWinnings: 5678.9,
  },
  favoriteSports: ['Football', 'Basketball', 'Tennis'],
};

const Profile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState(mockUserData);
  const [editedData, setEditedData] = useState(mockUserData);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error',
  });

  const handleEdit = () => {
    setIsEditing(true);
    setEditedData(userData);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedData(userData);
  };

  const handleSave = () => {
    setUserData(editedData);
    setIsEditing(false);
    setSnackbar({
      open: true,
      message: 'Profile updated successfully',
      severity: 'success',
    });
  };

  const handleChange = (field: string, value: string) => {
    setEditedData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  return (
    <div className="p-6 space-y-8 max-w-3xl mx-auto" key={907563}>
      <GlassCard className="flex flex-col items-center p-8" key={976923}>
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-4xl font-bold text-white mb-4" key={650629}>
          {userData.avatar}
        </div>
        <div className="text-2xl font-bold mb-2" key={336501}>{userData.name}</div>
        <div className="text-gray-500 mb-2" key={539504}>{userData.email}</div>
        <div className="text-gray-400 mb-2" key={207338}>{userData.location}</div>
        <div className="text-xs text-gray-400 mb-4" key={626779}>Joined {userData.joinDate}</div>
        <div className="flex gap-4 mb-4" key={777866}>
          {userData.favoriteSports.map((sport, idx) => (
            <span key={idx} className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold" key={17549}>{sport}</span>
          ))}
        </div>
        <div className="flex gap-4 mb-4" key={777866}>
          <GlowButton onClick={handleEdit} className="bg-primary-500" key={269457}>Edit Profile</GlowButton>
        </div>
      </GlassCard>
      <GlassCard className="p-6" key={913512}>
        <div className="grid grid-cols-2 gap-6" key={351068}>
          <div key={241917}>
            <Tooltip content="Total number of predictions you've made." key={351557}>
              <div className="text-xs text-gray-400" key={588004}>Total Predictions</div>
            </Tooltip>
            <div className="text-2xl font-bold text-primary-600" key={571782}>{userData.stats.totalPredictions}</div>
          </div>
          <div key={241917}>
            <Tooltip content="Your overall success rate." key={439471}>
              <div className="text-xs text-gray-400" key={588004}>Success Rate</div>
            </Tooltip>
            <div className="text-2xl font-bold text-green-600" key={702696}>{userData.stats.successRate}%</div>
          </div>
          <div key={241917}>
            <Tooltip content="Your current win streak." key={709186}>
              <div className="text-xs text-gray-400" key={588004}>Win Streak</div>
            </Tooltip>
            <div className="text-2xl font-bold text-yellow-600" key={832666}>{userData.stats.winStreak}</div>
          </div>
          <div key={241917}>
            <Tooltip content="Total winnings from all bets." key={449259}>
              <div className="text-xs text-gray-400" key={588004}>Total Winnings</div>
            </Tooltip>
            <div className="text-2xl font-bold text-purple-600" key={630773}>${userData.stats.totalWinnings.toLocaleString()}</div>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};

export default Profile;
