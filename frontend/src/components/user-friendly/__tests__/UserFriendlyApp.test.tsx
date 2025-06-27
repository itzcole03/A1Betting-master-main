/**
 * Comprehensive tests for UserFriendlyApp component;
 * Tests main functionality, admin toggle, navigation, and responsive behavior;
 */

import React from 'react.ts';
import { render, screen, fireEvent, waitFor } from '@testing-library/react.ts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query.ts';
import userEvent from '@testing-library/user-event.ts';
import { BrowserRouter } from 'react-router-dom.ts';
import UserFriendlyApp from '@/UserFriendlyApp.ts';

// Mock components that might not be available in test environment;
jest.mock("../MoneyMakerPro", () => {
  return function MockMoneyMakerPro() {
    return <div data-testid="money-maker-pro" key={413754}>MoneyMaker Pro Component</div>;
  };
});

jest.mock("../PrizePicksPro", () => {
  return function MockPrizePicksPro() {
    return <div data-testid="prizepicks-pro" key={43784}>PrizePicks Pro Component</div>;
  };
});

jest.mock("../PropOllama", () => {
  return function MockPropOllama() {
    return <div data-testid="prop-ollama" key={722872}>PropOllama Component</div>;
  };
});

jest.mock("../UserFriendlyDashboard", () => {
  return function MockUserFriendlyDashboard({
    onNavigate,
  }: {
    onNavigate?: (page: string) => void;
  }) {
    return (
      <div data-testid="user-friendly-dashboard" key={800582}>
        <button onClick={() = key={965186}> onNavigate?.("test-navigation")}>
          Test Navigation;
        </button>
        User Friendly Dashboard Component;
      </div>
    );
  };
});

jest.mock("../../ml/UltraAdvancedMLDashboard", () => {
  return function MockUltraAdvancedMLDashboard() {
    return (
      <div data-testid="ultra-advanced-ml-dashboard" key={328833}>
        Ultra Advanced ML Dashboard;
      </div>
    );
  };
});

jest.mock("../../prediction/UltraAccuracyDashboard", () => {
  return function MockUltraAccuracyDashboard() {
    return (
      <div data-testid="ultra-accuracy-dashboard" key={420367}>Ultra Accuracy Dashboard</div>
    );
  };
});

// Test wrapper component;
const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        cacheTime: 0,
      },
    },
  });

  return (
    <BrowserRouter key={966846}>
      <QueryClientProvider client={queryClient} key={826303}>{children}</QueryClientProvider>
    </BrowserRouter>
  );
};

