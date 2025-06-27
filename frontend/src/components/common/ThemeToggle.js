import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { IconButton, useTheme } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useTheme as useCustomTheme } from '../../hooks/useTheme';
const ThemeToggle = () => {
    const { theme } = useCustomTheme();


    return (_jsx(IconButton, { "aria-label": "toggle theme", color: "inherit", sx: {
            color: muiTheme.palette.text.primary,
            '&:hover': {
                bgcolor: muiTheme.palette.action.hover,
            },
        }, onClick: theme.toggle, children: isDark ? _jsx(Brightness7, {}) : _jsx(Brightness4, {}) }));
};
export default React.memo(ThemeToggle);
