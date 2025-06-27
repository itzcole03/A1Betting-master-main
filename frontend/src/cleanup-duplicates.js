#!/usr/bin/env node;

/**
 * A1BETTING QUANTUM PLATFORM - INTELLIGENT CLEANUP SCRIPT;
 *
 * This script removes duplicate .d.ts and .js files while preserving:
 * - All .tsx components (your beautiful cyber-themed UI)
 * - All .ts TypeScript source files;
 * - CSS files and styling;
 * - The exact MEGA architecture you've built;
 * - All theme-related files;
 *
 * SAFE REMOVAL TARGETS:
 * - Duplicate .d.ts TypeScript declaration files (auto-generated)
 * - Duplicate .js transpiled files (build artifacts)
 * - Analysis markdown files (can be regenerated)
 */


// console statement removed

const SAFE_TO_REMOVE_EXTENSIONS = [
  ".d.ts", // TypeScript declarations (auto-generated)
  ".js", // Transpiled JavaScript (build artifacts)
];

const ANALYSIS_FILES_TO_REMOVE = [
  "ANALYSIS_FILE_USAGE_ANALYSIS.md",
  "ANALYTICS_FILE_USAGE_ANALYSIS.md",
  "API_FILE_USAGE_ANALYSIS.md",
  "ASSETS_FILE_USAGE_ANALYSIS.md",
  "BETTING_FILE_USAGE_ANALYSIS.md",
  "CONTEXTS_FILE_USAGE_ANALYSIS.md",
  "LAYOUTS_FILE_USAGE_ANALYSIS.md",
  "LIB_FILE_USAGE_ANALYSIS.md",
  "MIDDLEWARE_FILE_USAGE_ANALYSIS.md",
  "MOCKS_FILE_USAGE_ANALYSIS.md",
  "MONITORING_FILE_USAGE_ANALYSIS.md",
  "NOTIFICATION_FILE_USAGE_ANALYSIS.md",
  "PROVIDERS_FILE_USAGE_ANALYSIS.md",
  "REPORTING_FILE_USAGE_ANALYSIS.md",
  "SCRIPTS_FILE_USAGE_ANALYSIS.md",
  "SERVICES_FILE_USAGE_ANALYSIS.md",
  "STORIES_FILE_USAGE_ANALYSIS.md",
  "STRATEGIES_FILE_USAGE_ANALYSIS.md",
  "STYLES_FILE_USAGE_ANALYSIS.md",
  "THEME_FILE_USAGE_ANALYSIS.md",
  "TYPES_FILE_USAGE_ANALYSIS.md",
  "UTILS_FILE_USAGE_ANALYSIS.md",
  "VALIDATION_FILE_USAGE_ANALYSIS.md",
  "SRC_FILE_USAGE_ANALYSIS.md",
  "PROJECT_FILE_USAGE_ANALYSIS.md",
];

// Files to absolutely preserve (your core cyber theme)
const PRESERVE_ALWAYS = [
  "CyberTheme.tsx",
  "MegaApp.tsx",
  "MegaUI.tsx",
  "MegaLayout.tsx",
  "MegaFeatures.tsx",
  "MegaDashboard.tsx",
  "MegaBetting.tsx",
  "MegaAnalytics.tsx",
  "MegaAdminPanel.tsx",
  "MegaPrizePicks.tsx",
  "cyber-theme.css",
  "globals.css",
  "animations.css",
  "components.css",
  "enhanced-animations.css",
  "premium-components.css",
  "index.ts",
  "App.tsx",
  "main.tsx",
];

const removedCount = 0;
const preservedCount = 0;

function cleanupDirectory(dirPath) {
  try {

    for (const item of items) {


      if (stat.isDirectory()) {
        cleanupDirectory(fullPath);
      } else {


        // Check if it's a core file to preserve;
        if (PRESERVE_ALWAYS.includes(basename)) {
          preservedCount++;
          // console statement removed}`);
          continue;
        }

        // Remove analysis files;
        if (ANALYSIS_FILES_TO_REMOVE.includes(basename)) {
          fs.unlinkSync(fullPath);
          removedCount++;
          // console statement removed} (analysis file)`,
          );
          continue;
        }

        // Remove duplicate build artifacts;
        if (SAFE_TO_REMOVE_EXTENSIONS.includes(ext)) {
          // Check if corresponding .tsx or .ts exists;


          if (fs.existsSync(tsxPath) || fs.existsSync(tsPath)) {
            fs.unlinkSync(fullPath);
            removedCount++;
            // console statement removed} (duplicate)`,
            );
          } else {
            preservedCount++;
            // console statement removed} (source file)`,
            );
          }
        } else {
          preservedCount++;
        }
      }
    }
  } catch (error) {
    // console statement removed
  }
}

// Start cleanup;
// console statement removed
cleanupDirectory("frontend/src");

// console statement removed
