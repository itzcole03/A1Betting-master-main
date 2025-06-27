import React from 'react.ts';
import { Line, Bar, Doughnut, Radar, Scatter } from 'react-chartjs-2.ts';
import { Activity, BarChart3, PieChart, Zap } from 'lucide-react.ts';
import { defaultChartOptions, chartTheme } from '@/utils/chartSetup.ts';
import ChartWrapper from './ChartWrapper.ts';

// Ensure Chart.js setup is imported;
import "../../utils/chartSetup";

interface SafeChartProps {
  type: "line" | "bar" | "doughnut" | "radar" | "scatter";
  data: any;
  options?: any;
  className?: string;
  loadingMessage?: string;
  fallbackIcon?: React.ReactNode;
  chartId?: string; // Add unique ID to prevent canvas reuse issues;
}

const SafeChart: React.FC<SafeChartProps key={345369}> = ({
  type,
  data,
  options = {},
  className = "",
  loadingMessage = "Loading chart data...",
  fallbackIcon,
  chartId,
}) => {
  // Generate unique ID if not provided to prevent canvas reuse issues;
  const uniqueChartId = React.useMemo(() => {
    return (
      chartId ||
      `chart-${type}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    );
  }, [chartId, type]);

  // Ref to track chart instance for proper cleanup;

  // Cleanup effect to destroy chart on unmount;
  React.useEffect(() => {
    return () => {
      if (chartRef.current) {
        try {
          chartRef.current.destroy();
        } catch (error) {
          // console statement removed
        }
      }
    };
  }, []);
  // Enhanced validation for chart data structure;
  const isValidData = React.useMemo(() => {
    try {
      if (!data || typeof data !== "object") return false;
      if (!data.labels || !Array.isArray(data.labels)) return false;
      if (!data.datasets || !Array.isArray(data.datasets)) return false;
      if (data.labels.length === 0) return false;
      if (data.datasets.length === 0) return false;

      // Validate each dataset has required properties;
      return data.datasets.every(
        (dataset) =>
          dataset && typeof dataset === "object" && Array.isArray(dataset.data),
      );
    } catch (error) {
      // console statement removed
      return false;
    }
  }, [data]);

  if (!isValidData) {
    const icons = {
      line: <Activity className="w-8 h-8 mx-auto mb-2 animate-pulse" / key={663587}>,
      bar: <BarChart3 className="w-8 h-8 mx-auto mb-2 animate-pulse" / key={205772}>,
      doughnut: <PieChart className="w-8 h-8 mx-auto mb-2 animate-pulse" / key={810456}>,
      radar: <Zap className="w-8 h-8 mx-auto mb-2 animate-pulse" / key={625815}>,
      scatter: <Activity className="w-8 h-8 mx-auto mb-2 animate-pulse" / key={663587}>,
    };

    return (
      <div;
        className={`flex items-center justify-center h-full text-gray-400 ${className}`}
       key={771092}>
        <div className="text-center" key={120206}>
          {fallbackIcon || icons[type]}
          <p className="text-sm" key={364551}>{loadingMessage}</p>
        </div>
      </div>
    );
  }

  // Default safe options using centralized theme;
  const safeOptions = {
    ...defaultChartOptions,
    scales:
      type !== "doughnut" && type !== "radar"
        ? defaultChartOptions.scales;
        : undefined,
    ...options,
    // Ensure onDestroy is preserved if provided;
    onDestroy: options?.onDestroy || (() => {}),
  };

  try {
    // Add extra validation right before rendering;
    if (!data?.labels || !data?.datasets) {
      throw new Error("Invalid chart data structure");
    }

    const ChartComponent = (() => {
      switch (type) {
        case "line":
          return Line;
        case "bar":
          return Bar;
        case "doughnut":
          return Doughnut;
        case "radar":
          return Radar;
        case "scatter":
          return Scatter;
        default:
          return null;
      }
    })();

    if (!ChartComponent) {
      return (
        <div;
          className={`flex items-center justify-center h-full text-gray-400 ${className}`}
         key={672826}>
          <div className="text-center" key={120206}>
            <BarChart3 className="w-8 h-8 mx-auto mb-2" / key={737173}>
            <p className="text-sm" key={364551}>Unsupported chart type: {type}</p>
          </div>
        </div>
      );
    }

    return (
      <ChartWrapper;
        fallbackTitle={`${type.charAt(0).toUpperCase() + type.slice(1)} Chart`}
        height="h-full"
       key={692589}>
        <React.Suspense;
          fallback={
            <div;
              className={`flex items-center justify-center h-full text-gray-400 ${className}`}
             key={127794}>
              <div className="text-center" key={120206}>
                <BarChart3 className="w-8 h-8 mx-auto mb-2 animate-pulse" / key={205772}>
                <p className="text-sm" key={364551}>Loading chart...</p>
              </div>
            </div>
          }
        >
          <ChartComponent;
            key={uniqueChartId} // Ensure unique rendering;
            ref={chartRef}
            data={data}
            options={{
              ...safeOptions,
              // Enhanced error handling and cleanup;
              onDestroy: () = key={462148}> {
                if (chartRef.current) {
                  chartRef.current = null;
                }
              },
            }}
            className={className}
          />
        </React.Suspense>
      </ChartWrapper>
    );
  } catch (error) {
    // console statement removed
    return (
      <div;
        className={`flex items-center justify-center h-full text-red-400 ${className}`}
       key={627423}>
        <div className="text-center" key={120206}>
          <BarChart3 className="w-8 h-8 mx-auto mb-2" / key={737173}>
          <p className="text-sm" key={364551}>Chart rendering failed</p>
          <p className="text-xs text-gray-500 mt-1" key={68770}>
            Check console for details;
          </p>
        </div>
      </div>
    );
  }
};

export default SafeChart;
