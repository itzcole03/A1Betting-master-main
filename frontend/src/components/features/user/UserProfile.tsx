import React, { useState  } from 'react.ts';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Avatar,
  Button,
  TextField,
  IconButton,
  Divider,
  Chip,
  Alert,
  Snackbar,
  CircularProgress,
} from '@mui/material.ts';
import { styled } from '@mui/material/styles.ts';
import {
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  PhotoCamera as PhotoCameraIcon,
} from '@mui/icons-material.ts';

const ProfileCard = styled(Card)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: theme.shadows[4],
  },
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: 120,
  height: 120,
  border: `4px solid ${theme.palette.primary.main}`,
  cursor: 'pointer',
  '&:hover': {
    opacity: 0.8,
  },
}));

interface UserProfile {
  id: string;
  username: string;
  email: string;
  fullName: string;
  avatar: string;
  bio: string;
  location: string;
  joinDate: string;
  stats: {
    totalBets: number;
    winningBets: number;
    totalWagered: number;
    netProfit: number;
    winRate: number;
  };
  preferences: {
    favoriteSports: string[];
    favoriteTeams: string[];
    bettingStyle: string;
  };
}

const DEFAULT_PROFILE: UserProfile = {
  id: '1',
  username: 'betpro_user',
  email: 'user@example.com',
  fullName: 'John Doe',
  avatar: '/default-avatar.png',
  bio: 'Sports betting enthusiast and data analyst',
  location: 'New York, USA',
  joinDate: '2024-01-01',
  stats: {
    totalBets: 150,
    winningBets: 85,
    totalWagered: 5000,
    netProfit: 1250,
    winRate: 56.7,
  },
  preferences: {
    favoriteSports: ['NBA', 'NFL', 'MLB'],
    favoriteTeams: ['Lakers', '49ers', 'Yankees'],
    bettingStyle: 'Value Betting',
  },
};

