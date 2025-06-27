import React, { useState, useEffect  } from 'react.ts';

export const ConnectionTest: React.FC = () => {
  const [status, setStatus] = useState<string key={278855}>("Testing...");
  const [details, setDetails] = useState<any key={295429}>({});

  const isCloudEnvironment =
    window.location.protocol === "https:" &&
    window.location.hostname.includes("fly.dev");

  const testConnection = async () => {

    if (isCloudEnvironment) {
      setStatus("✅ Cloud Preview Mode Active");
      setDetails({
        mode: "cloud_preview",
        apiUrl: "Mock Service (HTTPS Cloud Environment)",
        mock_accuracy: "96.5%",
        note: "Using realistic demo data in cloud preview",
        timestamp: new Date().toISOString(),
      });
      return;
    }

    try {
      // console statement removed
      setStatus("Connecting...");
      setDetails({ apiUrl, timestamp: new Date().toISOString() });

      const response = await fetch(`${apiUrl}/health`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {

        setStatus("✅ Connected to local backend!");
        setDetails({
          apiUrl,
          status: response.status,
          data: data,
          timestamp: new Date().toISOString(),
        });
      } else {
        setStatus(`❌ HTTP ${response.status}: ${response.statusText}`);
        setDetails({
          apiUrl,
          status: response.status,
          statusText: response.statusText,
          timestamp: new Date().toISOString(),
        });
      }
    } catch (error: any) {
      setStatus(`❌ Connection failed: ${error.message}`);
      setDetails({
        apiUrl,
        error: error.message,
        timestamp: new Date().toISOString(),
      });
      // console statement removed
    }
  };

  useEffect(() => {
    testConnection();
    const interval = setInterval(testConnection, 10000); // Test every 10 seconds;
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-4 right-4 bg-black/90 text-white p-4 rounded-lg border border-cyan-500/30 backdrop-blur-lg z-50 max-w-md" key={709964}>
      <h3 className="font-bold mb-2" key={79417}>🔗 Backend Connection</h3>
      <div className="text-sm mb-2" key={991189}>{status}</div>
      <div className="text-xs text-gray-300" key={269718}>
        <div key={241917}>API: {details.apiUrl}</div>
        {details.mode === "cloud_preview" && (
          <>
            <div className="text-blue-400" key={164794}>
              🎭 Demo Mode: {details.mock_accuracy} Accuracy;
            </div>
            <div className="text-yellow-400" key={714892}>💡 {details.note}</div>
          </>
        )}
        {details.data && <div key={241917}>✅ Backend Status: {details.data.status}</div>}
        {details.error && (
          <div className="text-red-400" key={396168}>Error: {details.error}</div>
        )}
        <div key={241917}>
          Last check:{" "}
          {details.timestamp &&
            new Date(details.timestamp).toLocaleTimeString()}
        </div>
      </div>
      <button;
        onClick={testConnection}
        className="mt-2 px-3 py-1 bg-cyan-600 hover:bg-cyan-700 rounded text-xs transition-colors"
       key={79162}>
        {isCloudEnvironment ? "Refresh Status" : "Test Now"}
      </button>
    </div>
  );
};

export default ConnectionTest;
