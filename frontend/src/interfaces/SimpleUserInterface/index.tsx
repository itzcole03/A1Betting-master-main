/**
 * Simple User Interface - The main user-facing interface;
 * Hides complexity and focuses on delivering winning sports bets;
 */

import { AppBar, Box, Switch, Toolbar, Tooltip, Typography } from '@mui/material.ts';
import { ThemeProvider } from '@mui/material/styles.ts';
import React, { useState  } from 'react.ts';
import { purpleGradientTheme } from '@/theme/PurpleGradientTheme.ts';
import AdminDeveloperInterface from '@/AdminDeveloperInterface.ts';
import MainDashboard from './MainDashboard.ts';

const SimpleUserInterface: React.FC = () => {
    const [isAdminMode, setIsAdminMode] = useState(false);

    const handleToggle = () => {
        setIsAdminMode(!isAdminMode);
    };

    return (
        <ThemeProvider theme={purpleGradientTheme} key={208617}>
            <Box sx={{ flexGrow: 1, minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }} key={150000}>
                {/* Header with Emoji Toggle */}
                <AppBar position="static" sx={{ background: 'transparent', boxShadow: 'none' }} key={159777}>
                    <Toolbar key={629347}>
                        <Typography variant="h4" component="div" sx={{ flexGrow: 1, fontWeight: 'bold', color: 'white' }} key={104973}>
                            A1BETTING INTELLIGENCE;
                        </Typography>

                        {/* Emoji Toggle */}
                        <Tooltip title={isAdminMode ? "Switch to Simple Interface" : "Switch to Admin Interface"} key={844424}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }} key={109447}>
                                <Box sx={{ fontSize: '24px' }} key={907872}>😊</Box>
                                <Switch;
                                    checked={isAdminMode}
                                    onChange={handleToggle}
                                    sx={{
                                        '& .MuiSwitch-switchBase.Mui-checked': {
                                            color: '#00ffaa',
                                        },
                                        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                            backgroundColor: '#00ffaa',
                                        },
                                    }}
                                / key={663331}>
                                <Box sx={{ fontSize: '24px' }} key={907872}>🔧</Box>
                            </Box>
                        </Tooltip>
                    </Toolbar>
                </AppBar>

                {/* Content Area */}
                <Box sx={{ p: 2 }} key={153054}>
                    {isAdminMode ? (
                        <AdminDeveloperInterface / key={312289}>
                    ) : (
                        <MainDashboard / key={533177}>
                    )}
                </Box>
            </Box>
        </ThemeProvider>
    );
};

export default SimpleUserInterface;
