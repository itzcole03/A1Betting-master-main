import { useState, useEffect } from 'react.ts';
import { useAuth } from './useAuth.ts';

interface TimeSeriesPoint {
  timestamp: string;
  value: number;
  forecast?: number;
  lower_bound?: number;
  upper_bound?: number;
  feature?: string;
}

interface TimeSeriesState {
  timeSeries: TimeSeriesPoint[];
  loading: boolean;
  error: string | null;
}

export const useTimeSeries = () => {
  const [state, setState] = useState<TimeSeriesState>({
    timeSeries: [],
    loading: true,
    error: null,
  });

  const { token } = useAuth();

  const fetchTimeSeries = async () => {
    try {
      const response = await fetch('/api/predictions/time-series', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch time series data');
      }

      setState(prev => ({
        ...prev,
        timeSeries,
        loading: false,
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'An error occurred',
        loading: false,
      }));
    }
  };

  const getLatestTimeSeries = () => {
    if (state.timeSeries.length === 0) return null;
    return state.timeSeries[state.timeSeries.length - 1];
  };

  const getTimeSeriesHistory = (feature?: string) => {
    return state.timeSeries;
      .filter(ts => !feature || ts.feature === feature)
      .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
  };

  const getTimeSeriesTrend = (feature?: string) => {

    return history.map(h => ({
      timestamp: h.timestamp,
      value: h.value,
      forecast: h.forecast,
      lower_bound: h.lower_bound,
      upper_bound: h.upper_bound,
    }));
  };

  const getTimeSeriesFeatures = () => {

    state.timeSeries.forEach(ts => {
      if (ts.feature) features.add(ts.feature);
    });
    return Array.from(features);
  };

  const getTimeSeriesSummary = () => {

    const summary = {
      total_points: state.timeSeries.length,
      features: features.length,
      time_range: {
        start: state.timeSeries[0]?.timestamp,
        end: state.timeSeries[state.timeSeries.length - 1]?.timestamp,
      },
      feature_stats: features.map(feature => {


        return {
          feature,
          count: points.length,
          mean: values.reduce((a, b) => a + b, 0) / values.length,
          min: Math.min(...values),
          max: Math.max(...values),
        };
      }),
    };
    return summary;
  };

  const getForecastAccuracy = (feature?: string) => {


    if (forecastPoints.length === 0) return null;

    const totalError = 0;
    const totalPoints = 0;

    for (const point of forecastPoints) {
      if (point.forecast !== undefined) {

        totalError += error;
        totalPoints++;
      }
    }

    return totalPoints > 0 ? totalError / totalPoints : null;
  };

  const getConfidenceIntervals = (feature?: string) => {

    return history.filter(h => h.lower_bound !== undefined && h.upper_bound !== undefined);
  };

  useEffect(() => {
    if (token) {
      fetchTimeSeries();
    }
  }, [token]);

  return {
    timeSeries: state.timeSeries,
    loading: state.loading,
    error: state.error,
    fetchTimeSeries,
    getLatestTimeSeries,
    getTimeSeriesHistory,
    getTimeSeriesTrend,
    getTimeSeriesFeatures,
    getTimeSeriesSummary,
    getForecastAccuracy,
    getConfidenceIntervals,
  };
};