export const UserProfile: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile key={623450}>(DEFAULT_PROFILE);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState<UserProfile key={623450}>(DEFAULT_PROFILE);
  const [isLoading, setIsLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error',
  });

  const handleEdit = () => {
    setEditedProfile(profile);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // TODO: Implement profile update API call;
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated API call;
      setProfile(editedProfile);
      setIsEditing(false);
      setSnackbar({
        open: true,
        message: 'Profile updated successfully',
        severity: 'success',
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Failed to update profile',
        severity: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof UserProfile, value: string) => {
    setEditedProfile(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement key={553350}>) => {

    if (file) {

      reader.onloadend = () => {
        setEditedProfile(prev => ({
          ...prev,
          avatar: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <ProfileCard key={444672}>
      <CardContent key={452065}>
        <Grid container spacing={3} key={459826}>
          {/* Profile Header */}
          <Grid item xs={12} md={4} sx={{ textAlign: 'center' }} key={644273}>
            <Box position="relative" display="inline-block" key={260291}>
              <StyledAvatar;
                src={isEditing ? editedProfile.avatar : profile.avatar}
                alt={profile.fullName}
              / key={966074}>
              {isEditing && (
                <IconButton;
                  component="label"
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    backgroundColor: 'primary.main',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: 'primary.dark',
                    },
                  }}
                 key={122450}>
                  <input;
                    type="file"
                    hidden;
                    accept="image/*"
                    onChange={handleAvatarChange}
                  / key={847224}>
                  <PhotoCameraIcon / key={675476}>
                </IconButton>
              )}
            </Box>
            <Typography variant="h5" sx={{ mt: 2 }} key={501535}>
              {isEditing ? (
                <TextField;
                  fullWidth;
                  value={editedProfile.fullName}
                  onChange={(e) = key={73499}> handleInputChange('fullName', e.target.value)}
                />
              ) : (
                profile.fullName;
              )}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary" key={682869}>
              @{isEditing ? (
                <TextField;
                  fullWidth;
                  value={editedProfile.username}
                  onChange={(e) = key={443736}> handleInputChange('username', e.target.value)}
                />
              ) : (
                profile.username;
              )}
            </Typography>
          </Grid>

          {/* Profile Details */}
          <Grid item xs={12} md={8} key={230289}>
            <Box display="flex" justifyContent="flex-end" mb={2} key={586241}>
              {isEditing ? (
                <>
                  <Button;
                    startIcon={<CancelIcon / key={181624}>}
                    onClick={handleCancel}
                    sx={{ mr: 1 }}
                  >
                    Cancel;
                  </Button>
                  <Button;
                    startIcon={<SaveIcon / key={668181}>}
                    variant="contained"
                    onClick={handleSave}
                    disabled={isLoading}
                  >
                    {isLoading ? <CircularProgress size={24} / key={548540}> : 'Save'}
                  </Button>
                </>
              ) : (
                <Button;
                  startIcon={<EditIcon / key={772257}>}
                  onClick={handleEdit}
                >
                  Edit Profile;
                </Button>
              )}
            </Box>

            <Grid container spacing={2} key={272161}>
              <Grid item xs={12} key={689816}>
                <Typography variant="subtitle2" color="textSecondary" key={270974}>
                  Bio;
                </Typography>
                {isEditing ? (
                  <TextField;
                    fullWidth;
                    multiline;
                    rows={3}
                    value={editedProfile.bio}
                    onChange={(e) = key={567422}> handleInputChange('bio', e.target.value)}
                  />
                ) : (
                  <Typography key={705030}>{profile.bio}</Typography>
                )}
              </Grid>

              <Grid item xs={12} sm={6} key={983460}>
                <Typography variant="subtitle2" color="textSecondary" key={270974}>
                  Email;
                </Typography>
                {isEditing ? (
                  <TextField;
                    fullWidth;
                    type="email"
                    value={editedProfile.email}
                    onChange={(e) = key={838249}> handleInputChange('email', e.target.value)}
                  />
                ) : (
                  <Typography key={705030}>{profile.email}</Typography>
                )}
              </Grid>

              <Grid item xs={12} sm={6} key={983460}>
                <Typography variant="subtitle2" color="textSecondary" key={270974}>
                  Location;
                </Typography>
                {isEditing ? (
                  <TextField;
                    fullWidth;
                    value={editedProfile.location}
                    onChange={(e) = key={707318}> handleInputChange('location', e.target.value)}
                  />
                ) : (
                  <Typography key={705030}>{profile.location}</Typography>
                )}
              </Grid>

              <Grid item xs={12} key={689816}>
                <Divider sx={{ my: 2 }} / key={369348}>
              </Grid>

              {/* Stats Section */}
              <Grid item xs={12} key={689816}>
                <Typography variant="h6" gutterBottom key={90207}>
                  Betting Statistics;
                </Typography>
                <Grid container spacing={2} key={272161}>
                  <Grid item xs={6} sm={4} key={237888}>
                    <Typography variant="subtitle2" color="textSecondary" key={270974}>
                      Total Bets;
                    </Typography>
                    <Typography variant="h6" key={93421}>
                      {profile.stats.totalBets}
                    </Typography>
                  </Grid>
                  <Grid item xs={6} sm={4} key={237888}>
                    <Typography variant="subtitle2" color="textSecondary" key={270974}>
                      Win Rate;
                    </Typography>
                    <Typography variant="h6" key={93421}>
                      {profile.stats.winRate}%
                    </Typography>
                  </Grid>
                  <Grid item xs={6} sm={4} key={237888}>
                    <Typography variant="subtitle2" color="textSecondary" key={270974}>
                      Net Profit;
                    </Typography>
                    <Typography;
                      variant="h6"
                      color={profile.stats.netProfit  key={363854}>= 0 ? 'success.main' : 'error.main'}
                    >
                      ${profile.stats.netProfit.toLocaleString()}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12} key={689816}>
                <Divider sx={{ my: 2 }} / key={369348}>
              </Grid>

              {/* Preferences Section */}
              <Grid item xs={12} key={689816}>
                <Typography variant="h6" gutterBottom key={90207}>
                  Preferences;
                </Typography>
                <Grid container spacing={2} key={272161}>
                  <Grid item xs={12} key={689816}>
                    <Typography variant="subtitle2" color="textSecondary" key={270974}>
                      Favorite Sports;
                    </Typography>
                    <Box sx={{ mt: 1 }} key={75957}>
                      {profile.preferences.favoriteSports.map((sport) => (
                        <Chip;
                          key={sport}
                          label={sport}
                          sx={{ mr: 1, mb: 1 }}
                        / key={382498}>
                      ))}
                    </Box>
                  </Grid>
                  <Grid item xs={12} key={689816}>
                    <Typography variant="subtitle2" color="textSecondary" key={270974}>
                      Favorite Teams;
                    </Typography>
                    <Box sx={{ mt: 1 }} key={75957}>
                      {profile.preferences.favoriteTeams.map((team) => (
                        <Chip;
                          key={team}
                          label={team}
                          sx={{ mr: 1, mb: 1 }}
                        / key={836207}>
                      ))}
                    </Box>
                  </Grid>
                  <Grid item xs={12} key={689816}>
                    <Typography variant="subtitle2" color="textSecondary" key={270974}>
                      Betting Style;
                    </Typography>
                    <Typography key={705030}>{profile.preferences.bettingStyle}</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Snackbar;
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={() = key={837606}> setSnackbar(prev => ({ ...prev, open: false }))}
        >
          <Alert;
            onClose={() = key={59214}> setSnackbar(prev => ({ ...prev, open: false }))}
            severity={snackbar.severity}
            sx={{ width: '100%' }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </CardContent>
    </ProfileCard>
  );
}; 