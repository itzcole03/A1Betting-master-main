import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Shield,
  CreditCard,
  Settings,
  Bell,
  Lock,
  Eye,
  EyeOff,
  Save,
} from 'lucide-react';

interface User {
  id: number;
  email: string;
  username: string;
  fullName: string;
  phone?: string;
  address?: string;
  dateOfBirth?: string;
  profilePicture?: string;
  tier: string;
  memberSince: string;
  balance: number;
  totalBets: number;
  totalWinnings: number;
  winRate: number;
}

interface UpdateUserData {
  fullName?: string;
  email?: string;
  phone?: string;
  address?: string;
  dateOfBirth?: string;
  password?: string;
  notifications?: {
    email: boolean;
    sms: boolean;
    push: boolean;
  };
  privacy?: {
    profileVisible: boolean;
    showStats: boolean;
  };
}

interface UserProfileProps {
  user: User;
  onUpdateProfile: (data: UpdateUserData) => Promise<boolean>;
}

const UserProfile: React.FC<UserProfileProps> = ({ user, onUpdateProfile }) => {
  const [activeTab, setActiveTab] = useState<string>('profile');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [formData, setFormData] = useState<UpdateUserData>({
    fullName: user.fullName,
    email: user.email,
    phone: user.phone || '',
    address: user.address || '',
    dateOfBirth: user.dateOfBirth || '',
    password: '',
    notifications: {
      email: true,
      sms: false,
      push: true,
    },
    privacy: {
      profileVisible: true,
      showStats: true,
    },
  });

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const success = await onUpdateProfile(formData);
      if (success) {
        setIsEditing(false);
        alert('Profile updated successfully!');
      } else {
        alert('Failed to update profile. Please try again.');
      }
    } catch (error) {
      alert('An error occurred while updating your profile.');
    } finally {
      setIsLoading(false);
    }
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: <User className='w-4 h-4' /> },
    { id: 'account', label: 'Account', icon: <CreditCard className='w-4 h-4' /> },
    { id: 'settings', label: 'Settings', icon: <Settings className='w-4 h-4' /> },
    { id: 'security', label: 'Security', icon: <Shield className='w-4 h-4' /> },
  ];

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-6'>
      <div className='max-w-4xl mx-auto'>
        {/* Header */}
        <motion.div
          className='mb-8'
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className='text-4xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent mb-2'>
            Your Profile
          </h1>
          <p className='text-gray-400'>Manage your account information and preferences</p>
        </motion.div>

        {/* Profile Header Card */}
        <motion.div
          className='bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 mb-8'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className='flex items-center space-x-6'>
            <div className='w-20 h-20 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center'>
              <User className='w-10 h-10 text-black' />
            </div>
            <div className='flex-1'>
              <h2 className='text-2xl font-bold text-white'>{user.fullName}</h2>
              <p className='text-gray-400'>
                @{user.username} • {user.tier} Member
              </p>
              <p className='text-sm text-gray-500'>
                Member since {new Date(user.memberSince).toLocaleDateString()}
              </p>
            </div>
            <div className='text-right'>
              <p className='text-gray-400 text-sm'>Account Balance</p>
              <p className='text-2xl font-bold text-yellow-400'>${user.balance.toLocaleString()}</p>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className='grid grid-cols-1 md:grid-cols-4 gap-4 mb-8'>
          <motion.div className='bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-4'>
            <p className='text-gray-400 text-sm'>Total Bets</p>
            <p className='text-xl font-bold text-white'>{user.totalBets}</p>
          </motion.div>
          <motion.div className='bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-4'>
            <p className='text-gray-400 text-sm'>Total Winnings</p>
            <p className='text-xl font-bold text-green-400'>
              ${user.totalWinnings.toLocaleString()}
            </p>
          </motion.div>
          <motion.div className='bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-4'>
            <p className='text-gray-400 text-sm'>Win Rate</p>
            <p className='text-xl font-bold text-blue-400'>{user.winRate}%</p>
          </motion.div>
          <motion.div className='bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-4'>
            <p className='text-gray-400 text-sm'>Tier Status</p>
            <p className='text-xl font-bold text-purple-400'>{user.tier}</p>
          </motion.div>
        </div>

        {/* Tab Navigation */}
        <div className='bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl mb-8'>
          <div className='flex border-b border-white/10'>
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-4 transition-all ${
                  activeTab === tab.id
                    ? 'text-yellow-400 border-b-2 border-yellow-400'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          <div className='p-6'>
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className='space-y-6'>
                <div className='flex items-center justify-between'>
                  <h3 className='text-xl font-semibold text-white'>Personal Information</h3>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className='px-4 py-2 bg-yellow-500/20 text-yellow-400 rounded-lg hover:bg-yellow-500/30 transition-all'
                  >
                    {isEditing ? 'Cancel' : 'Edit Profile'}
                  </button>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <div>
                    <label className='block text-gray-400 text-sm mb-2'>Full Name</label>
                    <div className='relative'>
                      <User className='absolute left-3 top-3 w-4 h-4 text-gray-400' />
                      <input
                        type='text'
                        value={formData.fullName}
                        onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                        disabled={!isEditing}
                        className='w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 disabled:opacity-50'
                      />
                    </div>
                  </div>

                  <div>
                    <label className='block text-gray-400 text-sm mb-2'>Email</label>
                    <div className='relative'>
                      <Mail className='absolute left-3 top-3 w-4 h-4 text-gray-400' />
                      <input
                        type='email'
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        disabled={!isEditing}
                        className='w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 disabled:opacity-50'
                      />
                    </div>
                  </div>

                  <div>
                    <label className='block text-gray-400 text-sm mb-2'>Phone</label>
                    <div className='relative'>
                      <Phone className='absolute left-3 top-3 w-4 h-4 text-gray-400' />
                      <input
                        type='tel'
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        disabled={!isEditing}
                        className='w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 disabled:opacity-50'
                      />
                    </div>
                  </div>

                  <div>
                    <label className='block text-gray-400 text-sm mb-2'>Date of Birth</label>
                    <div className='relative'>
                      <Calendar className='absolute left-3 top-3 w-4 h-4 text-gray-400' />
                      <input
                        type='date'
                        value={formData.dateOfBirth}
                        onChange={e => setFormData({ ...formData, dateOfBirth: e.target.value })}
                        disabled={!isEditing}
                        className='w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 disabled:opacity-50'
                      />
                    </div>
                  </div>

                  <div className='md:col-span-2'>
                    <label className='block text-gray-400 text-sm mb-2'>Address</label>
                    <div className='relative'>
                      <MapPin className='absolute left-3 top-3 w-4 h-4 text-gray-400' />
                      <input
                        type='text'
                        value={formData.address}
                        onChange={e => setFormData({ ...formData, address: e.target.value })}
                        disabled={!isEditing}
                        className='w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 disabled:opacity-50'
                      />
                    </div>
                  </div>
                </div>

                {isEditing && (
                  <div className='flex justify-end space-x-4'>
                    <button
                      onClick={() => setIsEditing(false)}
                      className='px-6 py-2 bg-gray-500/20 text-gray-400 rounded-lg hover:bg-gray-500/30 transition-all'
                    >
                      Cancel
                    </button>
                    <motion.button
                      onClick={handleSave}
                      disabled={isLoading}
                      className='px-6 py-2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-semibold rounded-lg hover:from-yellow-400 hover:to-yellow-500 transition-all disabled:opacity-50 flex items-center'
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Save className='w-4 h-4 mr-2' />
                      {isLoading ? 'Saving...' : 'Save Changes'}
                    </motion.button>
                  </div>
                )}
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div className='space-y-6'>
                <h3 className='text-xl font-semibold text-white'>Notification Preferences</h3>

                <div className='space-y-4'>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center space-x-3'>
                      <Mail className='w-5 h-5 text-gray-400' />
                      <div>
                        <p className='text-white'>Email Notifications</p>
                        <p className='text-gray-400 text-sm'>Receive updates via email</p>
                      </div>
                    </div>
                    <label className='relative inline-flex items-center cursor-pointer'>
                      <input
                        type='checkbox'
                        checked={formData.notifications?.email}
                        onChange={e =>
                          setFormData({
                            ...formData,
                            notifications: { ...formData.notifications!, email: e.target.checked },
                          })
                        }
                        className='sr-only peer'
                      />
                      <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-500"></div>
                    </label>
                  </div>

                  <div className='flex items-center justify-between'>
                    <div className='flex items-center space-x-3'>
                      <Bell className='w-5 h-5 text-gray-400' />
                      <div>
                        <p className='text-white'>Push Notifications</p>
                        <p className='text-gray-400 text-sm'>
                          Receive push notifications in browser
                        </p>
                      </div>
                    </div>
                    <label className='relative inline-flex items-center cursor-pointer'>
                      <input
                        type='checkbox'
                        checked={formData.notifications?.push}
                        onChange={e =>
                          setFormData({
                            ...formData,
                            notifications: { ...formData.notifications!, push: e.target.checked },
                          })
                        }
                        className='sr-only peer'
                      />
                      <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-500"></div>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div className='space-y-6'>
                <h3 className='text-xl font-semibold text-white'>Security Settings</h3>

                <div>
                  <label className='block text-gray-400 text-sm mb-2'>Change Password</label>
                  <div className='relative'>
                    <Lock className='absolute left-3 top-3 w-4 h-4 text-gray-400' />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={e => setFormData({ ...formData, password: e.target.value })}
                      placeholder='Enter new password'
                      className='w-full pl-10 pr-12 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400'
                    />
                    <button
                      type='button'
                      onClick={() => setShowPassword(!showPassword)}
                      className='absolute right-3 top-3 text-gray-400 hover:text-white'
                    >
                      {showPassword ? <EyeOff className='w-4 h-4' /> : <Eye className='w-4 h-4' />}
                    </button>
                  </div>
                </div>

                <motion.button
                  onClick={handleSave}
                  className='px-6 py-2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-semibold rounded-lg hover:from-yellow-400 hover:to-yellow-500 transition-all flex items-center'
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Shield className='w-4 h-4 mr-2' />
                  Update Security
                </motion.button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Default component with mock data
const UserProfileWithMockData: React.FC = () => {
  const mockUser: User = {
    id: 1,
    email: 'elite@example.com',
    username: 'elitebettor',
    fullName: 'Elite Bettor',
    phone: '+1 (555) 123-4567',
    address: '123 Main St, New York, NY 10001',
    dateOfBirth: '1990-01-15',
    tier: 'Quantum Pro',
    memberSince: '2023-01-01',
    balance: 2500.0,
    totalBets: 127,
    totalWinnings: 8450.75,
    winRate: 78.5,
  };

  const handleUpdateProfile = async (data: UpdateUserData): Promise<boolean> => {
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Updating profile with:', data);
    return true;
  };

  return <UserProfile user={mockUser} onUpdateProfile={handleUpdateProfile} />;
};

export default UserProfileWithMockData;
export { UserProfile };
