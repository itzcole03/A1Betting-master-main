import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { motion } from "framer-motion";
import { Settings, User, Shield, Bell, Palette, Database, BarChart3, Download, Upload, RefreshCw, Save, AlertTriangle, Sun, Moon, Target, Zap, Sliders, } from "lucide-react";
import { useTheme } from "../../providers/SafeThemeProvider";
// Import hook directly to avoid module resolution issues;
import useUltimateSettings from "../../hooks/useUltimateSettings";
// Use direct imports to avoid module resolution issues;
const Card = ({ children, className = "", }) => (_jsx("div", { className: `rounded-2xl bg-card text-card-foreground transition-all duration-300 hover:shadow-2xl ${className}`, style: {
        background: "rgba(255, 255, 255, 0.04)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(40px) saturate(200%)",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.15), 0 1px 0 rgba(255, 255, 255, 0.05) inset",
    }, children: children }));

const CardTitle = ({ children, className = "", }) => (_jsx("h3", { className: `text-2xl font-bold leading-none tracking-tight ${className}`, style: {
        color: "#ffffff",
        letterSpacing: "-0.02em",
        fontSize: "20px",
        fontWeight: "700",
    }, children: children }));

const Badge = ({ children, className = "", variant = "default", }) => {
    const variantClasses = {
        default: "bg-primary text-primary-foreground",
        success: "bg-green-500 text-white",
        destructive: "bg-red-500 text-white",
        outline: "border border-input",
        secondary: "bg-secondary text-secondary-foreground",
    };
    return (_jsx("span", { className: `inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${variantClasses[variant]} ${className}`, children: children }));
};
const Button = ({ children, className = "", variant = "default", size = "default", disabled = false, onClick, ...props }) => {
    const variantClasses = {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "underline-offset-4 hover:underline text-primary",
    };
    const sizeClasses = {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
    };
    return (_jsx("button", { className: `inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${variantClasses[variant]} ${sizeClasses[size]} ${className}`, disabled: disabled, onClick: onClick, ...props, children: children }));
};
// Create inline theme toggle to avoid import issues;
const SimpleThemeToggle = () => {
    const { isDark, toggleDarkMode, variant: themeVariant } = useTheme();
    return (_jsxs("button", { onClick: toggleDarkMode, className: "flex items-center gap-2 px-4 py-2 rounded-lg border transition-all hover:bg-muted", style: {
            background: isDark;
                ? "rgba(255, 255, 255, 0.05)"
                : "rgba(255, 255, 255, 0.8)",
            backdropFilter: "blur(20px) saturate(180%)",
            border: `1px solid ${isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(15, 23, 42, 0.1)"}`,
            color: isDark ? "#ffffff" : "#0f172a",
        }, children: [isDark ? _jsx(Sun, { className: "w-4 h-4" }) : _jsx(Moon, { className: "w-4 h-4" }), _jsx("span", { children: isDark ? "Light Mode" : "Dark Mode" }), _jsxs("div", { className: "text-xs text-muted-foreground", children: ["(", themeVariant, ")"] })] }));
};
const settingsSections = [
    {
        id: "account",
        title: "Account & Profile",
        icon: _jsx(User, { className: "w-5 h-5" }),
        description: "Personal information, subscription, and account security",
        color: "blue",
    },
    {
        id: "betting",
        title: "Betting Preferences",
        icon: _jsx(Target, { className: "w-5 h-5" }),
        description: "Risk profiles, stake sizing, and betting automation",
        color: "green",
    },
    {
        id: "appearance",
        title: "Appearance & Display",
        icon: _jsx(Palette, { className: "w-5 h-5" }),
        description: "Theme, layout, currency, and visual preferences",
        color: "purple",
    },
    {
        id: "notifications",
        title: "Notifications & Alerts",
        icon: _jsx(Bell, { className: "w-5 h-5" }),
        description: "Customize alerts, emails, and push notifications",
        color: "orange",
    },
    {
        id: "privacy",
        title: "Privacy & Security",
        icon: _jsx(Shield, { className: "w-5 h-5" }),
        description: "Data sharing, 2FA, and privacy controls",
        color: "red",
    },
    {
        id: "analytics",
        title: "Analytics & Data",
        icon: _jsx(BarChart3, { className: "w-5 h-5" }),
        description: "Data sources, model preferences, and analytics settings",
        color: "indigo",
    },
    {
        id: "automation",
        title: "Automation & AI",
        icon: _jsx(Zap, { className: "w-5 h-5" }),
        description: "Auto-betting, ML recommendations, and smart features",
        color: "cyan",
    },
    {
        id: "system",
        title: "System & Performance",
        icon: _jsx(Database, { className: "w-5 h-5" }),
        description: "Cache, performance, API settings, and system health",
        color: "gray",
    },
];
export const UltimateSettingsPage = () => {
    const { theme, isDark, toggleDarkMode, variant: themeVariant } = useTheme();
    const { settings, updateSetting, updateSection, saveSettings, resetSection, exportSettings, importSettings, isLoading, hasUnsavedChanges, } = useUltimateSettings();
    const [activeSection, setActiveSection] = useState("account");
    const [showAdvanced, setShowAdvanced] = useState(false);
    const handleImportSettings = (event) => {

        if (!file)
            return;

        reader.onload = (e) => {
            try {


                if (!result.success) {
                    // console statement removed
                }
            }
            catch (error) {
                // console statement removed
            }
        };
        reader.readAsText(file);
    };
    const getSectionColor = (color) => {
        const colors = {
            blue: "from-blue-500 to-blue-600",
            green: "from-green-500 to-green-600",
            purple: "from-purple-500 to-purple-600",
            orange: "from-orange-500 to-orange-600",
            red: "from-red-500 to-red-600",
            indigo: "from-indigo-500 to-indigo-600",
            cyan: "from-cyan-500 to-cyan-600",
            gray: "from-gray-500 to-gray-600",
        };
        return colors[color] || colors.blue;
    };

    const renderAccountSection = () => (_jsxs("div", { className: "space-y-6", children: [_jsxs("h3", { className: "text-xl font-semibold flex items-center gap-2", children: [_jsx(User, { className: "w-5 h-5 text-blue-500" }), "Account & Profile"] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs(Card, { className: "glass-card", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-lg", children: "Personal Information" }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2", children: "Full Name" }), _jsx("input", { type: "text", value: settings.account.name, onChange: (e) => updateSetting("account", "name", e.target.value), className: "w-full border rounded-xl bg-background transition-all duration-300 focus:ring-2 focus:ring-cyan-500/50", style: {
                                                    padding: "14px 18px",
                                                    backgroundColor: "rgba(255, 255, 255, 0.04)",
                                                    border: "1px solid rgba(255, 255, 255, 0.1)",
                                                    borderRadius: "12px",
                                                    color: "#ffffff",
                                                    fontSize: "15px",
                                                    fontWeight: "500",
                                                    backdropFilter: "blur(20px) saturate(180%)",
                                                    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.05)",
                                                } })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2", children: "Email" }), _jsx("input", { type: "email", value: settings.account.email, onChange: (e) => updateSetting("account", "email", e.target.value), className: "w-full border rounded-xl bg-background transition-all duration-300 focus:ring-2 focus:ring-cyan-500/50", style: {
                                                    padding: "14px 18px",
                                                    backgroundColor: "rgba(255, 255, 255, 0.04)",
                                                    border: "1px solid rgba(255, 255, 255, 0.1)",
                                                    borderRadius: "12px",
                                                    color: "#ffffff",
                                                    fontSize: "15px",
                                                    fontWeight: "500",
                                                    backdropFilter: "blur(20px) saturate(180%)",
                                                    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.05)",
                                                } })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2", children: "Phone" }), _jsx("input", { type: "tel", value: settings.account.phone, onChange: (e) => updateSetting("account", "phone", e.target.value), className: "w-full px-3 py-2 border rounded-lg bg-background" })] })] })] }), _jsxs(Card, { className: "glass-card", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-lg", children: "Subscription & Security" }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between p-3 bg-gradient-to-r from-green-500/10 to-green-600/10 rounded-lg", children: [_jsxs("div", { children: [_jsx("div", { className: "font-medium", children: "Subscription Tier" }), _jsx("div", { className: "text-sm text-muted-foreground", children: "Premium Plan" })] }), _jsx(Badge, { className: "bg-green-500 text-white", children: "Active" })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("div", { className: "font-medium", children: "Two-Factor Authentication" }), _jsx("div", { className: "text-sm text-muted-foreground", children: "Enhanced security" })] }), renderToggleSwitch(settings.account.twoFactorEnabled, () => updateSetting("account", "twoFactorEnabled", !settings.account.twoFactorEnabled))] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2", children: "Timezone" }), _jsxs("select", { value: settings.account.timezone, onChange: (e) => updateSetting("account", "timezone", e.target.value), className: "w-full px-3 py-2 border rounded-lg bg-background", children: [_jsx("option", { value: "America/New_York", children: "Eastern Time" }), _jsx("option", { value: "America/Chicago", children: "Central Time" }), _jsx("option", { value: "America/Denver", children: "Mountain Time" }), _jsx("option", { value: "America/Los_Angeles", children: "Pacific Time" }), _jsx("option", { value: "Europe/London", children: "GMT" })] })] })] })] })] })] }));


    const renderNotificationsSection = () => (_jsxs("div", { className: "space-y-6", children: [_jsxs("h3", { className: "text-xl font-semibold flex items-center gap-2", children: [_jsx(Bell, { className: "w-5 h-5 text-orange-500" }), "Notifications & Alerts"] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs(Card, { className: "glass-card", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-lg", children: "Alert Preferences" }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("div", { className: "font-medium", children: "Bet Alerts" }), _jsx("div", { className: "text-sm text-muted-foreground", children: "Notifications when bets are settled" })] }), renderToggleSwitch(settings.notifications.betAlerts, () => updateSetting("notifications", "betAlerts", !settings.notifications.betAlerts))] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("div", { className: "font-medium", children: "Price Changes" }), _jsx("div", { className: "text-sm text-muted-foreground", children: "Alert when odds move significantly" })] }), renderToggleSwitch(settings.notifications.priceChanges, () => updateSetting("notifications", "priceChanges", !settings.notifications.priceChanges))] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("div", { className: "font-medium", children: "Daily Reports" }), _jsx("div", { className: "text-sm text-muted-foreground", children: "Daily performance summaries" })] }), renderToggleSwitch(settings.notifications.dailyReports, () => updateSetting("notifications", "dailyReports", !settings.notifications.dailyReports))] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("div", { className: "font-medium", children: "Sound Enabled" }), _jsx("div", { className: "text-sm text-muted-foreground", children: "Audio notifications" })] }), renderToggleSwitch(settings.notifications.soundEnabled, () => updateSetting("notifications", "soundEnabled", !settings.notifications.soundEnabled))] })] })] }), _jsxs(Card, { className: "glass-card", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-lg", children: "Delivery Methods" }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("div", { className: "font-medium", children: "Email Notifications" }), _jsx("div", { className: "text-sm text-muted-foreground", children: "Send alerts to email" })] }), renderToggleSwitch(settings.notifications.emailNotifications, () => updateSetting("notifications", "emailNotifications", !settings.notifications.emailNotifications))] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("div", { className: "font-medium", children: "Push Notifications" }), _jsx("div", { className: "text-sm text-muted-foreground", children: "Browser/mobile push alerts" })] }), renderToggleSwitch(settings.notifications.pushNotifications, () => updateSetting("notifications", "pushNotifications", !settings.notifications.pushNotifications))] }), _jsxs("div", { className: "p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg", children: [_jsxs("div", { className: "flex items-center gap-2 mb-2", children: [_jsx(Moon, { className: "w-4 h-4 text-blue-600" }), _jsx("span", { className: "font-medium", children: "Quiet Hours" }), renderToggleSwitch(settings.notifications.quietHours.enabled, () => updateSetting("notifications", "quietHours", {
                                                        ...settings.notifications.quietHours,
                                                        enabled: !settings.notifications.quietHours.enabled,
                                                    }))] }), settings.notifications.quietHours.enabled && (_jsxs("div", { className: "grid grid-cols-2 gap-2 mt-2", children: [_jsx("input", { type: "time", value: settings.notifications.quietHours.start, onChange: (e) => updateSetting("notifications", "quietHours", {
                                                            ...settings.notifications.quietHours,
                                                            start: e.target.value,
                                                        }), className: "px-2 py-1 text-sm border rounded bg-background" }), _jsx("input", { type: "time", value: settings.notifications.quietHours.end, onChange: (e) => updateSetting("notifications", "quietHours", {
                                                            ...settings.notifications.quietHours,
                                                            end: e.target.value,
                                                        }), className: "px-2 py-1 text-sm border rounded bg-background" })] }))] })] })] })] })] }));

    const renderAnalyticsSection = () => (_jsxs("div", { className: "space-y-6", children: [_jsxs("h3", { className: "text-xl font-semibold flex items-center gap-2", children: [_jsx(BarChart3, { className: "w-5 h-5 text-indigo-500" }), "Analytics & Data"] }), _jsxs(Card, { className: "glass-card", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-lg", children: "Data Sources & Performance" }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2", children: "Enabled Data Sources" }), _jsx("div", { className: "space-y-2", children: [
                                            "ESPN",
                                            "SportsRadar",
                                            "PrizePicks",
                                            "DraftKings",
                                            "FanDuel",
                                        ].map((source) => (_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-sm", children: source }), renderToggleSwitch(settings.analytics.enabledSources.includes(source.toLowerCase()), () => {


                                                    const newSources = current.includes(sourceLower)
                                                        ? current.filter((s) => s !== sourceLower)
                                                        : [...current, sourceLower];
                                                    updateSetting("analytics", "enabledSources", newSources);
                                                })] }, source))) })] }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2", children: "Refresh Interval (sec)" }), _jsx("input", { type: "number", min: "60", max: "3600", value: settings.analytics.refreshInterval, onChange: (e) => updateSetting("analytics", "refreshInterval", Number(e.target.value)), className: "w-full px-3 py-2 border rounded-lg bg-background" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2", children: "Cache Duration (sec)" }), _jsx("input", { type: "number", min: "300", max: "86400", value: settings.analytics.cacheDuration, onChange: (e) => updateSetting("analytics", "cacheDuration", Number(e.target.value)), className: "w-full px-3 py-2 border rounded-lg bg-background" })] })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("div", { className: "font-medium", children: "Cache Enabled" }), _jsx("div", { className: "text-sm text-muted-foreground", children: "Improve performance with local caching" })] }), renderToggleSwitch(settings.analytics.cacheEnabled, () => updateSetting("analytics", "cacheEnabled", !settings.analytics.cacheEnabled))] })] })] })] }));

    const renderSectionContent = () => {
        switch (activeSection) {
            case "account":
                return renderAccountSection();
            case "betting":
                return renderBettingSection();
            case "appearance":
                return renderAppearanceSection();
            case "notifications":
                return renderNotificationsSection();
            case "privacy":
                return renderPrivacySection();
            case "analytics":
                return renderAnalyticsSection();
            case "system":
                return renderSystemSection();
            default:
                return renderAccountSection();
        }
    };
    return (_jsxs("div", { className: "min-h-screen bg-background", children: [_jsx(motion.div, { initial: { opacity: 0, y: -20 }, animate: { opacity: 1, y: 0 }, className: "sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border", children: _jsx("div", { className: "container mx-auto px-6 py-4", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "p-2 rounded-lg bg-gradient-to-r from-cyber-primary to-cyber-secondary", children: _jsx(Settings, { className: "w-6 h-6 text-black" }) }), _jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold", children: "Ultimate Settings" }), _jsx("p", { className: "text-muted-foreground", children: "Customize your A1Betting experience" })] })] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsxs(Button, { variant: "outline", size: "sm", onClick: () => setShowAdvanced(!showAdvanced), className: "flex items-center gap-2", children: [_jsx(Sliders, { className: "w-4 h-4" }), showAdvanced ? "Basic" : "Advanced"] }), _jsxs(Button, { variant: "outline", size: "sm", onClick: exportSettings, className: "flex items-center gap-2", children: [_jsx(Download, { className: "w-4 h-4" }), "Export"] }), _jsxs("label", { className: "relative cursor-pointer", children: [_jsx("input", { type: "file", accept: ".json", onChange: handleImportSettings, className: "sr-only" }), _jsxs(Button, { variant: "outline", size: "sm", className: "flex items-center gap-2", type: "button", children: [_jsx(Upload, { className: "w-4 h-4" }), "Import"] })] }), _jsxs(Button, { onClick: saveSettings, disabled: !hasUnsavedChanges || isLoading, className: "flex items-center gap-2 bg-gradient-to-r from-cyber-primary to-cyber-secondary text-black font-medium", children: [isLoading ? (_jsx(RefreshCw, { className: "w-4 h-4 animate-spin" })) : (_jsx(Save, { className: "w-4 h-4" })), "Save Changes"] })] })] }) }) }), _jsx("div", { className: "container mx-auto px-6 py-8", children: _jsxs("div", { className: "flex gap-8", children: [_jsx("div", { className: "w-80 flex-shrink-0", children: _jsx("div", { className: "sticky top-32", children: _jsx("nav", { className: "space-y-2", children: settingsSections.map((section) => (_jsx("button", { onClick: () => setActiveSection(section.id), className: `w-full text-left p-4 rounded-lg transition-all duration-200 ${activeSection === section.id;
                                            ? `bg-gradient-to-r ${getSectionColor(section.color)} text-white shadow-lg`
                                            : "hover:bg-muted"}`, children: _jsxs("div", { className: "flex items-center gap-3", children: [section.icon, _jsxs("div", { children: [_jsx("div", { className: "font-medium", children: section.title }), _jsx("div", { className: `text-sm ${activeSection === section.id;
                                                                ? "text-white/80"
                                                                : "text-muted-foreground"}`, children: section.description })] })] }) }, section.id))) }) }) }), _jsx("div", { className: "flex-1 min-w-0", children: _jsx(motion.div, { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, transition: { duration: 0.3 }, children: renderSectionContent() }, activeSection) })] }) }), hasUnsavedChanges && (_jsxs(motion.div, { initial: { opacity: 0, y: 100 }, animate: { opacity: 1, y: 0 }, className: "fixed bottom-6 right-6 bg-amber-500 text-black px-4 py-2 rounded-lg shadow-lg flex items-center gap-2", children: [_jsx(AlertTriangle, { className: "w-4 h-4" }), "You have unsaved changes"] }))] }));
};
export default UltimateSettingsPage;
