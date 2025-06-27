import React from 'react.ts';
import { AppBar, IconButton, Toolbar, Typography, useTheme } from '@mui/material.ts';
import MenuIcon from '@mui/icons-material/Menu.ts';
import ThemeToggle from '@/ThemeToggle/ThemeToggle.ts';

interface NavbarProps {
  onMenuClick: () => void;
}

const Navbar = ({ onMenuClick }: NavbarProps) => {

  return (
    <AppBar;
      position="fixed"
      sx={{
        zIndex: theme.zIndex.drawer + 1,
        height: theme.custom.headerHeight,
        transition: theme.custom.transition,
      }}
     key={625855}>
      <Toolbar key={629347}>
        <IconButton;
          aria-label="open drawer"
          color="inherit"
          edge="start"
          sx={{ mr: 2 }}
          onClick={onMenuClick}
         key={666827}>
          <MenuIcon / key={955480}>
        </IconButton>
        <Typography noWrap component="div" sx={{ flexGrow: 1 }} variant="h6" key={987156}>
          Sports Betting App;
        </Typography>
        <ThemeToggle / key={862563}>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
