import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

// Simple App component
function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">
          A1 Betting Platform
        </h1>
        <div className="text-center">
          <p className="text-lg mb-4">
            Welcome to the A1 Betting Platform
          </p>
          <div className="bg-gray-800 rounded-lg p-6 max-w-md mx-auto">
            <h2 className="text-xl font-semibold mb-4">Status</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Frontend:</span>
                <span className="text-green-400">✓ Running</span>
              </div>
              <div className="flex justify-between">
                <span>Backend:</span>
                <span className="text-yellow-400">⚠ Connecting...</span>
              </div>
              <div className="flex justify-between">
                <span>Database:</span>
                <span className="text-yellow-400">⚠ Connecting...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
