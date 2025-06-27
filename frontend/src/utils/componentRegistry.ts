/**
 * Component Enhancement Registry;
 * Tracks component status and enhancements across the application;
 */

interface ComponentStatus {
  name: string;
  path: string;
  version: string;
  status: "production" | "enhanced" | "legacy" | "deprecated";
  features: string[];
  lastUpdated: Date;
  performance: {
    renderTime: number;
    memoryUsage: number;
    optimizationLevel: "basic" | "optimized" | "ultra";
  };
  dependencies: string[];
  consolidatedFrom?: string[];
}

class ComponentRegistry {
  private components: Map<string, ComponentStatus> = new Map();

  constructor() {
    this.initializeProductionComponents();
  }

  private initializeProductionComponents() {
    // Register main production components;
    this.registerComponent({
      name: "UserFriendlyApp",
      path: "src/components/user-friendly/UserFriendlyApp.tsx",
      version: "2.0.0",
      status: "enhanced",
      features: [
        "Real-time WebSocket integration",
        "Enhanced animations with Framer Motion",
        "Responsive design with mobile optimization",
        "Performance optimized with React.memo and useCallback",
        "Comprehensive error handling",
        "Cyber-themed design system",
        "Multi-tab navigation",
        "Live data integration",
        "Health monitoring",
        "User profile management",
      ],
      lastUpdated: new Date(),
      performance: {
        renderTime: 8.5,
        memoryUsage: 2.1,
        optimizationLevel: "ultra",
      },
      dependencies: [
        "framer-motion",
        "@tanstack/react-query",
        "react-hot-toast",
        "lucide-react",
      ],
      consolidatedFrom: [
        "EnhancedUserFriendlyApp.tsx",
        "UserFriendlyApp_Production.tsx",
        "UserFriendlyApp-Complete.tsx",
        "UserFriendlyApp-Clean.tsx",
        "UserFriendlyApp_fixed.tsx",
        "UserFriendlyApp-fixed.tsx",
      ],
    });

    this.registerComponent({
      name: "UserFriendlyDashboard",
      path: "src/components/user-friendly/UserFriendlyDashboard.tsx",
      version: "1.8.0",
      status: "enhanced",
      features: [
        "Live stats grid with real-time updates",
        "Interactive AI processing activity feed",
        "Quick action cards with navigation",
        "Live games analysis panel",
        "Animated components with hover effects",
        "Offline indicator with retry functionality",
        "Backend health monitoring",
        "Performance metrics display",
      ],
      lastUpdated: new Date(),
      performance: {
        renderTime: 12.3,
        memoryUsage: 1.8,
        optimizationLevel: "optimized",
      },
      dependencies: ["framer-motion", "lucide-react", "@tanstack/react-query"],
      consolidatedFrom: ["UserFriendlyDashboard_Production.tsx"],
    });

    this.registerComponent({
      name: "MoneyMakerPro",
      path: "src/components/user-friendly/MoneyMakerPro.tsx",
      version: "1.9.0",
      status: "enhanced",
      features: [
        "Kelly criterion calculator",
        "Arbitrage opportunity scanner",
        "Portfolio management interface",
        "Risk management tools",
        "Value betting identification",
        "Real-time opportunity tracking",
        "Performance analytics dashboard",
        "Enhanced animations and interactions",
      ],
      lastUpdated: new Date(),
      performance: {
        renderTime: 15.2,
        memoryUsage: 2.5,
        optimizationLevel: "optimized",
      },
      dependencies: ["@heroicons/react", "framer-motion", "react-hot-toast"],
      consolidatedFrom: [],
    });

    this.registerComponent({
      name: "PrizePicksProNew",
      path: "src/components/user-friendly/PrizePicksProNew.tsx",
      version: "1.7.0",
      status: "production",
      features: [
        "Player prop analysis",
        "Lineup builder with drag-and-drop",
        "Multiplier calculations (2x to 40x)",
        "Demon/Goblin pick identification",
        "Confidence scoring system",
        "Entry fee optimization",
        "Real-time prop updates",
      ],
      lastUpdated: new Date(),
      performance: {
        renderTime: 18.7,
        memoryUsage: 2.8,
        optimizationLevel: "basic",
      },
      dependencies: ["lucide-react", "@heroicons/react"],
      consolidatedFrom: [
        "PrizePicksPro.tsx",
        "PrizePicksProClean.tsx",
        "PrizePicksProNew2.tsx",
      ],
    });

    this.registerComponent({
      name: "PropOllama",
      path: "src/components/user-friendly/PropOllama.tsx",
      version: "1.5.0",
      status: "production",
      features: [
        "AI-powered sports discussion",
        "Real-time analysis capabilities",
        "Expert prediction integration",
        "Chat interface with sports context",
        "Voice input support (planned)",
        "Conversation history",
      ],
      lastUpdated: new Date(),
      performance: {
        renderTime: 22.1,
        memoryUsage: 3.2,
        optimizationLevel: "basic",
      },
      dependencies: ["@heroicons/react", "react-hot-toast"],
      consolidatedFrom: [],
    });

    this.registerComponent({
      name: "CleanAdvancedIntelligenceHub",
      path: "src/components/intelligence/CleanAdvancedIntelligenceHub.tsx",
      version: "1.6.0",
      status: "production",
      features: [
        "Advanced analytics dashboard",
        "ML model monitoring",
        "System performance tracking",
        "Module management interface",
        "Real-time accuracy metrics",
        "Health status monitoring",
      ],
      lastUpdated: new Date(),
      performance: {
        renderTime: 25.8,
        memoryUsage: 4.1,
        optimizationLevel: "basic",
      },
      dependencies: ["framer-motion", "lucide-react", "@tanstack/react-query"],
      consolidatedFrom: [],
    });
  }

