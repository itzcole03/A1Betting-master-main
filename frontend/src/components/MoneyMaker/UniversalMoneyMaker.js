import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DollarSign, Target, Play, Pause, BarChart3, Activity, Eye, RefreshCw, SortDesc, } from "lucide-react";
// Import consolidated systems;
import { MegaCard, MegaButton } from "../mega/MegaUI";
import { CyberContainer } from "../mega/CyberTheme";
import { usePredictions, useBettingOpportunities, useUserProfile, useToast, } from "../../hooks/UniversalHooks";
import { formatters, } from "../../utils/UniversalUtils";
// Import prototype features;
import { useEnhancedRealDataSources } from "../../hooks/useEnhancedRealDataSources";
import { useEnhancedBettingEngine } from "../../hooks/useEnhancedBettingEngine";
import { EnhancedPrizePicks } from "../enhanced/EnhancedPrizePicks";
// ============================================================================
// MAIN COMPONENT;
// ============================================================================
export const UniversalMoneyMaker = () => {
    // Enhanced state with prototype features;
    const [activeTab, setActiveTab] = useState("prizepicks");
    // State;
    const [config, setConfig] = useState({
        investmentAmount: 1000,
        riskLevel: "moderate",
        timeHorizon: "medium",
        autoMode: false,
        minConfidence: 75,
        maxExposure: 25,
        diversificationLevel: 3,
        preferredSports: ["nfl", "nba", "mlb"],
        excludedMarkets: [],
        kellyMultiplier: 0.25,
        stopLossPercentage: 10,
        profitTargetPercentage: 20,
    });
    const [opportunities, setOpportunities] = useState([]);
    const [portfolios, setPortfolios] = useState([]);
    const [metrics, setMetrics] = useState({
        totalProfit: 12547.83,
        totalStaked: 45230.0,
        roi: 27.7,
        winRate: 68.4,
        averageOdds: 1.85,
        betsPlaced: 234,
        opportunitiesFound: 1847,
        avgConfidence: 82.3,
        avgValueEdge: 5.8,
        maxDrawdown: 8.2,
        sharpeRatio: 2.14,
        calmarRatio: 3.38,
        profitFactor: 1.89,
        clv: 4.2,
    });
    const [state, setState] = useState({
        isScanning: false,
        isAutoMode: false,
        scanProgress: 0,
        lastScanTime: null,
        alertsCount: 3,
        systemHealth: "excellent",
    });
    const [selectedOpportunity, setSelectedOpportunity] = useState(null);
    const [filterCriteria, setFilterCriteria] = useState({
        sport: "all",
        riskLevel: "all",
        minConfidence: 0,
        minEdge: 0,
    });
    const [sortBy, setSortBy] = useState("valueEdge");
    const [sortOrder, setSortOrder] = useState("desc");
    // Enhanced hooks from prototype;
    const { dataSources, games, players, loading: dataLoading, connectionStatus, dataQuality, dataReliability, refreshData, connectedSourcesCount, totalSourcesCount, } = useEnhancedRealDataSources();
    const { generateEnhancedPortfolio, currentOpportunities, isGenerating, realTimeData, } = useEnhancedBettingEngine();
    // Universal hooks;
    const { toast } = useToast();
    const { predictions, loading: predictionsLoading } = usePredictions();
    const { opportunities: legacyOpportunities } = useBettingOpportunities();
    const { userProfile } = useUserProfile();
    // Initialize data and scan for opportunities;
    useEffect(() => {
        if (players.length > 0 && games.length > 0) {
            generateOpportunities();
        }
    }, [players, games]);
    // Auto-scan interval;
    useEffect(() => {
        let interval;
        if (state.isAutoMode) {
            interval = setInterval(() => {
                scanForOpportunities();
            }, 300000); // Scan every 5 minutes;
        }
        return () => {
            if (interval)
                clearInterval(interval);
        };
    }, [state.isAutoMode]);
    // Generate opportunities from real data;
    const generateOpportunities = useCallback(async () => {
        if (!players.length || !games.length)
            return;
        setState((prev) => ({ ...prev, isScanning: true, scanProgress: 0 }));
        try {

            // Generate player prop opportunities;
            for (const i = 0; i < Math.min(players.length, 50); i++) {

                setState((prev) => ({ ...prev, scanProgress: (i / 50) * 50 }));

                for (const statType of statTypes.slice(0, 2)) {
                    // Limit to 2 stat types per player;

                    if (opportunity && opportunity.valueEdge > 3) {
                        // Only include high-value opportunities;
                        newOpportunities.push(opportunity);
                    }
                }
            }
            // Generate game-based opportunities;
            for (const i = 0; i < Math.min(games.length, 20); i++) {

                setState((prev) => ({ ...prev, scanProgress: 50 + (i / 20) * 50 }));

                newOpportunities.push(...gameOpportunities);
            }
            // Sort by value edge;
            newOpportunities.sort((a, b) => b.valueEdge - a.valueEdge);
            setOpportunities(newOpportunities.slice(0, 25)); // Keep top 25;
            setState((prev) => ({
                ...prev,
                isScanning: false,
                scanProgress: 100,
                lastScanTime: new Date(),
                alertsCount: newOpportunities.filter((o) => o.valueEdge > 8).length,
            }));
            // Generate enhanced portfolios;
            if (newOpportunities.length > 0) {
                await generatePortfolios(newOpportunities);
            }
            toast.success(`Found ${newOpportunities.length} opportunities from ${connectedSourcesCount} live data sources`);
        }
        catch (error) {
            // console statement removed
            setState((prev) => ({ ...prev, isScanning: false }));
            toast.error("Failed to generate opportunities");
        }
    }, [players, games, connectedSourcesCount, toast]);
    const generatePlayerPropOpportunity = (player, statType) => {
        try {






            const valueEdge = ((predictedProbability - impliedProbability) / impliedProbability) *
                100;
            if (valueEdge < 2)
                return null; // Skip low-value opportunities;
            return {
                id: `${player.id}_${statType}_${Date.now()}`,
                eventId: `game_${player.team}`,
                sport: player.sport,
                league: getLeagueForSport(player.sport),
                game: `${player.team} vs Opponent`,
                market: "player_props",
                description: `${player.name} ${prediction > baseLine ? "Over" : "Under"} ${baseLine} ${statType}`,
                currentOdds: odds,
                predictedProbability,
                valueEdge,
                kellyFraction: calculateKellyFraction(predictedProbability, odds),
                recommendedStake: calculateRecommendedStake(valueEdge, confidence, config.investmentAmount),
                confidence,
                riskLevel: getRiskLevel(confidence, valueEdge),
                maxStake: config.investmentAmount * (config.maxExposure / 100),
                expectedReturn: (predictedProbability * (odds - 1) - (1 - predictedProbability)) *
                    100,
                potentialPayout: 100 * odds,
                timeToStart: Math.random() * 24 * 60 * 60 * 1000, // Random time until game;
                liquidityScore: 0.8 + Math.random() * 0.2,
                marketEfficiency: 0.85 + Math.random() * 0.1,
                historicalPerformance: 0.6 + Math.random() * 0.3,
                mlFactors: {
                    momentum: player.recentForm;
                        ? player.recentForm.slice(-3).reduce((a, b) => a + b, 0) / 3;
                        : 0.5,
                    form: player.recentForm;
                        ? player.recentForm.slice(-5).reduce((a, b) => a + b, 0) / 5;
                        : 0.5,
                    headToHead: 0.5 + Math.random() * 0.3,
                    injuries: Math.random() < 0.1 ? 0.2 : 0.9, // 10% chance of injury impact;
                    weather: ["NFL", "MLB"].includes(player.sport)
                        ? 0.8 + Math.random() * 0.2;
                        : 1.0,
                    venue: 0.5 + Math.random() * 0.3,
                },
            };
        }
        catch (error) {
            // console statement removed
            return null;
        }
    };
    const generateGameOpportunities = (game) => {

        // Generate total line opportunity;
        const totalLine = 220 + Math.random() * 40; // Example total;






        if (totalValueEdge > 2) {
            opportunities.push({
                id: `${game.id}_total_${Date.now()}`,
                eventId: game.id,
                sport: game.sport,
                league: getLeagueForSport(game.sport),
                game: `${game.awayTeam} @ ${game.homeTeam}`,
                market: "totals",
                description: `${totalPrediction > totalLine ? "Over" : "Under"} ${totalLine.toFixed(1)}`,
                currentOdds: totalOdds,
                predictedProbability: totalPredictedProb,
                valueEdge: totalValueEdge,
                kellyFraction: calculateKellyFraction(totalPredictedProb, totalOdds),
                recommendedStake: calculateRecommendedStake(totalValueEdge, totalConfidence, config.investmentAmount),
                confidence: totalConfidence,
                riskLevel: getRiskLevel(totalConfidence, totalValueEdge),
                maxStake: config.investmentAmount * (config.maxExposure / 100),
                expectedReturn: (totalPredictedProb * (totalOdds - 1) - (1 - totalPredictedProb)) *
                    100,
                potentialPayout: 100 * totalOdds,
                timeToStart: new Date(game.gameTime).getTime() - Date.now(),
                liquidityScore: 0.9 + Math.random() * 0.1,
                marketEfficiency: 0.88 + Math.random() * 0.08,
                historicalPerformance: 0.65 + Math.random() * 0.25,
                mlFactors: {
                    momentum: 0.5 + Math.random() * 0.4,
                    form: 0.5 + Math.random() * 0.4,
                    headToHead: 0.4 + Math.random() * 0.5,
                    injuries: 0.8 + Math.random() * 0.2,
                    weather: ["NFL", "MLB"].includes(game.sport)
                        ? 0.7 + Math.random() * 0.3;
                        : 1.0,
                    venue: 0.5 + Math.random() * 0.4,
                },
            });
        }
        return opportunities;
    };
    const generatePortfolios = async (opps) => {

        // Single bet portfolios (top opportunities)
        opps.slice(0, 5).forEach((opp) => {
            newPortfolios.push({
                id: `single_${opp.id}`,
                legs: [opp],
                totalOdds: opp.currentOdds,
                totalStake: opp.recommendedStake,
                totalPayout: opp.recommendedStake * opp.currentOdds,
                expectedValue: opp.expectedReturn,
                riskScore: calculateRiskScore([opp]),
                diversificationScore: 0, // Single bet = no diversification;
                kellyScore: opp.kellyFraction,
                confidence: opp.confidence,
                type: "single",
            });
        });
        // Parlay portfolios;

        if (parlayLegs.length >= 2) {

            const parlayStake = config.investmentAmount * 0.05; // 5% for parlays;
            newPortfolios.push({
                id: `parlay_${Date.now()}`,
                legs: parlayLegs,
                totalOdds: parlayOdds,
                totalStake: parlayStake,
                totalPayout: parlayStake * parlayOdds,
                expectedValue: calculateParlayEV(parlayLegs),
                riskScore: calculateRiskScore(parlayLegs),
                diversificationScore: calculateDiversificationScore(parlayLegs),
                kellyScore: calculateAverageKelly(parlayLegs),
                confidence: parlayLegs.reduce((sum, leg) => sum + leg.confidence, 0) /
                    parlayLegs.length,
                type: "parlay",
            });
        }
        // Round robin portfolio;
        if (opps.length >= 4) {

            newPortfolios.push({
                id: `round_robin_${Date.now()}`,
                legs: rrLegs,
                totalOdds: calculateRoundRobinOdds(rrLegs),
                totalStake: config.investmentAmount * 0.15,
                totalPayout: calculateRoundRobinPayout(rrLegs, config.investmentAmount * 0.15),
                expectedValue: calculateRoundRobinEV(rrLegs),
                riskScore: calculateRiskScore(rrLegs) * 0.7, // Lower risk due to multiple combinations;
                diversificationScore: calculateDiversificationScore(rrLegs),
                kellyScore: calculateAverageKelly(rrLegs),
                confidence: rrLegs.reduce((sum, leg) => sum + leg.confidence, 0) / rrLegs.length,
                type: "round_robin",
            });
        }
        // Arbitrage opportunities;

        arbOpps.forEach((arbOpp) => {
            newPortfolios.push(arbOpp);
        });
        setPortfolios(newPortfolios.sort((a, b) => b.expectedValue - a.expectedValue));
    };
    const scanForOpportunities = useCallback(async () => {
        if (state.isScanning)
            return;
        await refreshData();
        await generateOpportunities();
    }, [state.isScanning, refreshData, generateOpportunities]);
    const toggleAutoMode = () => {
        setState((prev) => ({
            ...prev,
            isAutoMode: !prev.isAutoMode,
        }));
    };
    const filteredOpportunities = useMemo(() => {
        return opportunities;
            .filter((opp) => {
            if (filterCriteria.sport !== "all" &&
                opp.sport.toLowerCase() !== filterCriteria.sport.toLowerCase()) {
                return false;
            }
            if (filterCriteria.riskLevel !== "all" &&
                opp.riskLevel !== filterCriteria.riskLevel) {
                return false;
            }
            if (opp.confidence < filterCriteria.minConfidence) {
                return false;
            }
            if (opp.valueEdge < filterCriteria.minEdge) {
                return false;
            }
            return true;
        })
            .sort((a, b) => {

            return (a[sortBy] - b[sortBy]) * multiplier;
        });
    }, [opportunities, filterCriteria, sortBy, sortOrder]);
    const handleConfigChange = (key, value) => {
        setConfig((prev) => ({
            ...prev,
            [key]: value,
        }));
    };
    // Tab navigation;
    const renderTabContent = () => {
        switch (activeTab) {
            case "prizepicks":
                return _jsx(EnhancedPrizePicks, {});
            case "scanner":
                return renderScannerTab();
            case "portfolio":
                return renderPortfolioTab();
            case "analytics":
                return renderAnalyticsTab();
            default:
                return _jsx(EnhancedPrizePicks, {});
        }
    };
    const renderScannerTab = () => (_jsxs("div", { className: "space-y-6", children: [_jsxs(MegaCard, { className: "p-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-xl font-bold text-gray-900 dark:text-white", children: "Opportunity Scanner" }), _jsxs("p", { className: "text-gray-600 dark:text-gray-400", children: ["Real-time analysis of ", connectedSourcesCount, " live data sources"] })] }), _jsxs("div", { className: "flex items-center space-x-4", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("div", { className: `w-3 h-3 rounded-full ${state.systemHealth === "excellent" ? "bg-green-400" : "bg-yellow-400"} animate-pulse` }), _jsx("span", { className: "text-sm font-medium", children: connectionStatus })] }), _jsx(MegaButton, { onClick: toggleAutoMode, variant: state.isAutoMode ? "primary" : "secondary", size: "sm", icon: state.isAutoMode ? (_jsx(Pause, { className: "w-4 h-4" })) : (_jsx(Play, { className: "w-4 h-4" })), children: state.isAutoMode ? "Auto ON" : "Auto OFF" }), _jsx(MegaButton, { onClick: scanForOpportunities, disabled: state.isScanning, size: "sm", icon: _jsx(RefreshCw, { className: `w-4 h-4 ${state.isScanning ? "animate-spin" : ""}` }), children: state.isScanning ? "Scanning..." : "Scan Now" })] })] }), state.isScanning && (_jsxs("div", { className: "mb-6", children: [_jsxs("div", { className: "flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2", children: [_jsx("span", { children: "Scanning opportunities..." }), _jsxs("span", { children: [state.scanProgress.toFixed(0), "%"] })] }), _jsx("div", { className: "w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2", children: _jsx("div", { className: "bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300", style: { width: `${state.scanProgress}%` } }) })] })), _jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: [_jsxs("div", { className: "bg-gray-50 dark:bg-gray-800 p-4 rounded-lg", children: [_jsx("div", { className: "text-2xl font-bold text-blue-600", children: opportunities.length }), _jsx("div", { className: "text-sm text-gray-600 dark:text-gray-400", children: "Opportunities" })] }), _jsxs("div", { className: "bg-gray-50 dark:bg-gray-800 p-4 rounded-lg", children: [_jsx("div", { className: "text-2xl font-bold text-green-600", children: state.alertsCount }), _jsx("div", { className: "text-sm text-gray-600 dark:text-gray-400", children: "High Value" })] }), _jsxs("div", { className: "bg-gray-50 dark:bg-gray-800 p-4 rounded-lg", children: [_jsxs("div", { className: "text-2xl font-bold text-purple-600", children: [(dataQuality * 100).toFixed(1), "%"] }), _jsx("div", { className: "text-sm text-gray-600 dark:text-gray-400", children: "Data Quality" })] }), _jsxs("div", { className: "bg-gray-50 dark:bg-gray-800 p-4 rounded-lg", children: [_jsx("div", { className: "text-2xl font-bold text-orange-600", children: portfolios.length }), _jsx("div", { className: "text-sm text-gray-600 dark:text-gray-400", children: "Portfolios" })] })] })] }), _jsxs(MegaCard, { className: "p-6", children: [_jsx("h4", { className: "text-lg font-semibold mb-4", children: "Filters & Sorting" }), _jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2", children: "Sport" }), _jsxs("select", { value: filterCriteria.sport, onChange: (e) => setFilterCriteria((prev) => ({
                                            ...prev,
                                            sport: e.target.value,
                                        })), className: "w-full p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-600", children: [_jsx("option", { value: "all", children: "All Sports" }), _jsx("option", { value: "nba", children: "NBA" }), _jsx("option", { value: "nfl", children: "NFL" }), _jsx("option", { value: "mlb", children: "MLB" }), _jsx("option", { value: "nhl", children: "NHL" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2", children: "Risk Level" }), _jsxs("select", { value: filterCriteria.riskLevel, onChange: (e) => setFilterCriteria((prev) => ({
                                            ...prev,
                                            riskLevel: e.target.value,
                                        })), className: "w-full p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-600", children: [_jsx("option", { value: "all", children: "All Levels" }), _jsx("option", { value: "low", children: "Low Risk" }), _jsx("option", { value: "medium", children: "Medium Risk" }), _jsx("option", { value: "high", children: "High Risk" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2", children: "Min Confidence" }), _jsx("input", { type: "range", min: "0", max: "100", value: filterCriteria.minConfidence, onChange: (e) => setFilterCriteria((prev) => ({
                                            ...prev,
                                            minConfidence: Number(e.target.value),
                                        })), className: "w-full" }), _jsxs("div", { className: "text-sm text-gray-600", children: [filterCriteria.minConfidence, "%"] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2", children: "Min Edge" }), _jsx("input", { type: "range", min: "0", max: "20", value: filterCriteria.minEdge, onChange: (e) => setFilterCriteria((prev) => ({
                                            ...prev,
                                            minEdge: Number(e.target.value),
                                        })), className: "w-full" }), _jsxs("div", { className: "text-sm text-gray-600", children: [filterCriteria.minEdge, "%"] })] })] })] }), _jsxs(MegaCard, { className: "p-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsxs("h4", { className: "text-lg font-semibold", children: ["Opportunities (", filteredOpportunities.length, ")"] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsxs("select", { value: sortBy, onChange: (e) => setSortBy(e.target.value), className: "p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-600", children: [_jsx("option", { value: "valueEdge", children: "Value Edge" }), _jsx("option", { value: "confidence", children: "Confidence" }), _jsx("option", { value: "expectedReturn", children: "Expected Return" }), _jsx("option", { value: "timeToStart", children: "Time to Start" })] }), _jsx(MegaButton, { onClick: () => setSortOrder((prev) => (prev === "desc" ? "asc" : "desc")), size: "sm", icon: _jsx(SortDesc, { className: "w-4 h-4" }), children: sortOrder.toUpperCase() })] })] }), _jsx("div", { className: "space-y-4", children: filteredOpportunities.slice(0, 10).map((opportunity) => (_jsx(OpportunityCard, { opportunity: opportunity, onSelect: () => setSelectedOpportunity(opportunity), isSelected: selectedOpportunity?.id === opportunity.id }, opportunity.id))) })] })] }));


    return (_jsx(CyberContainer, { className: "min-h-screen p-6", children: _jsxs("div", { className: "max-w-7xl mx-auto", children: [_jsxs("div", { className: "mb-8", children: [_jsxs("div", { className: "flex items-center space-x-4 mb-4", children: [_jsx("div", { className: "p-3 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl", children: _jsx(DollarSign, { className: "w-8 h-8 text-white" }) }), _jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent", children: "Universal Money Maker" }), _jsx("p", { className: "text-gray-600 dark:text-gray-400", children: "AI-powered sports betting intelligence with real-time data integration" })] })] }), _jsx("div", { className: "flex space-x-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg", children: [
                                { id: "prizepicks", label: "PrizePicks", icon: Target },
                                { id: "scanner", label: "Scanner", icon: Eye },
                                { id: "portfolio", label: "Portfolio", icon: BarChart3 },
                                { id: "analytics", label: "Analytics", icon: Activity },
                            ].map((tab) => (_jsxs("button", { onClick: () => setActiveTab(tab.id), className: `flex items-center space-x-2 px-4 py-2 rounded-md font-medium transition-all ${activeTab === tab.id;
                                    ? "bg-white dark:bg-gray-700 text-blue-600 shadow-sm"
                                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"}`, children: [_jsx(tab.icon, { className: "w-4 h-4" }), _jsx("span", { children: tab.label })] }, tab.id))) })] }), _jsx(AnimatePresence, { mode: "wait", children: _jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -20 }, transition: { duration: 0.2 }, children: renderTabContent() }, activeTab) })] }) }));
};
// Helper Components;
const OpportunityCard = ({ opportunity, onSelect, isSelected }) => (_jsxs("div", { className: `p-4 border rounded-lg cursor-pointer transition-all ${isSelected;
        ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
        : "border-gray-200 dark:border-gray-700 hover:border-gray-300"}`, onClick: onSelect, children: [_jsxs("div", { className: "flex justify-between items-start mb-2", children: [_jsxs("div", { children: [_jsx("h5", { className: "font-semibold", children: opportunity.description }), _jsx("p", { className: "text-sm text-gray-600", children: opportunity.game })] }), _jsxs("div", { className: "text-right", children: [_jsxs("div", { className: "text-lg font-bold text-green-600", children: ["+", opportunity.valueEdge.toFixed(1), "%"] }), _jsx("div", { className: "text-sm text-gray-600", children: "Edge" })] })] }), _jsxs("div", { className: "flex justify-between items-center text-sm", children: [_jsxs("div", { className: "flex space-x-4", children: [_jsxs("span", { children: ["Confidence: ", opportunity.confidence.toFixed(0), "%"] }), _jsxs("span", { children: ["Odds: ", opportunity.currentOdds.toFixed(2)] }), _jsx("span", { className: `px-2 py-1 rounded text-xs ${opportunity.riskLevel === "low"
                                ? "bg-green-100 text-green-800"
                                : opportunity.riskLevel === "medium"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-red-100 text-red-800"}`, children: opportunity.riskLevel.toUpperCase() })] }), _jsxs("div", { className: "text-gray-600", children: ["$", opportunity.recommendedStake.toFixed(0), " \u2192 $", opportunity.potentialPayout.toFixed(0)] })] })] }));

