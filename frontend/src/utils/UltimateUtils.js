/**
 * 🚀 A1BETTING QUANTUM PLATFORM - ULTIMATE UTILITIES CONSOLIDATION;
 *
 * Consolidates 200+ scattered utilities into organized categories;
 * Preserves all functionality while maintaining cyber theme integration;
 */
// ===============================
// 🎯 CORE UTILITIES;
// ===============================
export const CoreUtils = {
    // Unique ID generation;
    generateId: (prefix = "id") => {
        return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    },
    // Debounce function;
    debounce: (func, wait) => {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func(...args), wait);
        };
    },
    // Throttle function;
    throttle: (func, limit) => {
        let inThrottle;
        return (...args) => {
            if (!inThrottle) {
                func(...args);
                inThrottle = true;
                setTimeout(() => (inThrottle = false), limit);
            }
        };
    },
    // Deep clone object;
    deepClone: (obj) => {
        if (obj === null || typeof obj !== "object")
            return obj;
        if (obj instanceof Date)
            return new Date(obj.getTime());
        if (obj instanceof Array)
            return obj.map((item) => CoreUtils.deepClone(item));
        if (typeof obj === "object") {

            Object.keys(obj).forEach((key) => {
                cloned[key] = CoreUtils.deepClone(obj[key]);
            });
            return cloned;
        }
        return obj;
    },
    // Safe JSON parse;
    safeJsonParse: (json, fallback) => {
        try {
            return JSON.parse(json);
        }
        catch {
            return fallback;
        }
    },
    // Format currency;
    formatCurrency: (amount, currency = "USD") => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency,
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(amount);
    },
    // Format percentage;
    formatPercentage: (value, decimals = 1) => {
        return `${value.toFixed(decimals)}%`;
    },
    // Clamp number between min and max;
    clamp: (value, min, max) => {
        return Math.min(Math.max(value, min), max);
    },
    // Generate random number in range;
    randomInRange: (min, max) => {
        return Math.random() * (max - min) + min;
    },
};
// ===============================
// 🎲 ODDS & BETTING UTILITIES;
// ===============================
export const OddsUtils = {
    // Convert American odds to decimal;
    americanToDecimal: (odds) => {
        if (odds > 0) {
            return odds / 100 + 1;
        }
        else {
            return 100 / Math.abs(odds) + 1;
        }
    },
    // Convert decimal odds to American;
    decimalToAmerican: (decimal) => {
        if (decimal >= 2) {
            return Math.round((decimal - 1) * 100);
        }
        else {
            return Math.round(-100 / (decimal - 1));
        }
    },
    // Convert odds to implied probability;
    oddsToImpliedProbability: (odds) => {
        const decimal = typeof odds === "number" && odds > 0;
            ? OddsUtils.americanToDecimal(odds)
            : odds;
        return (1 / decimal) * 100;
    },
    // Calculate potential payout;
    calculatePayout: (stake, odds) => {

        return stake * decimal;
    },
    // Calculate profit;
    calculateProfit: (stake, odds) => {
        return OddsUtils.calculatePayout(stake, odds) - stake;
    },
    // Calculate parlay odds;
    calculateParlayOdds: (odds) => {


        return OddsUtils.decimalToAmerican(combinedDecimal);
    },
    // Kelly Criterion calculator;
    kellyStake: (bankroll, odds, winProbability) => {


        return Math.max(0, kellyFraction * bankroll);
    },
    // Calculate arbitrage opportunity;
    calculateArbitrage: (odds1, odds2) => {





        const totalStake = 100; // Example $100 total;


        return {
            isArbitrage,
            profit,
            stakes: { bet1: stake1, bet2: stake2 },
        };
    },
};
// ===============================
// 📊 ANALYTICS UTILITIES;
// ===============================
export const AnalyticsUtils = {
    // Calculate win rate;
    calculateWinRate: (wins, total) => {
        return total > 0 ? (wins / total) * 100 : 0;
    },
    // Calculate ROI;
    calculateROI: (profit, investment) => {
        return investment > 0 ? (profit / investment) * 100 : 0;
    },
    // Calculate Sharpe ratio;
    calculateSharpeRatio: (returns, riskFreeRate = 0.02) => {

        const variance = returns.reduce((sum, r) => sum + Math.pow(r - avgReturn, 2), 0) /
            returns.length;

        return standardDeviation > 0;
            ? (avgReturn - riskFreeRate) / standardDeviation;
            : 0;
    },
    // Calculate maximum drawdown;
    calculateMaxDrawdown: (values) => {
        const maxDrawdown = 0;
        const peak = values[0];
        for (const value of values) {
            if (value > peak) {
                peak = value;
            }

            maxDrawdown = Math.max(maxDrawdown, drawdown);
        }
        return maxDrawdown * 100;
    },
    // Calculate streak (winning or losing)
    calculateStreak: (results) => {
        if (results.length === 0)
            return { current: 0, max: 0, type: "win" };
        const currentStreak = 1;
        const maxStreak = 1;
        const currentType = results[results.length - 1] ? "win" : "loss";
        for (const i = results.length - 2; i >= 0; i--) {
            if (results[i] === results[i + 1]) {
                currentStreak++;
                maxStreak = Math.max(maxStreak, currentStreak);
            }
            else {
                break;
            }
        }
        return { current: currentStreak, max: maxStreak, type: currentType };
    },
    // Calculate confidence interval;
    calculateConfidenceInterval: (data, confidence = 0.95) => {





        return {
            lower: sorted[lowerIndex],
            upper: sorted[upperIndex],
            mean,
        };
    },
};
// ===============================
// 🕒 DATE & TIME UTILITIES;
// ===============================
export const DateUtils = {
    // Format date for display;
    formatDate: (date, format = "MMM dd, yyyy") => {

        const formats = {
            "MMM dd, yyyy": d.toLocaleDateString("en-US", {
                month: "short",
                day: "2-digit",
                year: "numeric",
            }),
            "dd/MM/yyyy": d.toLocaleDateString("en-GB"),
            "yyyy-MM-dd": d.toISOString().split("T")[0],
            full: d.toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
            }),
        };
        return formats[format] || d.toLocaleDateString();
    },
    // Format time;
    formatTime: (date, includeSeconds = false) => {

        const options = {
            hour: "2-digit",
            minute: "2-digit",
            ...(includeSeconds && { second: "2-digit" }),
        };
        return d.toLocaleTimeString("en-US", options);
    },
    // Get relative time (e.g., "2 hours ago")
    getRelativeTime: (date) => {






        if (diffMinutes < 1)
            return "Just now";
        if (diffMinutes < 60)
            return `${diffMinutes}m ago`;
        if (diffHours < 24)
            return `${diffHours}h ago`;
        if (diffDays < 7)
            return `${diffDays}d ago`;
        return DateUtils.formatDate(target);
    },
    // Check if date is today;
    isToday: (date) => {


        return d.toDateString() === today.toDateString();
    },
    // Get business days between dates;
    getBusinessDays: (startDate, endDate) => {


        const businessDays = 0;
        while (start <= end) {

            if (dayOfWeek !== 0 && dayOfWeek !== 6) {
                // Not Sunday or Saturday;
                businessDays++;
            }
            start.setDate(start.getDate() + 1);
        }
        return businessDays;
    },
};
// ===============================
// 🔒 VALIDATION UTILITIES;
// ===============================
export const ValidationUtils = {
    // Email validation;
    isValidEmail: (email) => {

        return emailRegex.test(email);
    },
    // Phone validation;
    isValidPhone: (phone) => {

        return phoneRegex.test(phone);
    },
    // Password strength validation;
    getPasswordStrength: (password) => {

        const score = 0;
        if (password.length >= 8)
            score += 1;
        else;
            feedback.push("At least 8 characters");
        if (/[a-z]/.test(password))
            score += 1;
        else;
            feedback.push("Include lowercase letters");
        if (/[A-Z]/.test(password))
            score += 1;
        else;
            feedback.push("Include uppercase letters");
        if (/\d/.test(password))
            score += 1;
        else;
            feedback.push("Include numbers");
        if (/[!@#$%^&*(),.?":{}|<>]/.test(password))
            score += 1;
        else;
            feedback.push("Include special characters");
        return {
            score,
            feedback,
            isStrong: score >= 4,
        };
    },
    // URL validation;
    isValidUrl: (url) => {
        try {
            new URL(url);
            return true;
        }
        catch {
            return false;
        }
    },
    // Credit card validation (Luhn algorithm)
    isValidCreditCard: (cardNumber) => {

        if (clean.length < 13 || clean.length > 19)
            return false;
        const sum = 0;
        const isEven = false;
        for (const i = clean.length - 1; i >= 0; i--) {
            const digit = parseInt(clean[i]);
            if (isEven) {
                digit *= 2;
                if (digit > 9)
                    digit -= 9;
            }
            sum += digit;
            isEven = !isEven;
        }
        return sum % 10 === 0;
    },
};
// ===============================
// 🎨 UI & STYLING UTILITIES;
// ===============================
export const UIUtils = {
    // Class name combiner;
    cn: (...classes) => {
        return classes.filter(Boolean).join(" ");
    },
    // Generate cyber theme colors;
    getCyberColor: (type) => {
        const colors = {
            primary: "#06ffa5",
            secondary: "#00ff88",
            accent: "#00d4ff",
            danger: "#ff4757",
            warning: "#ffc107",
            success: "#06ffa5",
        };
        return colors[type];
    },
    // Generate gradient backgrounds;
    getCyberGradient: (type) => {
        const gradients = {
            background: "linear-gradient(135deg, rgb(15, 23, 42) 0%, rgb(124, 58, 237) 50%, rgb(15, 23, 42) 100%)",
            button: "linear-gradient(135deg, rgba(6, 255, 165, 0.8), rgba(0, 255, 136, 0.6))",
            card: "linear-gradient(45deg, #00ff88, #00d4ff)",
        };
        return gradients[type];
    },
    // Generate glass morphism styles;
    getGlassStyles: (intensity = "medium") => {
        const styles = {
            light: {
                backdropFilter: "blur(10px) saturate(150%)",
                backgroundColor: "rgba(255, 255, 255, 0.02)",
                border: "1px solid rgba(255, 255, 255, 0.05)",
            },
            medium: {
                backdropFilter: "blur(20px) saturate(180%)",
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
            },
            heavy: {
                backdropFilter: "blur(40px) saturate(200%)",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
            },
        };
        return styles[intensity];
    },
    // Animate element entrance;
    animateEntrance: (element, type = "fade") => {
        const animations = {
            fade: [{ opacity: 0 }, { opacity: 1 }],
            slide: [
                { transform: "translateY(20px)", opacity: 0 },
                { transform: "translateY(0)", opacity: 1 },
            ],
            scale: [
                { transform: "scale(0.9)", opacity: 0 },
                { transform: "scale(1)", opacity: 1 },
            ],
        };
        element.animate(animations[type], {
            duration: 300,
            easing: "ease-out",
            fill: "forwards",
        });
    },
    // Generate responsive breakpoint styles;
    getBreakpointStyles: (breakpoint) => {
        const breakpoints = {
            sm: "@media (min-width: 640px)",
            md: "@media (min-width: 768px)",
            lg: "@media (min-width: 1024px)",
            xl: "@media (min-width: 1280px)",
        };
        return breakpoints[breakpoint];
    },
};
// ===============================
// 🚀 PERFORMANCE UTILITIES;
// ===============================
export const PerformanceUtils = {
    // Measure function execution time;
    measureTime: async (fn, label) => {




        if (label) {
            // console statement removed}ms`);
        }
        return { result, time };
    },
    // Memory usage tracking;
    getMemoryUsage: () => {
        if ("memory" in performance) {

            return {
                used: memory.usedJSHeapSize,
                total: memory.totalJSHeapSize,
                percentage: (memory.usedJSHeapSize / memory.totalJSHeapSize) * 100,
            };
        }
        return null;
    },
    // Lazy loading utility;
    lazyLoad: (factory) => {
        const promise = null;
        return () => {
            if (!promise) {
                promise = factory();
            }
            return promise;
        };
    },
    // Batch operations;
    batch: (items, batchSize, processor) => {
        return new Promise(async (resolve) => {

            for (const i = 0; i < items.length; i += batchSize) {


                results.push(...batchResults);
            }
            resolve(results);
        });
    },
};
// ===============================
// 🔧 ERROR HANDLING UTILITIES;
// ===============================
export const ErrorUtils = {
    // Safe function execution;
    safeExecute: (fn, fallback, onError) => {
        try {
            return fn();
        }
        catch (error) {
            if (onError) {
                onError(error);
            }
            return fallback;
        }
    },
    // Async safe execution;
    safeExecuteAsync: async (fn, fallback, onError) => {
        try {
            return await fn();
        }
        catch (error) {
            if (onError) {
                onError(error);
            }
            return fallback;
        }
    },
    // Error message extraction;
    getErrorMessage: (error) => {
        if (typeof error === "string")
            return error;
        if (error instanceof Error)
            return error.message;
        if (error && typeof error === "object" && "message" in error) {
            return String(error.message);
        }
        return "An unknown error occurred";
    },
    // Retry mechanism;
    retry: async (fn, maxAttempts = 3, delay = 1000) => {
        for (const attempt = 1; attempt <= maxAttempts; attempt++) {
            try {
                return await fn();
            }
            catch (error) {
                if (attempt === maxAttempts) {
                    throw error;
                }
                await new Promise((resolve) => setTimeout(resolve, delay * attempt));
            }
        }
        throw new Error("Retry failed");
    },
};
// ===============================
// 📦 EXPORT ALL UTILITIES;
// ===============================
export const UltimateUtils = {
    Core: CoreUtils,
    Odds: OddsUtils,
    Analytics: AnalyticsUtils,
    Date: DateUtils,
    Validation: ValidationUtils,
    UI: UIUtils,
    Performance: PerformanceUtils,
    Error: ErrorUtils,
};
export default UltimateUtils;
