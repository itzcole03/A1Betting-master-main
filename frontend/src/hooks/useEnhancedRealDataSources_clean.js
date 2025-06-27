import { useState, useEffect, useCallback } from "react";

export function useEnhancedRealDataSources() {
  const [dataSources, setDataSources] = useState(new Map());
  const [games, setGames] = useState([]);
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState("Disconnected");
  const [dataQuality, setDataQuality] = useState(0);
  const [dataReliability, setDataReliability] = useState(0);
  const [lastUpdate, setLastUpdate] = useState(null);

  const connectToSources = useCallback(async () => {
    setLoading(true);
    setConnectionStatus("Connecting to enhanced data sources...");

    try {
      // console statement removed

      // Check for API keys;
      const hasApiKeys = import.meta.env.VITE_ODDS_API_KEY ||
        import.meta.env.VITE_SPORTRADAR_API_KEY ||
        import.meta.env.VITE_ESPN_API_KEY;

      if (!hasApiKeys) {
        throw new Error("No API keys configured for data sources");
      }

      setDataSources(sources);



      setDataQuality(quality);
      setDataReliability(reliability);
      setConnectionStatus(`Connected to ${connectedSources.length} enhanced data sources`);
      setLastUpdate(new Date());

      // Process the enhanced data;


      setGames(processedGames);
      setPlayers(processedPlayers);

      // console statement removed
    } catch (error) {
      // console statement removed
      setConnectionStatus("Connection failed - no data available");
      
      // Production error handling - no fallback data;
      setGames([]);
      setPlayers([]);
      setDataQuality(0);
      setDataReliability(0);
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshData = useCallback(async () => {
    // console statement removed

    try {
      await enhancedDataSourceManager.refreshAllSources();
      setDataSources(enhancedDataSourceManager.getAllSources());


      setDataQuality(quality);
      setDataReliability(reliability);
      setLastUpdate(new Date());

      // Reprocess data;



      setGames(processedGames);
      setPlayers(processedPlayers);
      // console statement removed
    } catch (error) {
      // console statement removed
      // Clear data on refresh failure;
      setGames([]);
      setPlayers([]);
      setDataQuality(0);
      setDataReliability(0);
    }
  }, []);

  const getSourcesByCategory = useCallback((category) => {
    return enhancedDataSourceManager.getSourcesByCategory(category);
  }, []);

  const getDataSourceMetrics = useCallback(() => {
    return enhancedDataSourceManager.getDataSourceMetrics();
  }, []);

  // Convert EnhancedDataSource to RealDataSource for compatibility;
  const convertToRealDataSources = (sources) => {

    sources.forEach((source, key) => {
      converted.set(key, {
        connected: source.connected,
        quality: source.quality,
        lastUpdate: source.lastUpdate,
        data: source.data,
        error: source.error,
        source: source.name,
      });
    });
    return converted;
  };

  useEffect(() => {
    connectToSources();

    // Set up periodic refresh;
    const interval = setInterval(() => {
      refreshData();
    }, 300000); // Refresh every 5 minutes;

    return () => clearInterval(interval);
  }, [connectToSources, refreshData]);

  return {
    dataSources,
    games,
    players,
    loading,
    connectionStatus,
    dataQuality,
    dataReliability,
    lastUpdate,
    refreshData,
    getSourcesByCategory,
    getDataSourceMetrics,
    connectedSourcesCount: enhancedDataSourceManager.getConnectedSources().length,
    totalSourcesCount: dataSources.size,
  };
}

// Mock implementations for missing services;
const enhancedDataSourceManager = {
  initializeAllSources: async () => {

    mockSources.set("espn", {
      id: "espn",
      name: "ESPN API",
      connected: true,
      quality: 0.95,
      lastUpdate: new Date(),
      data: { games: [], players: [] },
      error: null,
    });
    return mockSources;
  },
  getConnectedSources: () => [{ id: "espn", name: "ESPN API" }],
  getOverallDataQuality: () => 0.95,
  getSourceReliability: () => 0.9,
  getAllSources: () => new Map(),
  refreshAllSources: async () => {},
  getSourcesByCategory: (category) => [
    { id: "test", connected: true, data: { projections: [] } },
  ],
  getDataSourceMetrics: () => ({ quality: 0.95, reliability: 0.9 }),
};

const dataProcessor = {
  processGames: (sources) => [],
  processPlayers: (sources) => [],
};
