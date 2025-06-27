/**
 * Error Handling Verification Test;
 * Tests that console errors are properly managed and not spamming the console;
 */

import { api } from '@/services/api.ts';
import { consoleManager } from './consoleUtils.ts';

export interface ErrorTestResult {
  testName: string;
  passed: boolean;
  details: string;
  consoleBefore: number;
  consoleAfter: number;
}

export class ErrorHandlingTest {
  private static consoleErrorCount = 0;
  private static originalConsoleError = console.error;

  /**
   * Setup console monitoring;
   */
  private static setupConsoleMonitoring() {
    console.error = (...args) => {
      this.consoleErrorCount++;
      this.originalConsoleError(...args);
    };
  }

  /**
   * Cleanup console monitoring;
   */
  private static cleanupConsoleMonitoring() {
    console.error = this.originalConsoleError;
  }

  /**
   * Test that multiple API calls don't spam console errors;
   */
  static async testConsoleSpamPrevention(): Promise<ErrorTestResult> {
    this.setupConsoleMonitoring();

    try {
      // Reset console manager state;
      consoleManager.reset();

      // Make multiple API calls that will fail;
      await Promise.all([
        api.getValueBets(),
        api.getArbitrageOpportunities(),
        api.getUserProfile("test"),
        api.getHealthStatus(),
        api.getAccuracyMetrics(),
      ]);

      // Make the same calls again to test suppression;
      await Promise.all([
        api.getValueBets(),
        api.getArbitrageOpportunities(),
        api.getUserProfile("test"),
        api.getHealthStatus(),
        api.getAccuracyMetrics(),
      ]);


      // We should have very few console errors due to suppression;
      const passed = newErrors <= 2; // Allow for 1-2 errors max;

      return {
        testName: "Console Spam Prevention",
        passed,
        details: `Generated ${newErrors} console errors from 10 API calls. Expected ≤ 2.`,
        consoleBefore: startErrorCount,
        consoleAfter: endErrorCount,
      };
    } finally {
      this.cleanupConsoleMonitoring();
    }
  }

  /**
   * Test that API methods return proper default values;
   */
  static async testDefaultValueReturns(): Promise<ErrorTestResult> {
    try {
      const results = await Promise.allSettled([
        api.getValueBets(),
        api.getArbitrageOpportunities(),
        api.getUserProfile("test"),
        api.getHealthStatus(),
        api.getAccuracyMetrics(),
      ]);

      // All should resolve (not reject) with default values;
      const allResolved = results.every(
        (result) => result.status === "fulfilled",
      );

      const details = "";
      if (allResolved) {
        const values = results.map((r) =>
          r.status === "fulfilled" ? r.value : null,
        );
        details = `All API calls returned default values: ${values;
          .map((v) =>
            Array.isArray(v)
              ? `[]`
              : typeof v === "object"
                ? "defaultObject"
                : typeof v,
          )
          .join(", ")}`;
      } else {
        const rejectedCount = results.filter(
          (r) => r.status === "rejected",
        ).length;
        details = `${rejectedCount} API calls were rejected instead of returning defaults`;
      }

      return {
        testName: "Default Value Returns",
        passed: allResolved,
        details,
        consoleBefore: 0,
        consoleAfter: 0,
      };
    } catch (error) {
      return {
        testName: "Default Value Returns",
        passed: false,
        details: `Test failed with error: ${error instanceof Error ? error.message : "Unknown"}`,
        consoleBefore: 0,
        consoleAfter: 0,
      };
    }
  }

  /**
   * Test console manager state management;
   */
  static async testConsoleManagerState(): Promise<ErrorTestResult> {
    try {
      // Reset state;
      consoleManager.reset();

      // Should not suppress initially;

      // Trigger offline logging;
      consoleManager.logBackendOffline();

      // Should suppress after offline logging;

      // Trigger online logging;
      consoleManager.logBackendOnline();

      // Should not suppress after online;

      const passed =
        !initialSuppress && afterOfflineSuppress && !afterOnlineSuppress;

      return {
        testName: "Console Manager State",
        passed,
        details: `Initial: ${initialSuppress}, After offline: ${afterOfflineSuppress}, After online: ${afterOnlineSuppress}`,
        consoleBefore: 0,
        consoleAfter: 0,
      };
    } catch (error) {
      return {
        testName: "Console Manager State",
        passed: false,
        details: `Test failed: ${error instanceof Error ? error.message : "Unknown"}`,
        consoleBefore: 0,
        consoleAfter: 0,
      };
    }
  }

  /**
   * Run all error handling tests;
   */
  static async runAllTests(): Promise<ErrorTestResult[]> {
    return [
      await this.testConsoleSpamPrevention(),
      await this.testDefaultValueReturns(),
      await this.testConsoleManagerState(),
    ];
  }

  /**
   * Generate test report;
   */
  static generateReport(results: ErrorTestResult[]): string {


    const report = `🛠️  Error Handling Test Report\n`;
    report += `📊 Results: ${passed}/${total} tests passed\n\n`;

    results.forEach((result) => {

      report += `${status} ${result.testName}\n`;
      report += `   ${result.details}\n`;
      if (result.consoleBefore || result.consoleAfter) {
        report += `   Console errors: ${result.consoleBefore} → ${result.consoleAfter}\n`;
      }
      report += "\n";
    });

    if (passed === total) {
      report += `🎉 All error handling tests passed! Console is clean.\n`;
    } else {
      report += `⚠️  Some tests failed. Check error handling implementation.\n`;
    }

    return report;
  }

  /**
   * Run tests and log results;
   */
  static async runAndLog(): Promise<void> {
    // console statement removed


    // console statement removed
  }
}

export default ErrorHandlingTest;
