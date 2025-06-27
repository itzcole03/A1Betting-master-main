/**
 * Main Dashboard - Simple User Interface;
 * Focuses on delivering winning sports bets without overwhelming users;
 * All complexity happens autonomously in the background;
 */

import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  Typography,
} from '@mui/material.ts';
import {
  BarChart3,
  DollarSign,
  MessageCircle,
  Target,
  TrendingUp,
  Zap,
} from 'lucide-react.ts';
import React, { useEffect, useState  } from 'react.ts';

interface DashboardStats {
  totalProfit: number;
  aiWinRate: number;
  liveAccuracy: number;
  activeAlerts: number;
}

interface ServiceCard {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  status: "ready" | "active" | "processing";
  buttonText: string;
  gradient: string;
}

const MainDashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats key={506295}>({
    totalProfit: 48390,
    aiWinRate: 94.7,
    liveAccuracy: 97.3,
    activeAlerts: 6,
  });

  const [services] = useState<ServiceCard[] key={862029}>([
    {
      id: "money-maker",
      title: "Money Maker Pro",
      description: "AI-powered profit generation with quantum enhancement",
      icon: <DollarSign size={32} / key={443333}>,
      status: "ready",
      buttonText: "GET STARTED",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    },
    {
      id: "prize-picks",
      title: "PrizePicks Pro",
      description: "Enhanced player prop analysis with AI recommendations",
      icon: <Target size={32} / key={929810}>,
      status: "ready",
      buttonText: "GET STARTED",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    },
    {
      id: "prop-ollama",
      title: "propOllama Chat",
      description: "Discuss all things sports with a real-time AI expert",
      icon: <MessageCircle size={32} / key={268442}>,
      status: "ready",
      buttonText: "GET STARTED",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    },
    {
      id: "live-analytics",
      title: "Live Analytics",
      description: "Real-time data analysis and performance tracking",
      icon: <BarChart3 size={32} / key={130400}>,
      status: "active",
      buttonText: "GET STARTED",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    },
  ]);

  // Simulate real-time updates (this would connect to your backend WebSocket)
  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prev) => ({
        ...prev,
        totalProfit: prev.totalProfit + Math.floor(Math.random() * 50),
        liveAccuracy: Math.min(
          99.9,
          prev.liveAccuracy + (Math.random() - 0.5) * 0.1,
        ),
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleServiceClick = (serviceId: string) => {
    // This will navigate to the specific service;
    // console statement removed
    // TODO: Navigate to service component;
  };

  return (
    <Box sx={{ maxWidth: "1200px", mx: "auto", p: 2 }} key={456553}>
      {/* System Status Header */}
      <Box sx={{ textAlign: "center", mb: 4 }} key={416534}>
        <Typography;
          variant="h3"
          sx={{ color: "white", mb: 1, fontWeight: "bold" }}
         key={685770}>
          A1BETTING INTELLIGENCE;
        </Typography>
        <Typography variant="h6" sx={{ color: "rgba(255,255,255,0.8)", mb: 2 }} key={536816}>
          Real-time AI-powered sports analysis with quantum enhancement;
        </Typography>

        {/* Status Indicators */}
        <Box sx={{ display: "flex", justifyContent: "center", gap: 3, mb: 3 }} key={508538}>
          <Chip;
            label="All Systems Online"
            color="success"
            variant="filled"
            sx={{ fontWeight: "bold" }}
          / key={47181}>
          <Chip;
            label="25 Live Games"
            color="info"
            variant="filled"
            sx={{ fontWeight: "bold" }}
          / key={789163}>
          <Chip;
            label="Quantum Processing Active"
            color="secondary"
            variant="filled"
            sx={{ fontWeight: "bold" }}
          / key={604588}>
        </Box>
      </Box>

      {/* Key Metrics Row */}
      <Grid container spacing={3} sx={{ mb: 4 }} key={805413}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }} key={803833}>
          <Card sx={{ textAlign: "center", p: 2 }} key={764292}>
            <CardContent key={452065}>
              <Avatar sx={{ mx: "auto", mb: 1, bgcolor: "#00ffaa" }} key={597407}>
                <DollarSign / key={760106}>
              </Avatar>
              <Typography;
                variant="h4"
                sx={{ color: "#00ffaa", fontWeight: "bold" }}
               key={514615}>
                ${stats.totalProfit.toLocaleString()}
              </Typography>
              <Typography variant="body2" color="textSecondary" key={565471}>
                Total Profit (Today)
              </Typography>
              <Chip;
                label="+$190 (9%)"
                size="small"
                color="success"
                sx={{ mt: 1 }}
              / key={612465}>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }} key={803833}>
          <Card sx={{ textAlign: "center", p: 2 }} key={764292}>
            <CardContent key={452065}>
              <Avatar sx={{ mx: "auto", mb: 1, bgcolor: "#667eea" }} key={204405}>
                <Target / key={335248}>
              </Avatar>
              <Typography;
                variant="h4"
                sx={{ color: "#667eea", fontWeight: "bold" }}
               key={738383}>
                {stats.aiWinRate}%
              </Typography>
              <Typography variant="body2" color="textSecondary" key={565471}>
                AI Win Rate;
              </Typography>
              <Chip;
                label="+0.3% (24h)"
                size="small"
                color="success"
                sx={{ mt: 1 }}
              / key={66631}>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }} key={803833}>
          <Card sx={{ textAlign: "center", p: 2 }} key={764292}>
            <CardContent key={452065}>
              <Avatar sx={{ mx: "auto", mb: 1, bgcolor: "#764ba2" }} key={429007}>
                <TrendingUp / key={53470}>
              </Avatar>
              <Typography;
                variant="h4"
                sx={{ color: "#764ba2", fontWeight: "bold" }}
               key={366396}>
                {stats.liveAccuracy.toFixed(1)}%
              </Typography>
              <Typography variant="body2" color="textSecondary" key={565471}>
                Live Accuracy;
              </Typography>
              <Chip;
                label="+0.2% (1h)"
                size="small"
                color="success"
                sx={{ mt: 1 }}
              / key={789900}>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }} key={803833}>
          <Card sx={{ textAlign: "center", p: 2 }} key={764292}>
            <CardContent key={452065}>
              <Avatar sx={{ mx: "auto", mb: 1, bgcolor: "#00ffaa" }} key={597407}>
                <Zap / key={614982}>
              </Avatar>
              <Typography;
                variant="h4"
                sx={{ color: "#00ffaa", fontWeight: "bold" }}
               key={514615}>
                {stats.activeAlerts}
              </Typography>
              <Typography variant="body2" color="textSecondary" key={565471}>
                Live Alerts;
              </Typography>
              <Chip;
                label="+3 new"
                size="small"
                color="warning"
                sx={{ mt: 1 }}
              / key={940415}>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Service Cards */}
      <Grid container spacing={3} key={459826}>
        {services.map((service) => (
          <Grid size={{ xs: 12, md: 6 }} key={service.id} key={791268}>
            <Card;
              sx={{
                p: 3,
                cursor: "pointer",
                transition: "transform 0.2s",
                "&:hover": {
                  transform: "translateY(-4px)",
                },
              }}
              onClick={() = key={733673}> handleServiceClick(service.id)}
            >
              <CardContent key={452065}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }} key={434247}>
                  <Avatar sx={{ mr: 2, bgcolor: "#00ffaa" }} key={952767}>
                    {service.icon}
                  </Avatar>
                  <Box key={485947}>
                    <Typography variant="h6" sx={{ fontWeight: "bold" }} key={766598}>
                      {service.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" key={565471}>
                      {service.description}
                    </Typography>
                  </Box>
                </Box>

                <Button;
                  variant="contained"
                  fullWidth;
                  sx={{
                    background: "linear-gradient(45deg, #00ffaa, #00cc88)",
                    fontWeight: "bold",
                    py: 1.5,
                    "&:hover": {
                      background: "linear-gradient(45deg, #00cc88, #00aa66)",
                    },
                  }}
                 key={942235}>
                  {service.buttonText} →
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Live Games Analysis Footer */}
      <Box sx={{ textAlign: "center", mt: 4, p: 2 }} key={891513}>
        <Typography variant="h6" sx={{ color: "#00ffaa", mb: 1 }} key={104656}>
          🔴 Live Games Analysis;
        </Typography>
        <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.7)" }} key={249743}>
          AI is actively monitoring 25 live games and processing real-time;
          opportunities;
        </Typography>
      </Box>
    </Box>
  );
};

export default MainDashboard;
