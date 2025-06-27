#!/usr/bin/env node;

/**
 * Component Feature Analysis Script;
 *
 * This script analyzes all UserFriendlyApp and MoneyMaker component variants;
 * to identify unique features that might not be present in the main component.
 */


// Component paths to analyze;
const COMPONENT_PATHS = [
  "src/components/user-friendly/UserFriendlyApp.tsx",
  "src/components/user-friendly/UserFriendlyApp_Production.tsx",
  "src/components/user-friendly/EnhancedUserFriendlyApp.tsx",
  "src/components/user-friendly/UserFriendlyApp-Complete.tsx",
  "src/components/user-friendly/UserFriendlyApp-Clean.tsx",
  "src/components/user-friendly/UserFriendlyApp_fixed.tsx",
  "src/components/user-friendly/UserFriendlyApp-fixed.tsx",
  "src/components/MoneyMaker/UniversalMoneyMaker.tsx",
  "src/components/MoneyMaker/UltimateMoneyMaker.tsx",
  "src/components/MoneyMaker/CleanMoneyMaker.tsx",
  "src/components/MoneyMaker/ConsolidatedUniversalMoneyMaker.tsx",
  "src/components/MoneyMaker/AdvancedMLDashboard.tsx",
];

/**
 * Extract unique features from component code;
 */
function extractFeatures(filePath) {
  try {

    const features = {
      imports: [],
      components: [],
      functions: [],
      hooks: [],
      interfaces: [],
      constants: [],
      css_classes: [],
    };

    // Extract imports;

    if (importMatches) {
      features.imports = importMatches.map((imp) => imp.trim());
    }

    // Extract component names;
    const componentMatches = content.match(
      /(?:const|function|class)\s+(\w+)(?:\s*[:=]|\s*\()/g,
    );
    if (componentMatches) {
      features.components = componentMatches.map((comp) =>
        comp;
          .replace(/(?:const|function|class)\s+/, "")
          .replace(/[:=(].*/, "")
          .trim(),
      );
    }

    // Extract function names;

    if (functionMatches) {
      features.functions = functionMatches.map((func) =>
        func;
          .replace(/(?:const|function)\s+/, "")
          .replace(/\s*[=:].*/, "")
          .trim(),
      );
    }

    // Extract hooks usage;

    if (hookMatches) {
      features.hooks = [...new Set(hookMatches)];
    }

    // Extract interfaces;

    if (interfaceMatches) {
      features.interfaces = interfaceMatches.map((int) =>
        int.replace("interface ", "").trim(),
      );
    }

    // Extract constants;

    if (constantMatches) {
      features.constants = constantMatches.map((const_match) =>
        const_match;
          .replace(/const\s+/, "")
          .replace(/\s*=.*/, "")
          .trim(),
      );
    }

    // Extract CSS classes;

    if (cssMatches) {
      features.css_classes = [
        ...new Set(
          cssMatches.map((css) =>
            css;
              .replace(/className=['"`]/, "")
              .replace(/['"`]$/, "")
              .trim(),
          ),
        ),
      ];
    }

    return features;
  } catch (error) {
    // console statement removed
    return null;
  }
}

/**
 * Compare features across components;
 */
function compareFeatures() {
  // console statement removed

  const mainComponent = COMPONENT_PATHS[0]; // UserFriendlyApp.tsx;

  // Extract features from all components;
  COMPONENT_PATHS.forEach((componentPath) => {


    if (features) {
      allFeatures[componentPath] = features;
      // console statement removed
    } else {
      // console statement removed
    }
  });

  // console statement removed

  // Get main component features;

  if (!mainFeatures) {
    // console statement removed
    return;
  }

  // console statement removed
  // console statement removed
  // console statement removed
  // console statement removed
  // console statement removed
  // console statement removed
  // console statement removed

  // Find unique features in other components;

  Object.keys(allFeatures).forEach((componentPath) => {
    if (componentPath === mainComponent) return;

    const unique = {
      components: features.components.filter(
        (comp) => !mainFeatures.components.includes(comp) && comp !== "default",
      ),
      functions: features.functions.filter(
        (func) => !mainFeatures.functions.includes(func),
      ),
      hooks: features.hooks.filter(
        (hook) => !mainFeatures.hooks.includes(hook),
      ),
      interfaces: features.interfaces.filter(
        (int) => !mainFeatures.interfaces.includes(int),
      ),
      css_classes: features.css_classes.filter(
        (css) => !mainFeatures.css_classes.includes(css) && css.length > 0,
      ),
    };

    // Only store if there are unique features;
    const hasUniqueFeatures = Object.values(unique).some(
      (arr) => arr.length > 0,
    );
    if (hasUniqueFeatures) {
      uniqueFeatures[componentPath] = unique;
    }
  });

  // Report unique features;
  if (Object.keys(uniqueFeatures).length === 0) {
    // console statement removed
    // console statement removed
    // console statement removed
  } else {
    // console statement removed

    Object.keys(uniqueFeatures).forEach((componentPath) => {


      // console statement removed

      if (unique.components.length > 0) {
        // console statement removed}`);
      }
      if (unique.functions.length > 0) {
        // console statement removed}`);
      }
      if (unique.hooks.length > 0) {
        // console statement removed}`);
      }
      if (unique.interfaces.length > 0) {
        // console statement removed}`);
      }
      if (unique.css_classes.length > 0) {
        // console statement removed.join(", ")}${unique.css_classes.length > 5 ? "..." : ""}`,
        );
      }
      // console statement removed
    });
  }

  // Summary;
  // console statement removed
  // console statement removed.length}`,
  );
  // console statement removed.reduce((sum, key) => sum + mainFeatures[key].length, 0)}`,
  );
  // console statement removed.length}`,
  );
  // console statement removed

  if (Object.keys(uniqueFeatures).length === 0) {
    // console statement removed
    // console statement removed
  } else {
    // console statement removed
    // console statement removed
  }
}

// Run the analysis;
if (require.main === module) {
  compareFeatures();
}

module.exports = { extractFeatures, compareFeatures };
