import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { Home, Settings, DollarSign, Menu, Moon, Sun, BarChart2, PieChart, TrendingUp, Zap, Layers, History, LineChart } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../providers/ThemeProvider'; // Assuming ThemeProvider is in src/providers;
const navItems = [
    { name: 'Dashboard', path: '/', icon: Home },
    { name: 'Player Props', path: '/player-props', icon: PieChart },
    { name: 'AI Predictions', path: '/ai-predictions', icon: BarChart2 },
    { name: 'Win Probabilities', path: '/win-probabilities', icon: TrendingUp },
    { name: 'Arbitrage', path: '/arbitrage', icon: Zap },
    { name: 'Smart Lineups', path: '/smart-lineups', icon: Layers },
    { name: 'Betting History', path: '/betting-history', icon: History },
    { name: 'ML Analytics', path: '/ml-analytics', icon: LineChart },
    { name: 'Bankroll', path: '/bankroll', icon: DollarSign },
    { name: 'Settings', path: '/settings', icon: Settings },
];
const Sidebar = () => {
    const { theme, setTheme } = useTheme();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);


    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    return (_jsxs(_Fragment, { children: [_jsx("aside", { className: "hidden md:block w-64 h-screen sticky top-0", children: _jsx(SidebarContent, {}) }), _jsx("div", { className: "md:hidden fixed top-4 left-4 z-50", children: _jsx("button", { onClick: toggleMobileMenu, className: "p-2 rounded-md bg-surface/80 text-text glass", children: _jsx(Menu, { className: "w-6 h-6" }) }) }), _jsx(AnimatePresence, { children: isMobileMenuOpen && (_jsxs(motion.div, { initial: { x: '-100%' }, animate: { x: 0 }, exit: { x: '-100%' }, transition: { type: 'spring', stiffness: 300, damping: 30 }, className: "md:hidden fixed inset-0 z-40 flex", children: [_jsx("div", { className: "w-64 h-full", children: _jsx(SidebarContent, {}) }), _jsx("div", { onClick: closeMobileMenu, className: "flex-1 bg-black/50 backdrop-blur-sm" })] })) })] }));
};
export default Sidebar;
