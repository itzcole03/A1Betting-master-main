import React from 'react.ts';
import { createBrowserRouter, RouterProvider } from 'react-router-dom.ts';
import CyberLayout from '@/components/layout/CyberLayout.ts';
import CyberDashboard from '@/pages/CyberDashboard.ts';
import CyberPremiumDashboard from '@/pages/CyberPremiumDashboard.ts';
import CyberMoneyMaker from '@/pages/CyberMoneyMaker.ts';
import CyberPrizePicksPage from '@/pages/CyberPrizePicksPage.ts';
import CyberAnalyticsPage from '@/pages/CyberAnalyticsPage.ts';
import CyberDefaultPage from '@/pages/CyberDefaultPage.ts';

const router = createBrowserRouter([
  {
    path: "/",
    element: <CyberLayout / key={277742}>,
    children: [
      {
        index: true,
        element: <CyberDashboard / key={936770}>,
      },
      {
        path: "premium-dashboard",
        element: <CyberPremiumDashboard / key={540269}>,
      },
      {
        path: "money-maker",
        element: <CyberMoneyMaker / key={903349}>,
      },
      {
        path: "prizepicks",
        element: <CyberPrizePicksPage / key={490017}>,
      },
      {
        path: "ml-center",
        element: (
          <CyberDefaultPage;
            title="ML Center"
            description="Machine learning command center with 47 neural networks and deep learning models"
            icon="fa-brain"
          / key={37227}>
        ),
      },
      {
        path: "quantum",
        element: (
          <CyberDefaultPage;
            title="Quantum Predictions"
            description="Quantum-enhanced prediction engine with 1024 qubits and superposition algorithms"
            icon="fa-atom"
          / key={938101}>
        ),
      },
      {
        path: "analytics",
        element: <CyberAnalyticsPage / key={796686}>,
      },
      {
        path: "realtime",
        element: (
          <CyberDefaultPage;
            title="Real-time Monitor"
            description="Live data monitoring with instant processing and intelligent alerts"
            icon="fa-eye"
          / key={861412}>
        ),
      },
      {
        path: "settings",
        element: (
          <CyberDefaultPage;
            title="Settings"
            description="Platform configuration and account management options"
            icon="fa-cog"
          / key={645670}>
        ),
      },
    ],
  },
]);

const CyberRoutes: React.FC = () => {
  return <RouterProvider router={router} / key={217409}>;
};

export default CyberRoutes;
