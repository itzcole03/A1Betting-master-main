import React from 'react.ts';
import { Outlet } from 'react-router-dom.ts';
import { Box, useTheme, useMediaQuery } from '@mui/material.ts';
import Navbar from '@/Navbar/Navbar.ts';
import Sidebar from '@/Sidebar/Sidebar.ts';

const Layout: React.FC = () => {


  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: 'flex' }} key={680838}>
      <Navbar showMenuButton={isMobile} onMenuClick={handleDrawerToggle} / key={441999}>
      <Sidebar;
        open={mobileOpen}
        variant={isMobile ? 'temporary' : 'permanent'}
        onClose={handleDrawerToggle}
      / key={916559}>
      <Box;
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - 240px)` },
          mt: 8,
        }}
       key={256541}>
        <Outlet / key={861082}>
      </Box>
    </Box>
  );
};

export default React.memo(Layout);
