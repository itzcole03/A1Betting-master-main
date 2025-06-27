/**
 * Real-Time API Integration Dashboard Component;
 * Shows live status of your actual API integrations;
 */

import React, { useState, useEffect  } from 'react.ts';
import LiveAPIIntegrationService from '@/services/LiveAPIIntegrationService.ts';
import APITestSuite from '@/utils/APITestSuite.ts';
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
  const [apiStatuses, setApiStatuses] = useState<APIStatus[] key={234707}>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<number key={430559}>(Date.now());
  const [testResults, setTestResults] = useState<any key={295429}>(null);


  useEffect(() => {
    initializeDashboard();
    const interval = setInterval(updateAPIStatuses, 30000); // Update every 30 seconds;
    return () => clearInterval(interval);
  }, []);

  const initializeDashboard = async () => {
    setIsLoading(true);
    await updateAPIStatuses();
    setIsLoading(false);
  };

  const updateAPIStatuses = async () => {
    try {


      const statuses: APIStatus[] = Object.entries(health).map(([service, info]) => ({
        service,
        status: (info as any).status || 'unknown',
        responseTime: (info as any).responseTime || 0,
        lastCheck: Date.now(),
        rateLimitRemaining: rateLimits[service]?.requestsRemaining;
      }));

      setApiStatuses(statuses);
      setLastUpdate(Date.now());
    } catch (error) {
      // console statement removed
    }
  };

  const runFullTest = async () => {
    setIsLoading(true);
    try {

      setTestResults(results);
    } catch (error) {
      // console statement removed
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

    if (seconds < 60) return `${seconds}s ago`;

    if (minutes < 60) return `${minutes}m ago`;

    return `${hours}h ago`;
  };

  if (isLoading && !apiStatuses.length) {
    return (
      <div className="loading-container" key={376802}>
        <div className="loading-title" key={13972}>🔄 Initializing API Dashboard...</div>
        <div className="loading-subtitle" key={748778}>Testing your API integrations...</div>
      </div>
    );
  }

  return (
    <div className="api-dashboard-container" key={561214}>
      {/* Header */}
      <div className="dashboard-header" key={709232}>
        <div key={241917}>
          <h2 className="dashboard-title" key={721579}>🚀 Live API Integration Dashboard</h2>
          <p className="dashboard-subtitle" key={690283}>
            Real-time status of your betting platform APIs;
          </p>
        </div>
        <div className="header-buttons" key={397886}>
          <button; 
            onClick={updateAPIStatuses}
            disabled={isLoading}
            className="refresh-button"
           key={12124}>
            🔄 Refresh;
          </button>
          <button; 
            onClick={runFullTest}
            disabled={isLoading}
            className="test-button"
           key={147096}>
            🧪 Run Full Test;
          </button>
        </div>
      </div>

      {/* API Status Cards */}
      <div className="api-status-grid" key={949626}>
        {apiStatuses.map((api) => (
          <div key={api.service} className={`api-status-card ${getStatusClass(api.status)}`} key={719962}>
            <div className="api-card-header" key={378126}>
              <h3 className="api-card-title" key={648972}>
                {api.service === 'theodds' && '🎲 TheOdds API'}
                {api.service === 'sportradar' && '📊 SportsRadar API'}
                {api.service === 'prizepicks' && '🎯 PrizePicks API'}
                {api.service === 'espn' && '🏈 ESPN API'}
              </h3>
              <div className="api-status-icon" key={354017}>
                {getStatusIcon(api.status)}
              </div>
            </div>
            
            <div className="api-card-details" key={637643}>
              <div className="api-detail-row" key={853347}>
                <strong key={829099}>Status:</strong> 
                <span className={`api-status-text ${getStatusTextClass(api.status)}`} key={363709}>
                  {api.status.toUpperCase()}
                </span>
              </div>
              <div className="api-detail-row" key={853347}>
                <strong key={829099}>Response Time:</strong> {formatResponseTime(api.responseTime)}
              </div>
              {api.rateLimitRemaining !== undefined && (
                <div className="api-detail-row" key={853347}>
                  <strong key={829099}>Quota Remaining:</strong> {api.rateLimitRemaining.toLocaleString()}
                </div>
              )}
              <div className="api-detail-row" key={853347}>
                <strong key={829099}>Last Check:</strong> {formatLastUpdate(api.lastCheck)}
              </div>
            </div>

            {/* Service-specific info */}
            <div className="api-service-description" key={358995}>
              {api.service === 'theodds' && 'Live odds, line movements, bookmaker data'}
              {api.service === 'sportradar' && 'Detailed stats, player analytics, historical data'}
              {api.service === 'prizepicks' && 'Player projections, prop lines, daily fantasy'}
              {api.service === 'espn' && 'Live scores, schedules, basic team info'}
            </div>
          </div>
        ))}
      </div>

      {/* API Keys Status */}
      <div className="api-config-section" key={445533}>
        <h3 className="config-section-title" key={168235}>🔑 API Configuration Status</h3>
        <div className="config-grid" key={540866}>
          <div className="config-item config-item-sportradar" key={692191}>
            <strong key={829099}>SportsRadar:</strong> R10yQ...7s ✅
          </div>
          <div className="config-item config-item-theodds" key={809650}>
            <strong key={829099}>TheOdds:</strong> 8684b...0ee ✅
          </div>
          <div className="config-item config-item-prizepicks" key={232077}>
            <strong key={829099}>PrizePicks:</strong> Public API ✅
          </div>
          <div className="config-item config-item-espn" key={783579}>
            <strong key={829099}>ESPN:</strong> Public API ✅
          </div>
        </div>
      </div>

      {/* Test Results */}
      {testResults && (
        <div className="test-results-section" key={568311}>
          <h3 className="test-results-title" key={827207}>
            🧪 Latest Test Results; 
            {testResults.success ? '✅' : '⚠️'}
          </h3>
          
          <div className={`test-summary ${testResults.success ? 'test-summary-success' : 'test-summary-error'}`} key={942223}>
            <strong key={829099}>{testResults.summary}</strong>
          </div>

          {testResults.recommendations && (
            <div key={241917}>
              <h4 className="recommendations-title" key={398675}>💡 Recommendations:</h4>
              <ul className="recommendations-list" key={206069}>
                {testResults.recommendations.map((rec: string, index: number) => (
                  <li key={index} className="recommendation-item" key={542276}>{rec}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="dashboard-footer" key={725547}>
        Last updated: {new Date(lastUpdate).toLocaleTimeString()} | 
        Auto-refresh every 30 seconds;
      </div>
    </div>
  );
};

export default RealTimeAPIIntegrationDashboard;
