#!/usr/bin/env node;

/**
 * Comprehensive Import Migration Script - Phase 3;
 *
 * Automatically updates all import statements to use the new Universal Systems;
 */


// ============================================================================
// MIGRATION MAPPINGS;
// ============================================================================

const importMappings = {
  // MoneyMaker consolidation;
  "import MoneyMaker from './MoneyMaker'":
    "import { UniversalMoneyMaker as MoneyMaker } from '../index'",
  "import MoneyMaker from './modern/MoneyMaker'":
    "import { UniversalMoneyMaker as MoneyMaker } from '../index'",
  "import { MoneyMaker }": "import { UniversalMoneyMaker as MoneyMaker }",
  "import { UltimateMoneyMaker }":
    "import { UniversalMoneyMaker as UltimateMoneyMaker }",
  "import UltimateMoneyMaker":
    "import { UniversalMoneyMaker as UltimateMoneyMaker } from '../index'",
  "import { MoneyMakerAdvanced }":
    "import { UniversalMoneyMaker as MoneyMakerAdvanced }",
  "import { CyberUltimateMoneyMaker }":
    "import { UniversalMoneyMaker as CyberUltimateMoneyMaker }",

  // Analytics consolidation;
  "import { AdvancedAnalytics }":
    "import { UniversalAnalytics as AdvancedAnalytics }",
  "import AdvancedAnalytics":
    "import { UniversalAnalytics as AdvancedAnalytics } from '../index'",
  "import { AdvancedAnalyticsHub }":
    "import { UniversalAnalytics as AdvancedAnalyticsHub }",
  "import AdvancedAnalyticsHub":
    "import { UniversalAnalytics as AdvancedAnalyticsHub } from '../index'",
  "import { CyberAnalyticsHub }":
    "import { UniversalAnalytics as CyberAnalyticsHub }",
  "import { PerformanceAnalyticsDashboard }":
    "import { UniversalAnalytics as PerformanceAnalyticsDashboard }",
  "import PerformanceAnalyticsDashboard":
    "import { UniversalAnalytics as PerformanceAnalyticsDashboard } from '../index'",
  "import { BettingAnalytics }":
    "import { UniversalAnalytics as BettingAnalytics }",
  "import { MLInsights }": "import { UniversalAnalytics as MLInsights }",
  "import MLInsights":
    "import { UniversalAnalytics as MLInsights } from '../index'",
  "import { UserStats }": "import { UniversalAnalytics as UserStats }",
  "import UserStats":
    "import { UniversalAnalytics as UserStats } from '../index'",

  // Prediction consolidation;
  "import { PredictionDisplay }":
    "import { UniversalPredictions as PredictionDisplay }",
  "import PredictionDisplay":
    "import { UniversalPredictions as PredictionDisplay } from '../index'",
  "import { RealtimePredictionDisplay }":
    "import { UniversalPredictions as RealtimePredictionDisplay }",
  "import { LivePredictions }":
    "import { UniversalPredictions as LivePredictions }",
  "import LivePredictions":
    "import { UniversalPredictions as LivePredictions } from '../index'",
  "import { PredictionGenerator }":
    "import { UniversalPredictions as PredictionGenerator }",

  // Dashboard consolidation;
  "import Dashboard from './Dashboard'":
    "import { UniversalDashboard as Dashboard } from '../index'",
  "import { Dashboard }": "import { UniversalDashboard as Dashboard }",
  "import { CyberDashboard }":
    "import { UniversalDashboard as CyberDashboard }",
  "import CyberDashboard":
    "import { UniversalDashboard as CyberDashboard } from '../index'",
  "import { PremiumDashboard }":
    "import { UniversalDashboard as PremiumDashboard }",

  // Button consolidation;
  "import Button from './Button'":
    "import { UniversalButton as Button } from '../index'",
  "import { Button }": "import { UniversalButton as Button }",
  "import { BettingButton }": "import { BettingButton }",
  "import BettingButton": "import { BettingButton } from '../index'",
  "import { CyberButton }": "import { CyberButton }",

  // Hook consolidation;
  "import { usePredictions }": "import { usePredictions }",
  "import { useAnalytics }": "import { usePredictions as useAnalytics }",
  "import { useBettingCore }":
    "import { useBettingOpportunities as useBettingCore }",
  "import { useTheme }": "import { useUniversalTheme as useTheme }",
  "import { useForm }": "import { useUniversalForm as useForm }",
  "import { useDebounce }": "import { useDebounce }",
  "import { useLocalStorage }": "import { useLocalStorage }",
  "import { useWebSocket }": "import { useWebSocket }",

  // Service consolidation;
  "import { predictionService }": "import { predictionService }",
  "import predictionService": "import { predictionService } from '../services'",
  "import { ApiService }": "import { bettingService as ApiService }",

  // Theme consolidation;
  "import { ThemeProvider }":
    "import { UniversalThemeProvider as ThemeProvider }",
  "import ThemeProvider":
    "import { UniversalThemeProvider as ThemeProvider } from '../providers'",
};

