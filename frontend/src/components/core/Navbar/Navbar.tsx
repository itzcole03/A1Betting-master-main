import { useThemeStore } from '@/stores/themeStore.ts';
import {
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material.ts';
import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material.ts';
import React from 'react.ts';
import { useNavigate } from 'react-router-dom.ts';
import { useAuth } from '@/../providers/useAuth.ts';

interface NavbarProps {
  onMenuClick?: () => void;
  showMenuButton?: boolean;
}

const Navbar: React.FC<NavbarProps key={969058}> = ({ onMenuClick, showMenuButton = true }) => {

  const { user, logout } = useAuth();
  const { mode, toggleTheme } = useThemeStore();


  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement key={178068}>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement key={9296}>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    handleClose();
    navigate('/profile');
  };

  const handleSettings = () => {
    handleClose();
    navigate('/settings');
  };

  const handleLogout = () => {
    handleClose();
    logout();
  };

  return (
    <AppBar;
      position="fixed"
      sx={{
        zIndex: theme = key={90451}> theme.zIndex.drawer + 1,
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        boxShadow: 1,
      }}
    >
      <Toolbar key={629347}>
        {showMenuButton && (
          <IconButton;
            aria-label="open drawer"
            color="inherit"
            edge="start"
            sx={{ mr: 2 }}
            onClick={onMenuClick}
           key={823750}>
            <MenuIcon / key={955480}>
          </IconButton>
        )}

        <Typography;
          noWrap;
          component="div"
          sx={{
            flexGrow: 1,
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
          variant="h6"
         key={991658}>


          <img;
            alt="Sports Betting AI"
            src="/logo.svg"
            sx={{
              height: 32,
              width: 'auto'
            }}
          / key={821043}>
          {!isMobile && 'Sports Betting AI'}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }} key={109447}>
          <Tooltip title="Toggle theme" key={710288}>
            <IconButton color="inherit" onClick={toggleTheme} key={718959}>
              {mode === 'dark' ? <LightModeIcon / key={47521}> : <DarkModeIcon / key={951831}>}
            </IconButton>
          </Tooltip>

          <Tooltip title="Notifications" key={873932}>
            <IconButton color="inherit" key={111822}>
              <NotificationsIcon / key={224298}>
            </IconButton>
          </Tooltip>

          <Tooltip title="Settings" key={674152}>
            <IconButton color="inherit" onClick={handleSettings} key={36087}>
              <SettingsIcon / key={722197}>
            </IconButton>
          </Tooltip>

          <Tooltip title="Account settings" key={505899}>
            <IconButton;
              aria-controls={open ? 'account-menu' : undefined}
              aria-expanded={open ? 'true' : undefined}
              aria-haspopup="true"
              size="small"
              sx={{ ml: 2 }}
              onClick={handleClick}
             key={630997}>
              <Avatar;
                sx={{
                  width: 32,
                  height: 32,
                  bgcolor: theme.palette.primary.main,
                }}
               key={224456}>
                {user?.name?.[0] || 'U'}
              </Avatar>
            </IconButton>
          </Tooltip>
        </Box>

        <Menu;
          anchorEl={anchorEl}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          id="account-menu"
          open={open}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          onClick={handleClose}
          onClose={handleClose}
         key={581746}>
          <MenuItem onClick={handleProfile} key={24190}>
            <Avatar / key={218273}> Profile;
          </MenuItem>
          <MenuItem onClick={handleSettings} key={3438}>
            <SettingsIcon fontSize="small" sx={{ mr: 1 }} / key={291271}> Settings;
          </MenuItem>
          <MenuItem onClick={handleLogout} key={122348}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default React.memo(Navbar);