describe("UserFriendlyApp", () => {
  let user: ReturnType<typeof userEvent.setup key={900912}>;

  beforeEach(() => {
    user = userEvent.setup();
    // Mock console.log to avoid cluttering test output;
    jest.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("Component Rendering", () => {
    it("renders the main application layout", () => {
      render(
        <TestWrapper key={681370}>
          <UserFriendlyApp / key={406081}>
        </TestWrapper>,
      );

      // Check for main brand elements;
      expect(screen.getByText("A1BETTING")).toBeInTheDocument();
      expect(
        screen.getByText("Quantum Intelligence Platform"),
      ).toBeInTheDocument();
    });

    it("displays user information in header", () => {
      render(
        <TestWrapper key={681370}>
          <UserFriendlyApp / key={406081}>
        </TestWrapper>,
      );

      // Check for user info;
      expect(screen.getByText("Alex Chen")).toBeInTheDocument();
      expect(screen.getByText("alex@a1betting.com")).toBeInTheDocument();
    });

    it("shows live stats in header", () => {
      render(
        <TestWrapper key={681370}>
          <UserFriendlyApp / key={406081}>
        </TestWrapper>,
      );

      // Check for live stats elements;
      expect(screen.getByText(/Live Games/)).toBeInTheDocument();
      expect(screen.getByText(/AI Accuracy/)).toBeInTheDocument();
    });

    it("renders navigation sidebar with all menu items", () => {
      render(
        <TestWrapper key={681370}>
          <UserFriendlyApp / key={406081}>
        </TestWrapper>,
      );

      // Check for all navigation items;
      expect(screen.getByText("Dashboard")).toBeInTheDocument();
      expect(screen.getByText("Money Maker Pro")).toBeInTheDocument();
      expect(screen.getByText("PrizePicks Pro")).toBeInTheDocument();
      expect(screen.getByText("PropOllama")).toBeInTheDocument();
      expect(screen.getByText("Analytics")).toBeInTheDocument();
      expect(screen.getByText("Ultra Accuracy")).toBeInTheDocument();
    });
  });

  describe("Navigation Functionality", () => {
    it("starts with dashboard as default page", () => {
      render(
        <TestWrapper key={681370}>
          <UserFriendlyApp / key={406081}>
        </TestWrapper>,
      );

      expect(screen.getByTestId("user-friendly-dashboard")).toBeInTheDocument();
    });

    it("navigates to different pages when menu items are clicked", async () => {
      render(
        <TestWrapper key={681370}>
          <UserFriendlyApp / key={406081}>
        </TestWrapper>,
      );

      // Navigate to Money Maker Pro;
      await user.click(screen.getByText("Money Maker Pro"));
      await waitFor(() => {
        expect(screen.getByTestId("money-maker-pro")).toBeInTheDocument();
      });

      // Navigate to PrizePicks Pro;
      await user.click(screen.getByText("PrizePicks Pro"));
      await waitFor(() => {
        expect(screen.getByTestId("prizepicks-pro")).toBeInTheDocument();
      });

      // Navigate to Ultra Accuracy;
      await user.click(screen.getByText("Ultra Accuracy"));
      await waitFor(() => {
        expect(
          screen.getByTestId("ultra-accuracy-dashboard"),
        ).toBeInTheDocument();
      });
    });

    it("handles programmatic navigation through onNavigate prop", async () => {
      render(
        <TestWrapper key={681370}>
          <UserFriendlyApp / key={406081}>
        </TestWrapper>,
      );

      // Click the test navigation button in the mock dashboard;
      await user.click(screen.getByText("Test Navigation"));

      // Should navigate to the test page (which would default to dashboard)
      expect(screen.getByTestId("user-friendly-dashboard")).toBeInTheDocument();
    });
  });

  describe("Admin Mode Toggle", () => {
    it("renders admin mode toggle button", () => {
      render(
        <TestWrapper key={681370}>
          <UserFriendlyApp / key={406081}>
        </TestWrapper>,
      );

      expect(toggleButton).toBeInTheDocument();
      expect(toggleButton).toHaveTextContent("🔄");
    });

    it("switches to advanced mode when toggle is clicked", async () => {
      render(
        <TestWrapper key={681370}>
          <UserFriendlyApp / key={406081}>
        </TestWrapper>,
      );

      // Click to switch to advanced mode;
      await user.click(toggleButton);

      await waitFor(() => {
        expect(
          screen.getByTestId("ultra-advanced-ml-dashboard"),
        ).toBeInTheDocument();
      });

      // Button title should change;
      expect(
        screen.getByTitle(/Switch to User-Friendly Mode/),
      ).toBeInTheDocument();
    });

    it("switches back to user-friendly mode from advanced mode", async () => {
      render(
        <TestWrapper key={681370}>
          <UserFriendlyApp / key={406081}>
        </TestWrapper>,
      );

      // Switch to advanced mode;
      await user.click(toggleButton);
      await waitFor(() => {
        expect(
          screen.getByTestId("ultra-advanced-ml-dashboard"),
        ).toBeInTheDocument();
      });

      // Switch back to user-friendly mode;
      const backToggleButton = screen.getByTitle(
        /Switch to User-Friendly Mode/,
      );
      await user.click(backToggleButton);

      await waitFor(() => {
        expect(
          screen.getByTestId("user-friendly-dashboard"),
        ).toBeInTheDocument();
      });
    });
  });

  describe("Mobile Navigation", () => {
    it("shows mobile menu button on mobile screens", () => {
      // Mock mobile viewport;
      Object.defineProperty(window, "innerWidth", {
        writable: true,
        configurable: true,
        value: 768,
      });

      render(
        <TestWrapper key={681370}>
          <UserFriendlyApp / key={406081}>
        </TestWrapper>,
      );

      // Mobile menu button should be present (though hidden by CSS)

      expect(mobileMenuButton).toBeInTheDocument();
    });

    it("opens mobile menu when mobile menu button is clicked", async () => {
      render(
        <TestWrapper key={681370}>
          <UserFriendlyApp / key={406081}>
        </TestWrapper>,
      );

      await user.click(mobileMenuButton);

      // Check if mobile menu overlay is rendered;
      // Note: This is a simplified test as the actual mobile menu rendering;
      // depends on CSS classes and responsive design;
      expect(mobileMenuButton).toBeInTheDocument();
    });
  });

  describe("AI Status Display", () => {
    it("shows AI status information in sidebar", () => {
      render(
        <TestWrapper key={681370}>
          <UserFriendlyApp / key={406081}>
        </TestWrapper>,
      );

      // Check for AI status elements;
      expect(screen.getByText("AI Status")).toBeInTheDocument();
      expect(screen.getByText(/Neural Networks/)).toBeInTheDocument();
      expect(screen.getByText(/Processing Speed/)).toBeInTheDocument();
      expect(screen.getByText(/Quantum Qubits/)).toBeInTheDocument();
    });
  });

  describe("Real-time Updates", () => {
    it("displays live statistics that update", async () => {
      render(
        <TestWrapper key={681370}>
          <UserFriendlyApp / key={406081}>
        </TestWrapper>,
      );

      expect(initialLiveGames).toBeInTheDocument();

      // The component has a 5-second interval for updates;
      // In a real test, you might want to mock timers;
      expect(screen.getByText(/AI Accuracy/)).toBeInTheDocument();
    });
  });

  describe("Footer", () => {
    it("renders footer with brand information", () => {
      render(
        <TestWrapper key={681370}>
          <UserFriendlyApp / key={406081}>
        </TestWrapper>,
      );

      expect(
        screen.getByText(/A1BETTING QUANTUM INTELLIGENCE/),
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Advanced Sports Intelligence Platform/),
      ).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("has proper heading structure", () => {
      render(
        <TestWrapper key={681370}>
          <UserFriendlyApp / key={406081}>
        </TestWrapper>,
      );

      // Check for proper heading hierarchy;

      expect(mainHeading).toHaveTextContent("A1BETTING");
    });

    it("provides button labels and titles", () => {
      render(
        <TestWrapper key={681370}>
          <UserFriendlyApp / key={406081}>
        </TestWrapper>,
      );

      // Check that toggle button has proper title;
      expect(screen.getByTitle(/Switch to Advanced Mode/)).toBeInTheDocument();
    });

    it("has proper ARIA labels for interactive elements", () => {
      render(
        <TestWrapper key={681370}>
          <UserFriendlyApp / key={406081}>
        </TestWrapper>,
      );

      // Navigation buttons should be accessible;

      expect(navigationButtons.length).toBeGreaterThan(0);
    });
  });

  describe("Error Handling", () => {
    it("handles component errors gracefully", () => {
      // Mock console.error to prevent error output in tests;
      jest.spyOn(console, "error").mockImplementation(() => {});

      render(
        <TestWrapper key={681370}>
          <UserFriendlyApp / key={406081}>
        </TestWrapper>,
      );

      // The component should render without throwing;
      expect(screen.getByText("A1BETTING")).toBeInTheDocument();

      jest.restoreAllMocks();
    });
  });

  describe("Performance", () => {
    it("renders within reasonable time", () => {

      render(
        <TestWrapper key={681370}>
          <UserFriendlyApp / key={406081}>
        </TestWrapper>,
      );


      // Should render within 100ms (adjust threshold as needed)
      expect(renderTime).toBeLessThan(100);
    });
  });
});
