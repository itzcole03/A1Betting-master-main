import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import GlassCard from "../ui/GlassCard";
import MetricCard from "../ui/MetricCard";
import EnhancedMetricCard from "../ui/EnhancedMetricCard";
import CyberButton from "../ui/CyberButton";
import HolographicText from "../ui/HolographicText";
const CyberDashboard = ({ currentPage = "dashboard", }) => {
    const user = {
        name: "Alex Chen",
        totalProfit: 47230,
        accuracy: 97.3,
        winRate: 89.4,
        balance: 127430.5,
    };




    // Render based on current page;
    switch (currentPage) {
        case "dashboard":
            return renderDashboard();
        case "premium-dashboard":
            return renderPremiumDashboard();
        case "money-maker":
            return renderMoneyMaker();
        case "prizepicks":
            return renderDefaultPage("PrizePicks Pro", "Professional player prop analysis with real-time AI enhancement and market insights", "fas fa-trophy");
        case "ml-center":
            return renderDefaultPage("ML Center", "Machine learning command center with 47 neural networks and deep learning models", "fas fa-brain");
        case "quantum":
            return renderDefaultPage("Quantum Predictions", "Quantum-enhanced prediction engine with 1024 qubits and superposition algorithms", "fas fa-atom");
        case "analytics":
            return renderDefaultPage("Advanced Analytics", "Comprehensive data analysis with real-time insights and performance metrics", "fas fa-chart-line");
        case "realtime":
            return renderDefaultPage("Real-time Monitor", "Live data monitoring with instant processing and intelligent alerts", "fas fa-eye");
        case "settings":
            return renderDefaultPage("Settings", "Platform configuration and account management options", "fas fa-cog");
        default:
            return renderDashboard();
    }
};
export default CyberDashboard;
