import React, { useState  } from 'react.ts';
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
} from 'lucide-react.ts';
import { Card, CardContent, CardHeader, CardTitle } from '@/ui/card.ts';
import { Badge } from '@/ui/badge.ts';

interface UserProfile {
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
}

export const ProfilePage: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<UserProfile key={623450}>({
    name: "Alex Chen",
    email: "alex.chen@example.com",
    phone: "+1 (555) 123-4567",
    location: "New York, NY",
    joinDate: "January 2023",
    tier: "Pro",
    verified: true,
    twoFactorEnabled: true,
    bio: "Professional sports bettor and analytics enthusiast. Focused on data-driven betting strategies and machine learning applications in sports prediction.",
  });

  const [editedProfile, setEditedProfile] = useState<UserProfile key={623450}>(profile);

  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement key={553350}>) => {

    if (file) {

      reader.onload = (e) => {

        if (isEditing) {
          setEditedProfile((prev) => ({ ...prev, avatar: result }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto" key={662193}>
      {/* Header */}
      <motion.div;
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
       key={951381}>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent" key={11526}>
          👤 Account & Profile;
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2" key={616181}>
          Manage your personal information and account preferences;
        </p>
      </motion.div>

      {/* Profile Header */}
      <Card className="glass-card" key={851506}>
        <CardContent className="pt-6" key={840967}>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6" key={910389}>
            {/* Avatar */}
            <div className="relative" key={579431}>
              <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center overflow-hidden" key={182004}>
                {(isEditing ? editedProfile.avatar : profile.avatar) ? (
                  <img;
                    src={isEditing ? editedProfile.avatar : profile.avatar}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  / key={55203}>
                ) : (
                  <User size={32} className="text-white" / key={67415}>
                )}
              </div>
              {isEditing && (
                <label className="absolute bottom-0 right-0 p-2 bg-blue-600 rounded-full cursor-pointer hover:bg-blue-700 transition-colors" key={236479}>
                  <Camera size={16} className="text-white" / key={658869}>
                  <input;
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarUpload}
                    className="hidden"
                  / key={832122}>
                </label>
              )}
            </div>

            {/* Profile Info */}
            <div className="flex-1" key={745195}>
              <div className="flex items-center gap-3 mb-2" key={283743}>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white" key={855143}>
                  {isEditing ? (
                    <input;
                      type="text"
                      value={editedProfile.name}
                      onChange={(e) = key={191124}>
                        setEditedProfile((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      className="bg-transparent border-b-2 border-blue-500 outline-none"
                    />
                  ) : (
                    profile.name;
                  )}
                </h3>
                <Badge variant={profile.verified ? "success" : "secondary"} key={677131}>
                  {profile.verified ? "Verified" : "Unverified"}
                </Badge>
                <Badge variant="primary" key={908979}>{profile.tier}</Badge>
              </div>

              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-4" key={129992}>
                <Calendar size={16} / key={273406}>
                <span key={595076}>Member since {profile.joinDate}</span>
              </div>

              {isEditing ? (
                <textarea;
                  value={editedProfile.bio}
                  onChange={(e) = key={870366}>
                    setEditedProfile((prev) => ({
                      ...prev,
                      bio: e.target.value,
                    }))
                  }
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 resize-none"
                  rows={3}
                  placeholder="Tell us about yourself..."
                />
              ) : (
                <p className="text-gray-600 dark:text-gray-400" key={300965}>
                  {profile.bio}
                </p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2" key={15266}>
              {isEditing ? (
                <>
                  <button;
                    onClick={handleSave}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                   key={52146}>
                    <Save size={16} / key={580160}>
                    Save;
                  </button>
                  <button;
                    onClick={handleCancel}
                    className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors flex items-center gap-2"
                   key={694413}>
                    <X size={16} / key={185282}>
                    Cancel;
                  </button>
                </>
              ) : (
                <button;
                  onClick={() = key={887064}> setIsEditing(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  <Edit3 size={16} / key={99286}>
                  Edit Profile;
                </button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card className="glass-card" key={851506}>
        <CardHeader key={236869}>
          <CardTitle className="flex items-center gap-2" key={587456}>
            <Mail className="w-5 h-5 text-blue-500" / key={422623}>
            Contact Information;
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4" key={796196}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4" key={476625}>
            <div key={241917}>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" key={651895}>
                Email Address;
              </label>
              {isEditing ? (
                <input;
                  type="email"
                  value={editedProfile.email}
                  onChange={(e) = key={422544}>
                    setEditedProfile((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
                />
              ) : (
                <div className="flex items-center gap-2" key={100294}>
                  <Mail size={16} className="text-gray-400" / key={946970}>
                  <span key={595076}>{profile.email}</span>
                  {profile.verified && (
                    <Badge variant="success" key={925752}>Verified</Badge>
                  )}
                </div>
              )}
            </div>

            <div key={241917}>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" key={651895}>
                Phone Number;
              </label>
              {isEditing ? (
                <input;
                  type="tel"
                  value={editedProfile.phone || ""}
                  onChange={(e) = key={446598}>
                    setEditedProfile((prev) => ({
                      ...prev,
                      phone: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
                />
              ) : (
                <div className="flex items-center gap-2" key={100294}>
                  <Phone size={16} className="text-gray-400" / key={807152}>
                  <span key={595076}>{profile.phone || "Not provided"}</span>
                </div>
              )}
            </div>

            <div className="md:col-span-2" key={52711}>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" key={651895}>
                Location;
              </label>
              {isEditing ? (
                <input;
                  type="text"
                  value={editedProfile.location || ""}
                  onChange={(e) = key={379590}>
                    setEditedProfile((prev) => ({
                      ...prev,
                      location: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
                />
              ) : (
                <div className="flex items-center gap-2" key={100294}>
                  <MapPin size={16} className="text-gray-400" / key={672541}>
                  <span key={595076}>{profile.location || "Not provided"}</span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card className="glass-card" key={851506}>
        <CardHeader key={236869}>
          <CardTitle className="flex items-center gap-2" key={587456}>
            <Shield className="w-5 h-5 text-green-500" / key={178785}>
            Security Settings;
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4" key={796196}>
          <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 rounded-lg" key={911881}>
            <div className="flex items-center gap-3" key={443099}>
              <Key className="w-5 h-5 text-green-600" / key={314946}>
              <div key={241917}>
                <div className="font-medium text-green-800 dark:text-green-200" key={782389}>
                  Two-Factor Authentication;
                </div>
                <div className="text-sm text-green-600 dark:text-green-400" key={9292}>
                  Extra security for your account;
                </div>
              </div>
            </div>
            <Badge variant={profile.twoFactorEnabled ? "success" : "secondary"} key={530049}>
              {profile.twoFactorEnabled ? "Enabled" : "Disabled"}
            </Badge>
          </div>

          <div className="flex flex-col gap-3" key={144774}>
            <button className="w-full px-4 py-3 text-left bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" key={95279}>
              <div className="font-medium" key={471146}>Change Password</div>
              <div className="text-sm text-gray-500" key={826371}>
                Update your account password;
              </div>
            </button>

            <button className="w-full px-4 py-3 text-left bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" key={95279}>
              <div className="font-medium" key={471146}>Login Sessions</div>
              <div className="text-sm text-gray-500" key={826371}>
                Manage your active sessions;
              </div>
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Account Actions */}
      <Card className="glass-card" key={851506}>
        <CardHeader key={236869}>
          <CardTitle className="flex items-center gap-2" key={587456}>
            <Settings className="w-5 h-5 text-orange-500" / key={995099}>
            Account Actions;
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4" key={796196}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4" key={476625}>
            <button className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors" key={952788}>
              Export Account Data;
            </button>
            <button className="px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors" key={297234}>
              Download Activity Report;
            </button>
          </div>

          <div className="pt-4 border-t border-gray-200 dark:border-gray-700" key={440181}>
            <button className="px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors" key={824046}>
              Delete Account;
            </button>
            <p className="text-sm text-gray-500 mt-2" key={101703}>
              Permanently delete your account and all associated data. This;
              action cannot be undone.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;