// Helper Functions;
const getStatTypesForSport = (sport) => {
    const statTypes = {
        NBA: [
            "Points",
            "Rebounds",
            "Assists",
            "3-Pointers Made",
            "Steals",
            "Blocks",
        ],
        NFL: [
            "Passing Yards",
            "Rushing Yards",
            "Receptions",
            "Receiving Yards",
            "Touchdowns",
        ],
        MLB: ["Hits", "RBIs", "Runs", "Home Runs", "Strikeouts"],
        NHL: ["Goals", "Assists", "Shots", "Points"],
    };
    return statTypes[sport] || ["Points"];
};
const getLeagueForSport = (sport) => {
    const leagues = {
        NBA: "NBA",
        NFL: "NFL",
        MLB: "MLB",
        NHL: "NHL",
    };
    return leagues[sport] || sport;
};
const calculateBaseLine = (player, statType) => {


    return stats[statKey] || 10 + Math.random() * 20;
};
const calculatePrediction = (player, statType, baseLine) => {


    const adjustment = (formFactor - 0.5) * 0.3; // ±30% based on form;
    return baseLine * (1 + adjustment);
};
const calculateConfidence = (player, statType, prediction, baseLine) => {


    const confidenceAdjustment = predictionDiff * 20; // Higher difference = higher confidence;
    return Math.min(95, Math.max(55, baseConfidence + confidenceAdjustment + Math.random() * 10));
};
const generateOdds = (prediction, baseLine) => {


    return baseOdds + diff * 0.3 + (Math.random() * 0.2 - 0.1);
};
const oddsToImpliedProbability = (odds) => {
    return 1 / odds;
};
const calculateKellyFraction = (probability, odds) => {


    return Math.max(0, (b * probability - q) / b);
};
const calculateRecommendedStake = (valueEdge, confidence, bankroll) => {
    const baseStake = bankroll * 0.02; // 2% base stake;
    const edgeMultiplier = valueEdge / 10; // Scale by edge;

    return Math.min(bankroll * 0.05, baseStake * edgeMultiplier * confidenceMultiplier);
};
const getRiskLevel = (confidence, valueEdge) => {
    if (confidence > 80 && valueEdge > 6)
        return "low";
    if (confidence > 70 && valueEdge > 4)
        return "medium";
    return "high";
};
const calculateRiskScore = (opportunities) => {
    const avgConfidence = opportunities.reduce((sum, opp) => sum + opp.confidence, 0) /
        opportunities.length;
    return (100 - avgConfidence) / 100;
};
const calculateDiversificationScore = (opportunities) => {


    return (sports.size + markets.size) / (opportunities.length * 2);
};
const calculateAverageKelly = (opportunities) => {
    return (opportunities.reduce((sum, opp) => sum + opp.kellyFraction, 0) /
        opportunities.length);
};
const calculateParlayEV = (legs) => {


    return (combinedProb * (combinedOdds - 1) - (1 - combinedProb)) * 100;
};
const calculateRoundRobinOdds = (legs) => {
    // Simplified calculation - average of all possible 2-leg parlays;
    const totalOdds = 0;
    const combinations = 0;
    for (const i = 0; i < legs.length; i++) {
        for (const j = i + 1; j < legs.length; j++) {
            totalOdds += legs[i].currentOdds * legs[j].currentOdds;
            combinations++;
        }
    }
    return combinations > 0 ? totalOdds / combinations : 1;
};
const calculateRoundRobinPayout = (legs, totalStake) => {

    return totalStake * averageOdds;
};
const calculateRoundRobinEV = (legs) => {
    // Calculate EV for round robin as average of all 2-leg parlay EVs;
    const totalEV = 0;
    const combinations = 0;
    for (const i = 0; i < legs.length; i++) {
        for (const j = i + 1; j < legs.length; j++) {

            totalEV += ev;
            combinations++;
        }
    }
    return combinations > 0 ? totalEV / combinations : 0;
};
const findArbitrageOpportunities = (opportunities) => {
    // Simplified arbitrage detection - look for complementary bets;

    // Group by game;
    const gameGroups = opportunities.reduce((groups, opp) => {
        if (!groups[opp.game])
            groups[opp.game] = [];
        groups[opp.game].push(opp);
        return groups;
    }, {});
    Object.values(gameGroups).forEach((gameOpps) => {
        if (gameOpps.length >= 2) {
            // Look for opposite sides with combined implied probability < 1;
            for (const i = 0; i < gameOpps.length; i++) {
                for (const j = i + 1; j < gameOpps.length; j++) {




                    if (prob1 + prob2 < 0.95) {
                        // 5% arbitrage opportunity;

                        arbPortfolios.push({
                            id: `arb_${opp1.id}_${opp2.id}`,
                            legs: [opp1, opp2],
                            totalOdds: (opp1.currentOdds + opp2.currentOdds) / 2,
                            totalStake: 1000, // Fixed stake for arbitrage;
                            totalPayout: 1000 * (1 + profit / 100),
                            expectedValue: profit,
                            riskScore: 0, // Arbitrage is risk-free;
                            diversificationScore: 0.5,
                            kellyScore: 1, // Max Kelly for arbitrage;
                            confidence: 100, // Guaranteed profit;
                            type: "arbitrage",
                        });
                    }
                }
            }
        }
    });
    return arbPortfolios;
};
export default UniversalMoneyMaker;
