import React from 'react.ts';
import { IconButton, useTheme } from '@mui/material.ts';
import { Brightness4, Brightness7 } from '@mui/icons-material.ts';
import { useThemeStore } from '@/stores/themeStore.ts';

import { motion } from 'framer-motion.ts';

const ThemeToggle = () => {

  const { toggleTheme } = useThemeStore();

  return (
    <MotionIconButton;
      aria-label="toggle theme"
      color="primary"
      sx={{
        transition: 'transform 0.2s ease-in-out',
        '&:hover': {
          transform: 'rotate(15deg)',
        },
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={toggleTheme}
     key={576503}>
      {theme.palette.mode === 'dark' ? (
        <motion.div;
          animate={{ rotate: 360 }}
          initial={{ rotate: 0 }}
          transition={{ duration: 0.5 }}
         key={661440}>
          <Brightness7 / key={835748}>
        </motion.div>
      ) : (
        <motion.div;
          animate={{ rotate: 360 }}
          initial={{ rotate: 0 }}
          transition={{ duration: 0.5 }}
         key={661440}>
          <Brightness4 / key={722417}>
        </motion.div>
      )}
    </MotionIconButton>
  );
};

export default ThemeToggle;