  registerComponent(component: ComponentStatus) {
    this.components.set(component.name, component);
  }

  getComponent(name: string): ComponentStatus | undefined {
    return this.components.get(name);
  }

  getAllComponents(): ComponentStatus[] {
    return Array.from(this.components.values());
  }

  getComponentsByStatus(status: ComponentStatus["status"]): ComponentStatus[] {
    return this.getAllComponents().filter((comp) => comp.status === status);
  }

  updateComponentStatus(name: string, updates: Partial<ComponentStatus>) {

    if (existing) {
      this.components.set(name, {
        ...existing,
        ...updates,
        lastUpdated: new Date(),
      });
    }
  }

  getConsolidationReport() {

    const totalConsolidated = allComponents.reduce(
      (sum, comp) => sum + (comp.consolidatedFrom?.length || 0),
      0,
    );

    return {
      totalComponents: allComponents.length,
      productionComponents: this.getComponentsByStatus("production").length,
      enhancedComponents: this.getComponentsByStatus("enhanced").length,
      legacyComponents: this.getComponentsByStatus("legacy").length,
      totalConsolidated,
      consolidationRatio: totalConsolidated / allComponents.length,
      averagePerformance: {
        renderTime:
          allComponents.reduce(
            (sum, comp) => sum + comp.performance.renderTime,
            0,
          ) / allComponents.length,
        memoryUsage:
          allComponents.reduce(
            (sum, comp) => sum + comp.performance.memoryUsage,
            0,
          ) / allComponents.length,
      },
      optimizationDistribution: {
        ultra: allComponents.filter(
          (comp) => comp.performance.optimizationLevel === "ultra",
        ).length,
        optimized: allComponents.filter(
          (comp) => comp.performance.optimizationLevel === "optimized",
        ).length,
        basic: allComponents.filter(
          (comp) => comp.performance.optimizationLevel === "basic",
        ).length,
      },
    };
  }
}

export const componentRegistry = new ComponentRegistry();
export type { ComponentStatus };
