import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { AppBar, Box, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography, useTheme, useMediaQuery, } from '@mui/material';
import { Menu as MenuIcon, Dashboard as DashboardIcon, AdminPanelSettings as AdminIcon, ShowChart as ChartIcon, AttachMoney as MoneyIcon, } from '@mui/icons-material';

const Layout = ({ children }) => {
    const [mobileOpen, setMobileOpen] = React.useState(false);



    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const menuItems = [
        { text: 'Dashboard', icon: _jsx(DashboardIcon, {}), path: '/' },
        { text: 'Money Maker', icon: _jsx(MoneyIcon, {}), path: '/money-maker' },
        { text: 'Predictions', icon: _jsx(ChartIcon, {}), path: '/predictions' },
        { text: 'Admin', icon: _jsx(AdminIcon, {}), path: '/admin' },
    ];

    return (_jsxs(Box, { sx: { display: 'flex' }, children: [_jsx(AppBar, { position: "fixed", sx: {
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }, children: _jsxs(Toolbar, { children: [_jsx(IconButton, { "aria-label": "open drawer", color: "inherit", edge: "start", sx: { mr: 2, display: { sm: 'none' } }, onClick: handleDrawerToggle, children: _jsx(MenuIcon, {}) }), _jsx(Typography, { noWrap: true, component: "div", variant: "h6", children: menuItems.find(item => item.path === location.pathname)?.text || 'Dashboard' })] }) }), _jsx(Box, { component: "nav", sx: { width: { sm: drawerWidth }, flexShrink: { sm: 0 } }, children: _jsx(Drawer, { ModalProps: {
                        keepMounted: true, // Better open performance on mobile.
                    }, open: mobileOpen, sx: {
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: drawerWidth,
                        },
                    }, variant: isMobile ? 'temporary' : 'permanent', onClose: handleDrawerToggle, children: drawer }) }), _jsx(Box, { component: "main", sx: {
                    flexGrow: 1,
                    p: 3,
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    mt: '64px',
                }, children: children })] }));
};
