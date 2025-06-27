/**
 * Development Startup Guide;
 * Explains the backend-frontend integration setup;
 */

import React from 'react.ts';
import { motion } from 'framer-motion.ts';
import {
  CheckCircle,
  Server,
  Globe,
  Database,
  Code,
  Play,
  ExternalLink,
} from 'lucide-react.ts';

export const DevelopmentGuide: React.FC = () => {
  const steps = [
    {
      icon: <Server className="w-6 h-6" / key={10934}>,
      title: "Backend Development Server",
      description:
        "A Node.js Express server running on port 8000 provides all API endpoints",
      status: "running",
      details: [
        "Mock betting opportunities and arbitrage data",
        "Real-time WebSocket connections",
        "ML model performance metrics",
        "User analytics and transaction tracking",
      ],
    },
    {
      icon: <Globe className="w-6 h-6" / key={209272}>,
      title: "Frontend React Application",
      description:
        "Vite development server on port 5173 with proxy configuration",
      status: "running",
      details: [
        "Real-time API integration",
        "React Query for data management",
        "WebSocket for live updates",
        "Responsive UI components",
      ],
    },
    {
      icon: <Database className="w-6 h-6" / key={972292}>,
      title: "API Integration Layer",
      description: "Unified service layer connecting frontend to backend APIs",
      status: "active",
      details: [
        "Automatic error handling and fallbacks",
        "Type-safe API calls",
        "Real-time data synchronization",
        "Performance monitoring",
      ],
    },
  ];

  return (
    <div className="p-6 bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg shadow-2xl text-white" key={250435}>
      <div className="mb-6" key={677855}>
        <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent" key={633622}>
          Development Environment Status;
        </h2>
        <p className="text-gray-300" key={821246}>
          Your A1Betting application is now running with full backend-frontend;
          integration;
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-8" key={123586}>
        {steps.map((step, index) => (
          <motion.div;
            key={step.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            className="p-4 bg-gray-800/50 rounded-lg border border-gray-700 backdrop-blur-sm"
           key={121534}>
            <div className="flex items-center mb-3" key={393188}>
              <div className="text-cyan-400 mr-3" key={819666}>{step.icon}</div>
              <h3 className="font-semibold" key={204068}>{step.title}</h3>
              <CheckCircle className="w-4 h-4 text-green-400 ml-auto" / key={927303}>
            </div>

            <p className="text-sm text-gray-300 mb-4" key={541307}>{step.description}</p>

            <ul className="space-y-1" key={662051}>
              {step.details.map((detail, i) => (
                <li key={i} className="text-xs text-gray-400 flex items-center" key={57155}>
                  <div className="w-1 h-1 bg-cyan-400 rounded-full mr-2" key={89810}></div>
                  {detail}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      <div className="bg-gray-800/30 rounded-lg p-6 border border-gray-700" key={97148}>
        <h3 className="text-xl font-semibold mb-4 flex items-center" key={228927}>
          <Play className="w-5 h-5 text-green-400 mr-2" / key={62035}>
          What's Running Now;
        </h3>

        <div className="grid md:grid-cols-2 gap-6" key={809210}>
          <div key={241917}>
            <h4 className="font-medium text-cyan-400 mb-3" key={210482}>Active Services</h4>
            <div className="space-y-2" key={725977}>
              <div className="flex items-center justify-between p-2 bg-gray-800/50 rounded" key={920049}>
                <span className="text-sm" key={887361}>Frontend (Vite)</span>
                <span className="text-xs text-green-400" key={389777}>Port 5173</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-gray-800/50 rounded" key={920049}>
                <span className="text-sm" key={887361}>Backend API</span>
                <span className="text-xs text-green-400" key={389777}>Port 8000</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-gray-800/50 rounded" key={920049}>
                <span className="text-sm" key={887361}>WebSocket</span>
                <span className="text-xs text-green-400" key={389777}>
                  ws://localhost:8000;
                </span>
              </div>
            </div>
          </div>

          <div key={241917}>
            <h4 className="font-medium text-cyan-400 mb-3" key={210482}>
              Available Endpoints;
            </h4>
            <div className="space-y-2 text-sm" key={726391}>
              <div className="flex items-center" key={520222}>
                <Code className="w-3 h-3 text-gray-400 mr-2" / key={259885}>
                <span key={595076}>/api/betting-opportunities</span>
              </div>
              <div className="flex items-center" key={520222}>
                <Code className="w-3 h-3 text-gray-400 mr-2" / key={259885}>
                <span key={595076}>/api/arbitrage-opportunities</span>
              </div>
              <div className="flex items-center" key={520222}>
                <Code className="w-3 h-3 text-gray-400 mr-2" / key={259885}>
                <span key={595076}>/api/ultra-accuracy/predictions</span>
              </div>
              <div className="flex items-center" key={520222}>
                <Code className="w-3 h-3 text-gray-400 mr-2" / key={259885}>
                <span key={595076}>/api/analytics/advanced</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-6" key={799725}>
          <a;
            href="http://localhost:8000/health"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-cyan-600 text-white rounded hover:bg-cyan-700 transition-colors"
           key={213616}>
            <ExternalLink className="w-4 h-4 mr-2" / key={948388}>
            Backend Health Check;
          </a>

          <a;
            href="http://localhost:8000/api/betting-opportunities"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
           key={719562}>
            <ExternalLink className="w-4 h-4 mr-2" / key={948388}>
            Sample API Data;
          </a>
        </div>
      </div>

      <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg" key={498025}>
        <h4 className="font-medium text-blue-400 mb-2" key={866698}>
          🎯 Integration Complete!
        </h4>
        <p className="text-sm text-gray-300" key={741226}>
          Your application now has a working backend that provides real-time;
          betting data, ML predictions, analytics, and user management. The;
          frontend automatically connects to the backend and handles all data;
          synchronization.
        </p>
      </div>
    </div>
  );
};

export default DevelopmentGuide;