// Component usage mappings (for JSX updates)
const componentMappings = {
  "<MoneyMaker": "<UniversalMoneyMaker",
  "<UltimateMoneyMaker": "<UniversalMoneyMaker",
  "<AdvancedAnalytics": "<UniversalAnalytics",
  "<AdvancedAnalyticsHub": "<UniversalAnalytics",
  "<CyberAnalyticsHub": "<UniversalAnalytics",
  "<PerformanceAnalyticsDashboard": "<UniversalAnalytics",
  "<PredictionDisplay": "<UniversalPredictions",
  "<RealtimePredictionDisplay": "<UniversalPredictions",
  "<LivePredictions": "<UniversalPredictions",
  "<Dashboard": "<UniversalDashboard",
  "<CyberDashboard": "<UniversalDashboard",
  "<Button": "<UniversalButton",
  "<ThemeProvider": "<UniversalThemeProvider",
};

// ============================================================================
// UTILITY FUNCTIONS;
// ============================================================================

function findTSXFiles(dir, files = []) {

  for (const item of items) {


    if (
      stat.isDirectory() &&
      !["node_modules", ".git", "dist", "build"].includes(item)
    ) {
      findTSXFiles(fullPath, files);
    } else if (stat.isFile() && /\.(tsx?|jsx?)$/.test(item)) {
      files.push(fullPath);
    }
  }

  return files;
}

function updateFileImports(filePath) {
  try {
    const content = fs.readFileSync(filePath, "utf-8");
    const modified = false;

    // Update import statements;
    for (const [oldImport, newImport] of Object.entries(importMappings)) {
      const regex = new RegExp(
        oldImport.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
        "g",
      );
      if (regex.test(content)) {
        content = content.replace(regex, newImport);
        modified = true;
      }
    }

    // Update component usage in JSX;
    for (const [oldComponent, newComponent] of Object.entries(
      componentMappings,
    )) {
      const regex = new RegExp(
        oldComponent.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
        "g",
      );
      if (regex.test(content)) {
        content = content.replace(regex, newComponent);
        modified = true;
      }
    }

    // Write back if modified;
    if (modified) {
      fs.writeFileSync(filePath, content, "utf-8");
      // console statement removed, filePath)}`);
      return true;
    }

    return false;
  } catch (error) {
    // console statement removed
    return false;
  }
}

// ============================================================================
// MAIN EXECUTION;
// ============================================================================

function main() {
  // console statement removed


  // console statement removed

  const updatedCount = 0;

  for (const file of files) {
    // Skip our new Universal files;
    if (file.includes("Universal") || file.includes("migrate-imports")) {
      continue;
    }

    if (wasUpdated) {
      updatedCount++;
    }
  }

  // console statement removed
  // console statement removed
  // console statement removed
}

// Run if called directly;
if (require.main === module) {
  main();
}

module.exports = { main, updateFileImports, importMappings, componentMappings };
