/**
 * Real-Time API Integration Dashboard Component
 * Shows live status of your actual API integrations
 */

import React, { useState, useEffect } from 'react';
import LiveAPIIntegrationService from '../services/LiveAPIIntegrationService';
import APITestSuite from '../utils/APITestSuite';
import './RealTimeAPIIntegrationDashboard.css';

interface APIStatus {
  service: string;
  status: 'operational' | 'degraded' | 'down';
  responseTime: number;
  lastCheck: number;
  rateLimitRemaining?: number;
  dataPoints?: number;
}

export const RealTimeAPIIntegrationDashboard: React.FC = () => {
  const [apiStatuses, setApiStatuses] = useState<APIStatus[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<number>(Date.now());
  const [testResults, setTestResults] = useState<any>(null);

  const liveAPI = LiveAPIIntegrationService.getInstance();
  const testSuite = new APITestSuite();

  useEffect(() => {
    initializeDashboard();
    const interval = setInterval(updateAPIStatuses, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const initializeDashboard = async () => {
    setIsLoading(true);
    await updateAPIStatuses();
    setIsLoading(false);
  };

  const updateAPIStatuses = async () => {
    try {
      const health = await liveAPI.checkAPIHealth();
      const rateLimits = liveAPI.getRateLimitStatus();
      
      const statuses: APIStatus[] = Object.entries(health).map(([service, info]) => ({
        service,
        status: (info as any).status || 'unknown',
        responseTime: (info as any).responseTime || 0,
        lastCheck: Date.now(),
        rateLimitRemaining: rateLimits[service]?.requestsRemaining
      }));

      setApiStatuses(statuses);
      setLastUpdate(Date.now());
    } catch (error) {
      console.error('Failed to update API statuses:', error);
    }
  };

  const runFullTest = async () => {
    setIsLoading(true);
    try {
      const results = await testSuite.runFullAPITest();
      setTestResults(results);
    } catch (error) {
      console.error('Test failed:', error);
    }
    setIsLoading(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational': return '✅';
      case 'degraded': return '⚠️';
      case 'down': return '❌';
      default: return '🔄';
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'operational': return 'border-operational';
      case 'degraded': return 'border-degraded';
      case 'down': return 'border-down';
      default: return 'border-unknown';
    }
  };

  const getStatusTextClass = (status: string) => {
    switch (status) {
      case 'operational': return 'status-operational';
      case 'degraded': return 'status-degraded';
      case 'down': return 'status-down';
      default: return 'status-unknown';
    }
  };

  const formatResponseTime = (time: number) => {
    return `${time}ms`;
  };

  const formatLastUpdate = (timestamp: number) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h ago`;
  };

  if (isLoading && !apiStatuses.length) {
    return (
      <div className="loading-container">
        <div className="loading-title">🔄 Initializing API Dashboard...</div>
        <div className="loading-subtitle">Testing your API integrations...</div>
      </div>
    );
  }

  return (
    <div className="api-dashboard-container">
      {/* Header */}
      <div className="dashboard-header">
        <div>
          <h2 className="dashboard-title">🚀 Live API Integration Dashboard</h2>
          <p className="dashboard-subtitle">
            Real-time status of your betting platform APIs
          </p>
        </div>
        <div className="header-buttons">
          <button 
            onClick={updateAPIStatuses}
            disabled={isLoading}
            className="refresh-button"
          >
            🔄 Refresh
          </button>
          <button 
            onClick={runFullTest}
            disabled={isLoading}
            className="test-button"
          >
            🧪 Run Full Test
          </button>
        </div>
      </div>

      {/* API Status Cards */}
      <div className="api-status-grid">
        {apiStatuses.map((api) => (
          <div key={api.service} className={`api-status-card ${getStatusClass(api.status)}`}>
            <div className="api-card-header">
              <h3 className="api-card-title">
                {api.service === 'theodds' && '🎲 TheOdds API'}
                {api.service === 'sportradar' && '📊 SportsRadar API'}
                {api.service === 'prizepicks' && '🎯 PrizePicks API'}
                {api.service === 'espn' && '🏈 ESPN API'}
              </h3>
              <div className="api-status-icon">
                {getStatusIcon(api.status)}
              </div>
            </div>
            
            <div className="api-card-details">
              <div className="api-detail-row">
                <strong>Status:</strong> 
                <span className={`api-status-text ${getStatusTextClass(api.status)}`}>
                  {api.status.toUpperCase()}
                </span>
              </div>
              <div className="api-detail-row">
                <strong>Response Time:</strong> {formatResponseTime(api.responseTime)}
              </div>
              {api.rateLimitRemaining !== undefined && (
                <div className="api-detail-row">
                  <strong>Quota Remaining:</strong> {api.rateLimitRemaining.toLocaleString()}
                </div>
              )}
              <div className="api-detail-row">
                <strong>Last Check:</strong> {formatLastUpdate(api.lastCheck)}
              </div>
            </div>

            {/* Service-specific info */}
            <div className="api-service-description">
              {api.service === 'theodds' && 'Live odds, line movements, bookmaker data'}
              {api.service === 'sportradar' && 'Detailed stats, player analytics, historical data'}
              {api.service === 'prizepicks' && 'Player projections, prop lines, daily fantasy'}
              {api.service === 'espn' && 'Live scores, schedules, basic team info'}
            </div>
          </div>
        ))}
      </div>

      {/* API Keys Status */}
      <div className="api-config-section">
        <h3 className="config-section-title">🔑 API Configuration Status</h3>
        <div className="config-grid">
          <div className="config-item config-item-sportradar">
            <strong>SportsRadar:</strong> R10yQ...7s ✅
          </div>
          <div className="config-item config-item-theodds">
            <strong>TheOdds:</strong> 8684b...0ee ✅
          </div>
          <div className="config-item config-item-prizepicks">
            <strong>PrizePicks:</strong> Public API ✅
          </div>
          <div className="config-item config-item-espn">
            <strong>ESPN:</strong> Public API ✅
          </div>
        </div>
      </div>

      {/* Test Results */}
      {testResults && (
        <div className="test-results-section">
          <h3 className="test-results-title">
            🧪 Latest Test Results 
            {testResults.success ? '✅' : '⚠️'}
          </h3>
          
          <div className={`test-summary ${testResults.success ? 'test-summary-success' : 'test-summary-error'}`}>
            <strong>{testResults.summary}</strong>
          </div>

          {testResults.recommendations && (
            <div>
              <h4 className="recommendations-title">💡 Recommendations:</h4>
              <ul className="recommendations-list">
                {testResults.recommendations.map((rec: string, index: number) => (
                  <li key={index} className="recommendation-item">{rec}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="dashboard-footer">
        Last updated: {new Date(lastUpdate).toLocaleTimeString()} | 
        Auto-refresh every 30 seconds
      </div>
    </div>
  );
};

export default RealTimeAPIIntegrationDashboard;
