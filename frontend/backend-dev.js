/**
 * Development Backend Server;
 * Provides a lightweight backend for development purposes;
 */

import express from "express";
import cors from "cors";
import { WebSocketServer } from "ws";
import http from "http";

// Ensure fetch is available in Node.js;
if (!globalThis.fetch) {
  try {
    const { default: fetch } = await import("node-fetch");
    globalThis.fetch = fetch;
  } catch (e) {
    // console statement removed
  }
}


// Middleware;
app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);
app.use(express.json());

// Mock data;
const mockBettingOpportunities = [
  {
    id: "opp_1",
    sport: "basketball",
    event: "Lakers vs Warriors",
    market: "Moneyline",
    odds: 1.85,
    probability: 0.65,
    expected_value: 0.08,
    kelly_fraction: 0.04,
    confidence: 0.78,
    risk_level: "medium",
    recommendation: "BUY",
  },
  {
    id: "opp_2",
    sport: "football",
    event: "Chiefs vs Bills",
    market: "Over/Under 47.5",
    odds: 1.91,
    probability: 0.58,
    expected_value: 0.06,
    kelly_fraction: 0.03,
    confidence: 0.72,
    risk_level: "low",
    recommendation: "STRONG_BUY",
  },
];

const mockArbitrageOpportunities = [
  {
    id: "arb_1",
    sport: "basketball",
    event: "Celtics vs Heat",
    bookmaker_a: "DraftKings",
    bookmaker_b: "FanDuel",
    odds_a: 2.1,
    odds_b: 1.95,
    profit_margin: 0.025,
    required_stake: 1000,
  },
];

const mockTransactions = [
  {
    id: "txn_1",
    type: "bet",
    amount: -100.0,
    description: "Lakers vs Warriors - Lakers ML",
    timestamp: "2024-01-15T10:30:00Z",
    status: "completed",
  },
  {
    id: "txn_2",
    type: "win",
    amount: 180.0,
    description: "Lakers vs Warriors - Win",
    timestamp: "2024-01-15T22:45:00Z",
    status: "completed",
  },
];

const mockPredictions = [
  {
    id: "pred_1",
    sport: "basketball",
    event: "Lakers vs Warriors",
    prediction: "Lakers to win",
    confidence: 0.78,
    odds: 1.85,
    expected_value: 0.08,
    timestamp: new Date().toISOString(),
    model_version: "v2.1",
    features: {
      recent_form: 0.82,
      head_to_head: 0.65,
      injury_impact: 0.23,
      home_advantage: 0.15,
    },
  },
];

// Routes;
app.get("/", (req, res) => {
  res.json({
    name: "A1Betting Development Backend",
    version: "1.0.0",
    status: "operational",
    timestamp: new Date().toISOString(),
    features: [
      "Betting Opportunities",
      "Arbitrage Detection",
      "Transaction Tracking",
      "ML Predictions",
      "Risk Management",
    ],
  });
});

app.get("/health", (req, res) => {
  res.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    version: "1.0.0",
    uptime: process.uptime(),
    services: {
      prediction_engine: "operational",
      betting_service: "operational",
      risk_management: "operational",
      arbitrage_detection: "operational",
    },
  });
});

// API Routes;
app.get("/api/betting-opportunities", (req, res) => {
  const { sport, limit = 10 } = req.query;
  const opportunities = [...mockBettingOpportunities];

  if (sport) {
    opportunities = opportunities.filter((opp) => opp.sport === sport);
  }

  res.json(opportunities.slice(0, parseInt(limit)));
});

app.get("/api/arbitrage-opportunities", (req, res) => {
  const { limit = 5 } = req.query;
  res.json(mockArbitrageOpportunities.slice(0, parseInt(limit)));
});

// Value bets endpoint (v4 API)
app.get("/api/v4/betting/value-bets", (req, res) => {
  const { limit = 10 } = req.query;
  const valueBets = mockBettingOpportunities;
    .filter((opp) => opp.expected_value > 0.05) // Only high value bets;
    .map((opp) => ({
      id: opp.id,
      sport: opp.sport,
      event: opp.event,
      market: opp.market,
      odds: opp.odds,
      probability: opp.probability,
      expected_value: opp.expected_value,
      confidence: opp.confidence,
      recommendation: opp.recommendation,
      value_score: opp.expected_value * opp.confidence,
    }))
    .slice(0, parseInt(limit));

  res.json({
    value_bets: valueBets,
    total_count: valueBets.length,
  });
});

// Backward compatibility endpoint for value-bets;
app.get("/api/value-bets", (req, res) => {
  const { limit = 10 } = req.query;
  const valueBets = mockBettingOpportunities;
    .filter((opp) => opp.expected_value > 0.05) // Only high value bets;
    .map((opp) => ({
      id: opp.id,
      sport: opp.sport,
      event: opp.event,
      market: opp.market,
      odds: opp.odds,
      probability: opp.probability,
      expected_value: opp.expected_value,
      confidence: opp.confidence,
      recommendation: opp.recommendation,
      value_score: opp.expected_value * opp.confidence,
    }))
    .slice(0, parseInt(limit));

  res.json(valueBets); // Return array directly for backward compatibility;
});

app.get("/api/transactions", (req, res) => {
  res.json({
    transactions: mockTransactions,
    total_count: mockTransactions.length,
  });
});

app.get("/api/active-bets", (req, res) => {
  const activeBets = [
    {
      id: "bet_1",
      event: "Lakers vs Warriors",
      market: "Moneyline",
      selection: "Lakers",
      odds: 1.85,
      stake: 100.0,
      potential_return: 185.0,
      status: "active",
      placed_at: "2024-01-16T14:20:00Z",
    },
  ];

  res.json({
    active_bets: activeBets,
    total_count: activeBets.length,
  });
});

app.get("/api/risk-profiles", (req, res) => {
  const profiles = [
    {
      id: "conservative",
      name: "Conservative",
      description: "Low risk, steady returns",
      max_bet_percentage: 0.02,
      kelly_multiplier: 0.25,
      min_confidence: 0.8,
    },
    {
      id: "moderate",
      name: "Moderate",
      description: "Balanced risk and reward",
      max_bet_percentage: 0.05,
      kelly_multiplier: 0.5,
      min_confidence: 0.7,
    },
    {
      id: "aggressive",
      name: "Aggressive",
      description: "Higher risk, higher potential returns",
      max_bet_percentage: 0.1,
      kelly_multiplier: 1.0,
      min_confidence: 0.6,
    },
  ];

  res.json({ profiles });
});

app.get("/api/predictions", (req, res) => {
  const { sport, limit = 10 } = req.query;
  const predictions = [...mockPredictions];

  if (sport) {
    predictions = predictions.filter((pred) => pred.sport === sport);
  }

  res.json({
    predictions: predictions.slice(0, parseInt(limit)),
    total_count: predictions.length,
  });
});

// User Profile API endpoints;
app.get("/api/users/profile", (req, res) => {
  res.json({
    data: {
      id: "user_123",
      name: "Elite Bettor",
      email: "elite@a1betting.com",
      tier: "Elite Pro",
      winRate: 87.3,
      totalProfit: 45780,
      accuracy: 92.1,
      memberSince: "2023-01-15",
      preferences: {
        theme: "dark",
        notifications: true,
        autoInvest: false,
      },
      bankroll: {
        total: 15000,
        available: 12350,
        allocated: 2650,
      },
    },
  });
});

app.get("/api/users/profile/mock", (req, res) => {
  res.json({
    data: {
      id: "mock_user_456",
      name: "Cyber Elite",
      email: "cyber@a1betting.com",
      tier: "Quantum Pro",
      winRate: 94.7,
      totalProfit: 78450,
      accuracy: 96.8,
      memberSince: "2023-01-01",
      preferences: {
        theme: "cyber",
        notifications: true,
        autoInvest: true,
        riskLevel: "aggressive",
      },
      bankroll: {
        total: 25000,
        available: 18750,
        allocated: 6250,
      },
      stats: {
        totalBets: 1247,
        winningBets: 1180,
        avgBetSize: 185,
        maxWin: 2850,
        streak: 23,
      },
    },
  });
});

app.put("/api/users/profile", (req, res) => {

  res.json({
    data: {
      id: "user_123",
      ...updateData,
      updatedAt: new Date().toISOString(),
    },
  });
});

app.get("/api/users/bankroll", (req, res) => {
  res.json({
    data: {
      total: 15000,
      available: 12350,
      allocated: 2650,
      pending: 0,
      profit: 3450,
      loss: 890,
      roi: 23.4,
      updated: new Date().toISOString(),
    },
  });
});

// Ultra-accuracy endpoints;
app.get("/api/ultra-accuracy/predictions", (req, res) => {
  res.json({
    predictions: mockPredictions.map((pred) => ({
      ...pred,
      accuracy_score: 0.92,
      shap_values: {
        recent_form: 0.35,
        matchup_history: 0.28,
        injury_report: -0.12,
        weather: 0.05,
      },
    })),
    model_performance: {
      accuracy: 0.92,
      precision: 0.89,
      recall: 0.94,
      f1_score: 0.91,
    },
  });
});

app.get("/api/ultra-accuracy/model-performance", (req, res) => {
  res.json({
    overall_accuracy: 0.92,
    recent_accuracy: 0.94,
    model_metrics: {
      precision: 0.89,
      recall: 0.94,
      f1_score: 0.91,
      auc_roc: 0.96,
    },
    performance_by_sport: {
      basketball: { accuracy: 0.94, games: 156 },
      football: { accuracy: 0.9, games: 98 },
      baseball: { accuracy: 0.91, games: 203 },
    },
  });
});

// Enhanced analytics endpoints;
app.get("/api/analytics/advanced", (req, res) => {
  res.json({
    roi_analysis: {
      overall_roi: 12.5,
      monthly_roi: 8.3,
      win_rate: 0.64,
    },
    bankroll_metrics: {
      current_balance: 5420.5,
      total_wagered: 12800.0,
      profit_loss: 420.5,
      max_drawdown: -245.0,
    },
    performance_trends: [
      { date: "2024-01-01", cumulative_profit: 0 },
      { date: "2024-01-15", cumulative_profit: 420.5 },
    ],
  });
});

// =======================
// PRIZEPICKS FREE API PROXY ENDPOINTS;
// =======================

// PrizePicks projections proxy;
app.get("/api/prizepicks/projections", async (req, res) => {
  try {
    const response = await fetch("https://api.prizepicks.com/projections", {
      headers: {
        "User-Agent": "A1Betting-PrizePicks/1.0",
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`PrizePicks API error: ${response.status}`);
    }

    res.json({
      ...data,
      proxy_info: {
        source: "PrizePicks Free API",
        proxied_at: new Date().toISOString(),
        total_projections: data.data?.length || 0,
      },
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch PrizePicks projections",
      message: error.message,
      fallback_available: true,
    });
  }
});

// PrizePicks projections by sport;
app.get("/api/prizepicks/projections/:sport", async (req, res) => {
  try {
    const { sport } = req.params;
    const response = await fetch("https://api.prizepicks.com/projections", {
      headers: {
        "User-Agent": "A1Betting-PrizePicks/1.0",
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`PrizePicks API error: ${response.status}`);
    }

    // Filter by sport if leagues are included;
    const filteredProjections = data.data || [];
    const filteredLeagues = [];

    if (data.included) {

      filteredLeagues = leagues.filter(
        (league) =>
          league.attributes.sport;
            ?.toLowerCase()
            .includes(sport.toLowerCase()) ||
          league.attributes.name?.toLowerCase().includes(sport.toLowerCase()),
      );

      filteredProjections = filteredProjections.filter((projection) =>
        leagueIds.includes(projection.relationships?.league?.data?.id),
      );
    }

    res.json({
      data: filteredProjections,
      included: data.included,
      sport_filter: sport,
      filtered_count: filteredProjections.length,
      total_count: data.data?.length || 0,
      proxy_info: {
        source: "PrizePicks Free API",
        proxied_at: new Date().toISOString(),
      },
    });
  } catch (error) {
    res.status(500).json({
      error: `Failed to fetch ${req.params.sport} projections`,
      message: error.message,
      fallback_available: true,
    });
  }
});

// Enhanced DailyFantasy API endpoints;
app.get("/api/dailyfantasy/contests/:sport", (req, res) => {
  const { sport } = req.params;
  const contests = [
    {
      id: "contest_nba_main",
      name: `${sport.toUpperCase()} Main Slate`,
      sport_id: sport === "nba" ? "4" : "1",
      entry_fee: 25,
      total_payouts: 100000,
      max_entries: 150000,
      starts_at: new Date(Date.now() + 3600000).toISOString(),
      salary_cap: 50000,
      draft_group_id: `dg_${sport}_${Date.now()}`,
    },
    {
      id: "contest_nba_turbo",
      name: `${sport.toUpperCase()} Turbo`,
      sport_id: sport === "nba" ? "4" : "1",
      entry_fee: 3,
      total_payouts: 10000,
      max_entries: 25000,
      starts_at: new Date(Date.now() + 1800000).toISOString(),
      salary_cap: 50000,
      draft_group_id: `dg_${sport}_turbo_${Date.now()}`,
    },
  ];

  res.json(contests);
});

app.get("/api/dailyfantasy/contests/:contestId/players", (req, res) => {
  const { contestId } = req.params;
  const players = [
    {
      id: "player_lebron",
      name: "LeBron James",
      position: "SF",
      team_abbreviation: "LAL",
      salary: 11500,
      projected_fantasy_points: 58.2,
      average_fantasy_points: 56.8,
      injury_status: "GTD",
      game_info: {
        game_date: new Date().toISOString(),
        opponent: "GSW",
        home_away: "HOME",
      },
    },
    {
      id: "player_curry",
      name: "Stephen Curry",
      position: "PG",
      team_abbreviation: "GSW",
      salary: 10800,
      projected_fantasy_points: 54.7,
      average_fantasy_points: 52.3,
      game_info: {
        game_date: new Date().toISOString(),
        opponent: "LAL",
        home_away: "AWAY",
      },
    },
    {
      id: "player_ad",
      name: "Anthony Davis",
      position: "C",
      team_abbreviation: "LAL",
      salary: 10200,
      projected_fantasy_points: 52.1,
      average_fantasy_points: 50.4,
      game_info: {
        game_date: new Date().toISOString(),
        opponent: "GSW",
        home_away: "HOME",
      },
    },
  ];

  res.json(players);
});

// Enhanced TheOdds API endpoints;
app.get("/api/theodds/sports", (req, res) => {
  const sports = [
    {
      key: "americanfootball_nfl",
      group: "American Football",
      title: "NFL",
      description: "National Football League",
      active: true,
      has_outrights: true,
    },
    {
      key: "basketball_nba",
      group: "Basketball",
      title: "NBA",
      description: "National Basketball Association",
      active: true,
      has_outrights: true,
    },
    {
      key: "baseball_mlb",
      group: "Baseball",
      title: "MLB",
      description: "Major League Baseball",
      active: true,
      has_outrights: true,
    },
  ];

  res.json(sports);
});

app.get("/api/theodds/odds/:sport", (req, res) => {
  const { sport } = req.params;
  const { regions = "us", markets = "h2h", oddsFormat = "decimal" } = req.query;

  const events = [
    {
      id: `${sport}_event_1`,
      sport_key: sport,
      sport_title: sport.toUpperCase(),
      commence_time: new Date(Date.now() + 3600000).toISOString(),
      home_team: "Lakers",
      away_team: "Warriors",
      bookmakers: [
        {
          key: "draftkings",
          title: "DraftKings",
          last_update: new Date().toISOString(),
          markets: [
            {
              key: "h2h",
              last_update: new Date().toISOString(),
              outcomes: [
                { name: "Lakers", price: 1.91 },
                { name: "Warriors", price: 1.95 },
              ],
            },
            {
              key: "spreads",
              last_update: new Date().toISOString(),
              outcomes: [
                { name: "Lakers", price: 1.91, point: -3.5 },
                { name: "Warriors", price: 1.91, point: 3.5 },
              ],
            },
            {
              key: "totals",
              last_update: new Date().toISOString(),
              outcomes: [
                { name: "Over", price: 1.91, point: 225.5 },
                { name: "Under", price: 1.91, point: 225.5 },
              ],
            },
          ],
        },
        {
          key: "fanduel",
          title: "FanDuel",
          last_update: new Date().toISOString(),
          markets: [
            {
              key: "h2h",
              last_update: new Date().toISOString(),
              outcomes: [
                { name: "Lakers", price: 1.89 },
                { name: "Warriors", price: 1.97 },
              ],
            },
          ],
        },
      ],
    },
  ];

  res.json(events);
});

// Sportsbook aggregation endpoints;
app.get("/api/sportsbook/aggregated-odds/:sport", (req, res) => {
  const { sport } = req.params;
  const { league } = req.query;

  const aggregatedEvents = [
    {
      event_id: `${sport}_agg_1`,
      sport,
      league: league || "NFL",
      commence_time: new Date(Date.now() + 3600000).toISOString(),
      home_team: "Lakers",
      away_team: "Warriors",
      sportsbooks: [
        {
          sportsbook: "DraftKings",
          moneyline_home: -110,
          moneyline_away: +105,
          spread_home: -110,
          spread_away: -110,
          spread_line: -3.5,
          total_over: -110,
          total_under: -110,
          total_line: 225.5,
          last_updated: new Date().toISOString(),
        },
        {
          sportsbook: "FanDuel",
          moneyline_home: -115,
          moneyline_away: +110,
          spread_home: -105,
          spread_away: -115,
          spread_line: -3.5,
          total_over: -105,
          total_under: -115,
          total_line: 226.0,
          last_updated: new Date().toISOString(),
        },
      ],
      best_odds: {
        moneyline_home: {
          sportsbook: "DraftKings",
          moneyline_home: -110,
          last_updated: new Date().toISOString(),
        },
        moneyline_away: {
          sportsbook: "FanDuel",
          moneyline_away: +110,
          last_updated: new Date().toISOString(),
        },
        spread_home: {
          sportsbook: "FanDuel",
          spread_home: -105,
          spread_line: -3.5,
          last_updated: new Date().toISOString(),
        },
        spread_away: {
          sportsbook: "DraftKings",
          spread_away: -110,
          spread_line: 3.5,
          last_updated: new Date().toISOString(),
        },
        over: {
          sportsbook: "FanDuel",
          total_over: -105,
          total_line: 226.0,
          last_updated: new Date().toISOString(),
        },
        under: {
          sportsbook: "DraftKings",
          total_under: -110,
          total_line: 225.5,
          last_updated: new Date().toISOString(),
        },
      },
    },
  ];

  res.json(aggregatedEvents);
});

app.get("/api/sportsbook/health/:sportsbook", (req, res) => {
  const { sportsbook } = req.params;

  // Simulate varying availability;
  const isHealthy = Math.random() > 0.2; // 80% uptime;

  if (isHealthy) {
    res.json({
      sportsbook,
      status: "healthy",
      response_time: Math.floor(Math.random() * 200) + 50,
      last_check: new Date().toISOString(),
    });
  } else {
    res.status(503).json({
      sportsbook,
      status: "degraded",
      error: "Service temporarily unavailable",
      last_check: new Date().toISOString(),
    });
  }
});

app.get("/api/sportsbook/health", (req, res) => {


  sportsbooks.forEach((book) => {
    health[book] = {
      status: Math.random() > 0.2 ? "healthy" : "degraded",
      response_time: Math.floor(Math.random() * 200) + 50,
      last_check: new Date().toISOString(),
    };
  });

  res.json({
    overall: Object.values(health).some((h) => h.status === "healthy")
      ? "healthy"
      : "degraded",
    sportsbooks: health,
    last_updated: new Date().toISOString(),
  });
});

// Ollama LLM endpoints;
app.get("/api/ollama/status", (req, res) => {
  res.json({
    connected: false,
    endpoint: "http://localhost:11434",
    available_models: [],
    message:
      "Ollama not detected. Install Ollama locally to enable AI chat features.",
    fallback_mode: true,
  });
});

// PropOllama Chat endpoint;
app.post("/api/propollama/chat", (req, res) => {
  const { message, context, analysisType } = req.body;

  // Mock response for PropOllama AI;
  const mockResponse = {
    content: `🤖 **PropOllama AI Analysis**

Your question: "${message}"

**Smart Betting Analysis:**
Based on current market data and advanced algorithms:

🎯 **Key Insights:**
- Line movement suggests value on the under;
- Weather conditions favor defensive play;
- Recent team performance indicates trend reversal;
- Public betting heavily on the favorite (fade opportunity)

📊 **Statistical Edge:**
- Model prediction: 73% confidence;
- Expected value: +4.2%
- Recommended bet size: 2.5% of bankroll;
- Risk level: Moderate;

⚡ **PropOllama Recommendation:**
LEAN UNDER with moderate confidence. Line shopping recommended.

*AI-powered analysis combining multiple data sources and betting models.*`,
    confidence: 87,
    suggestions: [
      "Check line movement trends",
      "Look for better odds elsewhere",
      "Consider live betting opportunities",
      "Monitor injury reports",
    ],
    model_used: "propollama_v2",
    response_time: 250,
    analysis_type: analysisType || "prop_analysis",
    timestamp: new Date().toISOString(),
  };

  // Simulate AI processing time;
  setTimeout(
    () => {
      res.json(mockResponse);
    },
    800 + Math.random() * 1500,
  );
});

app.post("/api/ollama/chat", (req, res) => {
  const { message, context, analysisType } = req.body;

  // Mock response when Ollama is not available;
  const mockResponse = {
    content: `🤖 **PropOllama Analysis** (Mock Mode)

Your question: "${message}"

**Quick Analysis:**
This is a development mock response. To get real AI-powered analysis:

1. **Install Ollama**: Download from https://ollama.ai;
2. **Install a model**: Run \`ollama pull llama3.2\`
3. **Start Ollama**: Ensure it's running on localhost:11434;

**General Betting Advice:**
- Always practice responsible gambling;
- Never bet more than you can afford to lose;
- Research thoroughly before placing bets;
- Consider using bankroll management strategies;

🎯 **Value Betting Tips:**
- Look for positive expected value (+EV) bets;
- Compare odds across multiple sportsbooks;
- Track your betting performance over time;
- Focus on sports/markets you understand best;

*This is a mock response. Real AI analysis requires Ollama installation.*`,
    confidence: 75,
    suggestions: [
      "Install Ollama locally",
      "Ask about bankroll management",
      "Learn about value betting",
      "Explain betting terminology",
    ],
    model_used: "development_mock",
    response_time: 150,
    analysis_type: analysisType || "general",
  };

  // Simulate AI thinking time;
  setTimeout(
    () => {
      res.json(mockResponse);
    },
    1000 + Math.random() * 2000,
  );
});

app.get("/api/ollama/models", (req, res) => {
  res.json({
    models: [],
    message:
      "No Ollama models detected. Install Ollama and download models to enable AI features.",
    suggested_models: [
      "llama3.2:latest",
      "llama3.1:latest",
      "mistral:latest",
      "phi3:latest",
    ],
    installation_guide: {
      step1: "Download Ollama from https://ollama.ai",
      step2: "Install and start Ollama",
      step3: "Run: ollama pull llama3.2",
      step4: "Restart your development server",
    },
  });
});

// SportsRadar API Integration;
const SPORTSRADAR_API_KEY =
  process.env.VITE_SPORTRADAR_API_KEY ||
  "R10yQbjTO5fZF6BPkfxjOaftsyN9X4ImAJv95H7s";

// Rate limiting for SportsRadar API;

const CACHE_TTL = 300000; // 5 minutes;
const lastSportsRadarRequest = 0;
const RATE_LIMIT_MS = 1000; // 1 request per second;

async function makeSportsRadarRequest(endpoint) {
  // Check cache first;

  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }

  // Rate limiting;


  if (timeSinceLastRequest < RATE_LIMIT_MS) {
    await new Promise((resolve) =>
      setTimeout(resolve, RATE_LIMIT_MS - timeSinceLastRequest),
    );
  }

  try {
    lastSportsRadarRequest = Date.now();

    if (!response.ok) {
      throw new Error(
        `SportsRadar API error: ${response.status} ${response.statusText}`,
      );
    }

    // Cache the response;
    sportsRadarCache.set(endpoint, {
      data,
      timestamp: Date.now(),
    });

    return data;
  } catch (error) {
    // console statement removed
    throw error;
  }
}

// SportsRadar Health Check;
app.get("/api/sportsradar/health", async (req, res) => {
  try {


    // Test different NBA API endpoints;
    const nbaEndpoints = [
      "/nba/trial/v8/en/league/hierarchy.json",
      "/nba/v7/en/league/hierarchy.json",
      "/nba/trial/v7/en/league/hierarchy.json",
    ];

    const nbaWorking = false;
    for (const endpoint of nbaEndpoints) {
      try {
        await makeSportsRadarRequest(endpoint);
        availableAPIs.push("NBA");
        apiStatus.nba = { status: "healthy", endpoint };
        nbaWorking = true;
        break;
      } catch (e) {
        // console statement removed
      }
    }

    if (!nbaWorking) {
      apiStatus.nba = {
        status: "degraded",
        error: "API key may be invalid or expired",
      };
    }

    // Test Odds Comparison API with fallback endpoints;
    const oddsEndpoints = [
      "/odds-comparison/trial/v2/en/us/sports.json",
      "/odds-comparison/v2/en/us/sports.json",
    ];

    const oddsWorking = false;
    for (const endpoint of oddsEndpoints) {
      try {
        await makeSportsRadarRequest(endpoint);
        availableAPIs.push("Odds Comparison");
        apiStatus.odds = { status: "healthy", endpoint };
        oddsWorking = true;
        break;
      } catch (e) {
        // console statement removed
      }
    }

    if (!oddsWorking) {
      apiStatus.odds = {
        status: "degraded",
        error: "API key may be invalid or expired",
      };
    }

    res.json({
      status: availableAPIs.length > 0 ? "healthy" : "degraded",
      availableAPIs,
      apiStatus,
      message:
        availableAPIs.length === 0;
          ? "All APIs unavailable - check API keys and network connectivity"
          : "API integration operational",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      error: "Health check failed",
      message: error.message,
      status: "unhealthy",
      availableAPIs: [],
    });
  }
});

// NBA Games - with date;
app.get("/api/sportsradar/nba/games/:date", async (req, res) => {
  try {

    // Try multiple endpoint versions;
    const endpoints = [
      `/nba/trial/v8/en/games/${date}/schedule.json`,
      `/nba/v7/en/games/${date}/schedule.json`,
      `/nba/trial/v7/en/games/${date}/schedule.json`,
    ];

    const data = null;
    const lastError = null;

    for (const endpoint of endpoints) {
      try {
        data = await makeSportsRadarRequest(endpoint);
        break;
      } catch (error) {
        lastError = error;
        // console statement removed
      }
    }

    if (!data) {
      // Return development fallback data when APIs are unavailable;
      const fallbackGames = [
        {
          gameId: "dev-game-1",
          sport: "NBA",
          status: "scheduled",
          scheduled: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
          homeTeam: {
            id: "lakers",
            name: "Los Angeles Lakers",
            abbreviation: "LAL",
          },
          awayTeam: {
            id: "warriors",
            name: "Golden State Warriors",
            abbreviation: "GSW",
          },
        },
      ];

      return res.json({
        games: fallbackGames,
        message:
          "Development mode: Using fallback data (SportsRadar API unavailable)",
        timestamp: new Date().toISOString(),
      });
    }

    const games =
      data.games?.map((game) => ({
        gameId: game.id,
        sport: "NBA",
        status: game.status,
        scheduled: game.scheduled,
        homeTeam: {
          id: game.home.id,
          name: game.home.name,
          abbreviation: game.home.alias,
        },
        awayTeam: {
          id: game.away.id,
          name: game.away.name,
          abbreviation: game.away.alias,
        },
        score:
          game.home_points !== undefined;
            ? {
                home: game.home_points,
                away: game.away_points,
              }
            : undefined,
      })) || [];

    res.json(games);
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch NBA games",
      message: error.message,
    });
  }
});

// NBA Games - today's games (without date parameter)
app.get("/api/sportsradar/nba/games", async (req, res) => {
  try {



    const games =
      data.games?.map((game) => ({
        gameId: game.id,
        sport: "NBA",
        status: game.status,
        scheduled: game.scheduled,
        homeTeam: {
          id: game.home.id,
          name: game.home.name,
          abbreviation: game.home.alias,
        },
        awayTeam: {
          id: game.away.id,
          name: game.away.name,
          abbreviation: game.away.alias,
        },
        score:
          game.home_points !== undefined;
            ? {
                home: game.home_points,
                away: game.away_points,
              }
            : undefined,
      })) || [];

    res.json(games);
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch NBA games",
      message: error.message,
    });
  }
});

// Player Stats;
app.get("/api/sportsradar/:sport/players/:playerId/stats", async (req, res) => {
  try {
    const { sport, playerId } = req.params;
    const { season = "2024" } = req.query;

    let sportEndpoint;
    switch (sport.toLowerCase()) {
      case "nba":
        sportEndpoint = "/nba/trial/v8/en";
        break;
      case "nfl":
        sportEndpoint = "/nfl/trial/v7/en";
        break;
      case "mlb":
        sportEndpoint = "/mlb/trial/v7/en";
        break;
      case "nhl":
        sportEndpoint = "/nhl/trial/v7/en";
        break;
      default:
        return res.status(400).json({ error: `Unsupported sport: ${sport}` });
    }


    if (!data.player) {
      return res.status(404).json({ error: "Player not found" });
    }

    const playerStats = {
      playerId: data.player.id,
      playerName: data.player.full_name,
      team: data.player.team?.name || "Unknown",
      position: data.player.position,
      season: season,
      stats: data.player.seasons?.[0]?.totals || {},
      recentForm: data.player.seasons?.[0]?.games?.slice(-10) || [],
    };

    res.json(playerStats);
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch player stats",
      message: error.message,
    });
  }
});

// Odds Comparison;
app.get("/api/sportsradar/odds/:sport", async (req, res) => {
  try {
    const { sport } = req.params;
    const { eventId } = req.query;

    const endpoint = `/odds-comparison/trial/v2/en/us/sports/${sport.toLowerCase()}/events.json`;
    if (eventId) {
      endpoint += `?event_id=${eventId}`;
    }

    const odds =
      data.events?.map((event) => ({
        eventId: event.id,
        sport: sport.toUpperCase(),
        homeTeam:
          event.competitors?.find((c) => c.qualifier === "home")?.name ||
          "Unknown",
        awayTeam:
          event.competitors?.find((c) => c.qualifier === "away")?.name ||
          "Unknown",
        odds: {
          moneyline: {
            home:
              event.markets;
                ?.find((m) => m.type === "moneyline")
                ?.books?.[0]?.outcomes?.find((o) => o.type === "home")?.price ||
              0,
            away:
              event.markets;
                ?.find((m) => m.type === "moneyline")
                ?.books?.[0]?.outcomes?.find((o) => o.type === "away")?.price ||
              0,
          },
          spread: {
            line:
              event.markets?.find((m) => m.type === "spread")?.books?.[0]
                ?.outcomes?.[0]?.spread || 0,
            home:
              event.markets;
                ?.find((m) => m.type === "spread")
                ?.books?.[0]?.outcomes?.find((o) => o.type === "home")?.price ||
              0,
            away:
              event.markets;
                ?.find((m) => m.type === "spread")
                ?.books?.[0]?.outcomes?.find((o) => o.type === "away")?.price ||
              0,
          },
          total: {
            line:
              event.markets?.find((m) => m.type === "total")?.books?.[0]
                ?.outcomes?.[0]?.total || 0,
            over:
              event.markets;
                ?.find((m) => m.type === "total")
                ?.books?.[0]?.outcomes?.find((o) => o.type === "over")?.price ||
              0,
            under:
              event.markets;
                ?.find((m) => m.type === "total")
                ?.books?.[0]?.outcomes?.find((o) => o.type === "under")
                ?.price || 0,
          },
        },
        timestamp: new Date().toISOString(),
      })) || [];

    res.json(odds);
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch odds comparison",
      message: error.message,
    });
  }
});

// Player Props;
app.get(
  "/api/sportsradar/odds/:sport/events/:eventId/player-props",
  async (req, res) => {
    try {
      const { sport, eventId } = req.params;

      const playerProps =
        data.markets;
          ?.filter((market) => market.type === "player_prop")
          ?.map((market) => ({
            playerId: market.player?.id || "",
            playerName: market.player?.name || "Unknown",
            propType: market.specifier || "",
            line: market.handicap || 0,
            overOdds:
              market.books?.[0]?.outcomes?.find((o) => o.type === "over")
                ?.price || 0,
            underOdds:
              market.books?.[0]?.outcomes?.find((o) => o.type === "under")
                ?.price || 0,
          })) || [];

      res.json(playerProps);
    } catch (error) {
      res.status(500).json({
        error: "Failed to fetch player props",
        message: error.message,
      });
    }
  },
);

// SportsRadar Cache Stats;
app.get("/api/sportsradar/cache/stats", (req, res) => {
  res.json({
    size: sportsRadarCache.size,
    totalRequests: sportsRadarCache.size,
  });
});

// Clear SportsRadar Cache;
app.delete("/api/sportsradar/cache", (req, res) => {
  sportsRadarCache.clear();
  res.json({ message: "Cache cleared successfully" });
});

// SportsRadar Odds Comparison API;
app.get("/api/sportsradar/odds-comparison/:sport", async (req, res) => {
  try {
    const { sport } = req.params;


    res.json({
      sport,
      events: data.events || [],
      quota_used: sportsRadarQuotaUsed,
      quota_remaining: SPORTSRADAR_QUOTA_LIMIT - sportsRadarQuotaUsed,
      source: "SportsRadar Odds Comparison API",
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch SportsRadar odds comparison",
      message: error.message,
      quota_used: sportsRadarQuotaUsed,
    });
  }
});

// SportsRadar Player Props API;
app.get("/api/sportsradar/player-props/:sport", async (req, res) => {
  try {
    const { sport } = req.params;


    res.json({
      sport,
      player_props: data.markets || [],
      quota_used: sportsRadarQuotaUsed,
      quota_remaining: SPORTSRADAR_QUOTA_LIMIT - sportsRadarQuotaUsed,
      source: "SportsRadar Player Props API",
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch SportsRadar player props",
      message: error.message,
      quota_used: sportsRadarQuotaUsed,
    });
  }
});

// SportsRadar NBA API;
app.get("/api/sportsradar/nba/:endpoint", async (req, res) => {
  try {
    const { endpoint } = req.params;


    res.json({
      ...data,
      quota_used: sportsRadarQuotaUsed,
      quota_remaining: SPORTSRADAR_QUOTA_LIMIT - sportsRadarQuotaUsed,
      source: "SportsRadar NBA API",
    });
  } catch (error) {
    res.status(500).json({
      error: `Failed to fetch SportsRadar NBA ${endpoint}`,
      message: error.message,
      quota_used: sportsRadarQuotaUsed,
    });
  }
});

// SportsRadar NFL API;
app.get("/api/sportsradar/nfl/:endpoint", async (req, res) => {
  try {
    const { endpoint } = req.params;


    res.json({
      ...data,
      quota_used: sportsRadarQuotaUsed,
      quota_remaining: SPORTSRADAR_QUOTA_LIMIT - sportsRadarQuotaUsed,
      source: "SportsRadar NFL API",
    });
  } catch (error) {
    res.status(500).json({
      error: `Failed to fetch SportsRadar NFL ${endpoint}`,
      message: error.message,
      quota_used: sportsRadarQuotaUsed,
    });
  }
});

// SportsRadar Quota Status;
app.get("/api/sportsradar/quota", (req, res) => {
  res.json({
    quota_used: sportsRadarQuotaUsed,
    quota_limit: SPORTSRADAR_QUOTA_LIMIT,
    quota_remaining: SPORTSRADAR_QUOTA_LIMIT - sportsRadarQuotaUsed,
    quota_percentage: (sportsRadarQuotaUsed / SPORTSRADAR_QUOTA_LIMIT) * 100,
    cache_size: sportsRadarCache.size,
    recommendations:
      sportsRadarQuotaUsed > 800;
        ? [
            "⚠ Quota getting low - increase cache TTL",
            "💡 Consider using autonomous data sources",
          ]
        : ["✓ Quota usage is healthy"],
  });
});

// =======================
// DAILY FANTASY API ENDPOINTS;
// =======================

const DAILYFANTASY_API_KEY =
  process.env.VITE_DAILYFANTASY_API_KEY || "your_dailyfantasy_api_key_here";
const DAILYFANTASY_BASE_URL =
  process.env.VITE_DAILYFANTASY_API_ENDPOINT || "https://api.draftkings.com";

const lastDailyFantasyRequest = 0;

async function makeDailyFantasyRequest(endpoint, params = {}) {

  // Check cache first;

  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }

  // Rate limiting;


  if (timeSinceLastRequest < RATE_LIMIT_MS) {
    await new Promise((resolve) =>
      setTimeout(resolve, RATE_LIMIT_MS - timeSinceLastRequest),
    );
  }

  const queryParams = new URLSearchParams({
    ...params,
  });

  try {
    lastDailyFantasyRequest = Date.now();
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${DAILYFANTASY_API_KEY}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(
        `DailyFantasy API error: ${response.status} ${response.statusText}`,
      );
    }

    // Cache the response;
    dailyFantasyCache.set(cacheKey, {
      data,
      timestamp: Date.now(),
    });

    return data;
  } catch (error) {
    // console statement removed
    throw error;
  }
}

// DailyFantasy Contests;
app.get("/api/dailyfantasy/contests/:sport", async (req, res) => {
  try {
    const { sport } = req.params;


    const contests =
      data.contests?.map((contest) => ({
        id: contest.id,
        name: contest.name,
        sport: contest.sport,
        entryFee: contest.entry_fee,
        totalPrizes: contest.total_prizes,
        maxEntries: contest.max_entries,
        startTime: contest.start_time,
        salaryCap: contest.salary_cap,
      })) || [];

    res.json(contests);
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch contests",
      message: error.message,
    });
  }
});

// DailyFantasy Players;
app.get("/api/dailyfantasy/contests/:contestId/players", async (req, res) => {
  try {
    const { contestId } = req.params;

    const players =
      data.draftables?.map((player) => ({
        id: player.id,
        name: player.display_name,
        position: player.position,
        team: player.team_abbreviation,
        salary: player.salary,
        projectedPoints: player.projected_points,
        averagePoints: player.average_points,
        isInjured: player.is_injured,
      })) || [];

    res.json(players);
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch players",
      message: error.message,
    });
  }
});

// DailyFantasy Player Projections;
app.get("/api/dailyfantasy/players/:playerId/projections", async (req, res) => {
  try {
    const { playerId } = req.params;

    res.json({
      playerId: data.player_id,
      projectedPoints: data.projected_points,
      projectedStats: data.projected_stats,
      confidence: data.confidence || 0.85,
      lastUpdated: data.last_updated,
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch player projections",
      message: error.message,
    });
  }
});

// DailyFantasy Optimal Lineups;
app.post("/api/dailyfantasy/lineups/optimize", async (req, res) => {
  try {
    const { contestId, strategy = "balanced", budget } = req.body;

    const requestBody = {
      contest_id: contestId,
      strategy,
      budget,
      constraints: req.body.constraints || {},
    };

    const response = await fetch(`${DAILYFANTASY_BASE_URL}${endpoint}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${DAILYFANTASY_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error(
        `DailyFantasy API error: ${response.status} ${response.statusText}`,
      );
    }

    res.json({
      lineup: data.lineup,
      projectedPoints: data.projected_points,
      totalSalary: data.total_salary,
      confidence: data.confidence,
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to generate optimal lineup",
      message: error.message,
    });
  }
});

// =======================
// THE ODDS API ENDPOINTS;
// =======================

const THEODDS_API_KEY =
  process.env.VITE_THEODDS_API_KEY || "your_odds_api_key_here";
const THEODDS_BASE_URL =
  process.env.VITE_THEODDS_API_ENDPOINT || "https://api.the-odds-api.com";

const lastTheOddsRequest = 0;

async function makeTheOddsRequest(endpoint, params = {}) {

  // Check cache first;

  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }

  // Rate limiting;


  if (timeSinceLastRequest < RATE_LIMIT_MS) {
    await new Promise((resolve) =>
      setTimeout(resolve, RATE_LIMIT_MS - timeSinceLastRequest),
    );
  }

  const queryParams = new URLSearchParams({
    apiKey: THEODDS_API_KEY,
    ...params,
  });

  try {
    lastTheOddsRequest = Date.now();

    if (!response.ok) {
      throw new Error(
        `TheOdds API error: ${response.status} ${response.statusText}`,
      );
    }

    // Cache the response;
    theoddsCache.set(cacheKey, {
      data,
      timestamp: Date.now(),
    });

    return data;
  } catch (error) {
    // console statement removed
    throw error;
  }
}

// TheOdds Sports;
app.get("/api/theodds/sports", async (req, res) => {
  try {


    res.json(data);
  } catch (error) {
    // console statement removed

    // Return structured error response for API unavailability;
    res.status(503).json({
      error: "TheOdds API temporarily unavailable",
      message:
        "Unable to fetch sports data. This may be due to API key restrictions or rate limiting.",
      suggestion:
        "The service will retry automatically. Sports data is temporarily unavailable.",
      sports: [], // Return empty array for frontend compatibility;
      timestamp: new Date().toISOString(),
    });
  }
});

// TheOdds Odds;
app.get("/api/theodds/odds/:sport", async (req, res) => {
  try {
    const { sport } = req.params;
    const {
      regions = "us",
      markets = "h2h",
      oddsFormat = "decimal",
    } = req.query;

    const params = {
      regions,
      markets,
      oddsFormat,
    };

    res.json(data);
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch odds",
      message: error.message,
    });
  }
});

// TheOdds Event Odds;
app.get("/api/theodds/odds/:sport/events/:eventId", async (req, res) => {
  try {
    const { sport, eventId } = req.params;
    const {
      regions = "us",
      markets = "h2h,spreads,totals",
      oddsFormat = "decimal",
    } = req.query;

    const params = {
      regions,
      markets,
      oddsFormat,
    };

    res.json(data);
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch event odds",
      message: error.message,
    });
  }
});

// TheOdds Odds;
app.get("/api/theodds/odds/:sport", async (req, res) => {
  try {
    const { sport } = req.params;
    const {
      regions = "us",
      markets = "h2h",
      oddsFormat = "decimal",
    } = req.query;

    const params = {
      regions,
      markets,
      oddsFormat,
    };

    res.json(data);
  } catch (error) {
    // console statement removed

    // Return structured error response;
    res.status(503).json({
      error: "TheOdds API temporarily unavailable",
      message:
        "Unable to fetch odds data. This may be due to API key restrictions or rate limiting.",
      suggestion:
        "The service will retry automatically. Odds data is temporarily unavailable.",
      odds: [], // Return empty array for frontend compatibility;
      timestamp: new Date().toISOString(),
    });
  }
});

// API Health Check - Combined;
app.get("/api/health/all", async (req, res) => {
  const health = {
    timestamp: new Date().toISOString(),
    services: {
      sportsradar: { status: "unknown", apis: [] },
      dailyfantasy: { status: "unknown" },
      theodds: { status: "unknown" },
    },
  };

  // Test SportsRadar;
  try {
    const sportsRadarHealth = await makeSportsRadarRequest(
      "/nba/trial/v8/en/league/hierarchy.json",
    );
    health.services.sportsradar.status = "healthy";
    health.services.sportsradar.apis.push("NBA");
  } catch (e) {
    health.services.sportsradar.status = "degraded";
  }

  // Test DailyFantasy;
  try {
    await makeDailyFantasyRequest("/contests/v1/contests", { limit: 1 });
    health.services.dailyfantasy.status = "healthy";
  } catch (e) {
    health.services.dailyfantasy.status = "degraded";
  }

  // Test TheOdds;
  try {
    await makeTheOddsRequest("/v4/sports", { limit: 1 });
    health.services.theodds.status = "healthy";
  } catch (e) {
    health.services.theodds.status = "degraded";
  }

  res.json(health);
});

// Cache Management for all APIs;
app.delete("/api/cache/clear", (req, res) => {
  sportsRadarCache.clear();
  dailyFantasyCache.clear();
  theoddsCache.clear();
  res.json({ message: "All caches cleared successfully" });
});

app.get("/api/cache/stats", (req, res) => {
  res.json({
    sportsradar: { size: sportsRadarCache.size },
    dailyfantasy: { size: dailyFantasyCache.size },
    theodds: { size: theoddsCache.size },
    total: sportsRadarCache.size + dailyFantasyCache.size + theoddsCache.size,
  });
});

// ============================================================================
// Missing v4 API endpoints to fix 404 errors;
// ============================================================================

// System Resources endpoint;
app.get("/api/v4/monitoring/resources", (req, res) => {
  res.json({
    cpu_usage: 45 + Math.random() * 30, // 45-75%
    memory_usage: 60 + Math.random() * 25, // 60-85%
    disk_usage: 30 + Math.random() * 20, // 30-50%
    network_latency: 5 + Math.random() * 15, // 5-20ms;
    timestamp: new Date().toISOString(),
  });
});

// Data Drift Report endpoint;
app.get("/api/v4/data/drift", (req, res) => {
  res.json({
    drift_score: 0.05 + Math.random() * 0.15, // 0.05-0.20;
    status: "stable",
    features_with_drift: [
      { name: "player_efficiency", drift: 0.08 },
      { name: "team_momentum", drift: 0.03 },
    ],
    timestamp: new Date().toISOString(),
  });
});

// Data Quality Report endpoint;
app.get("/api/v4/data/quality", (req, res) => {
  res.json({
    quality_score: 0.85 + Math.random() * 0.12, // 0.85-0.97;
    completeness: 0.95 + Math.random() * 0.04, // 0.95-0.99;
    accuracy: 0.88 + Math.random() * 0.1, // 0.88-0.98;
    consistency: 0.92 + Math.random() * 0.06, // 0.92-0.98;
    timeliness: 0.9 + Math.random() * 0.08, // 0.90-0.98;
    timestamp: new Date().toISOString(),
  });
});

// Ensemble Diversity Metrics endpoint;
app.get("/api/v4/ensemble/diversity", (req, res) => {
  res.json({
    diversity_score: 0.75 + Math.random() * 0.2, // 0.75-0.95;
    models: [
      { name: "XGBoost-V3", contribution: 0.25 },
      { name: "Neural-Net-Pro", contribution: 0.3 },
      { name: "Random-Forest-Elite", contribution: 0.2 },
      { name: "Gradient-Boost-Quantum", contribution: 0.25 },
    ],
    correlation_matrix: [
      [1.0, 0.3, 0.2, 0.4],
      [0.3, 1.0, 0.5, 0.2],
      [0.2, 0.5, 1.0, 0.3],
      [0.4, 0.2, 0.3, 1.0],
    ],
    timestamp: new Date().toISOString(),
  });
});

// Ensemble Candidates endpoint;
app.get("/api/v4/ensemble/candidates", (req, res) => {
  res.json({
    candidate_models: [
      {
        name: "LSTM-Advanced",
        accuracy: 0.92 + Math.random() * 0.05,
        diversity_contribution: 0.15,
        training_status: "ready",
      },
      {
        name: "Transformer-Sports",
        accuracy: 0.89 + Math.random() * 0.08,
        diversity_contribution: 0.22,
        training_status: "training",
      },
      {
        name: "CNN-Pattern-V2",
        accuracy: 0.87 + Math.random() * 0.09,
        diversity_contribution: 0.18,
        training_status: "ready",
      },
    ],
    recommendation: "Add LSTM-Advanced to ensemble",
    timestamp: new Date().toISOString(),
  });
});

// Accuracy Alerts endpoint;
app.get("/api/v4/monitoring/accuracy-alerts", (req, res) => {

  // Randomly add some alerts;
  if (Math.random() > 0.7) {
    alerts.push({
      id: "alert_1",
      severity: "warning",
      message: "Model accuracy dropped below 85% threshold",
      model: "XGBoost-V3",
      current_accuracy: 0.83,
      threshold: 0.85,
      timestamp: new Date().toISOString(),
    });
  }

  if (Math.random() > 0.8) {
    alerts.push({
      id: "alert_2",
      severity: "info",
      message: "New training data available",
      details: "1,247 new samples ready for model retraining",
      timestamp: new Date().toISOString(),
    });
  }

  res.json(alerts);
});

// PrizePicks endpoints;
app.get("/api/prizepicks/props", (req, res) => {
  const { sport, minConfidence = 0.6 } = req.query;

  const mockProps = [
    {
      id: "prop_1",
      playerId: "player_123",
      playerName: "LeBron James",
      sport: "basketball",
      statType: "points",
      line: 28.5,
      overOdds: 1.83,
      underOdds: 1.95,
      prediction: "over",
      confidence: 0.78,
      expectedValue: 0.12,
      game: "Lakers vs Warriors",
      gameTime: "2024-01-16T21:00:00Z",
    },
    {
      id: "prop_2",
      playerId: "player_456",
      playerName: "Stephen Curry",
      sport: "basketball",
      statType: "assists",
      line: 6.5,
      overOdds: 1.91,
      underOdds: 1.87,
      prediction: "under",
      confidence: 0.72,
      expectedValue: 0.08,
      game: "Lakers vs Warriors",
      gameTime: "2024-01-16T21:00:00Z",
    },
    {
      id: "prop_3",
      playerId: "player_789",
      playerName: "Travis Kelce",
      sport: "football",
      statType: "receiving_yards",
      line: 65.5,
      overOdds: 1.88,
      underOdds: 1.9,
      prediction: "over",
      confidence: 0.85,
      expectedValue: 0.15,
      game: "Chiefs vs Bills",
      gameTime: "2024-01-17T20:00:00Z",
    },
  ];

  const filteredProps = mockProps.filter(
    (prop) => prop.confidence >= parseFloat(minConfidence),
  );

  if (sport) {
    filteredProps = filteredProps.filter((prop) => prop.sport === sport);
  }

  res.json(filteredProps);
});

app.get("/api/prizepicks/recommendations", (req, res) => {
  const { sport, strategy = "value", minConfidence = 0.7 } = req.query;

  const mockRecommendations = [
    {
      id: "rec_1",
      propId: "prop_1",
      playerName: "LeBron James",
      recommendation: "STRONG_BUY",
      confidence: 0.85,
      expectedValue: 0.15,
      reasoning: "Strong historical performance in similar matchups",
      sport: "basketball",
      strategy: "value",
    },
    {
      id: "rec_2",
      propId: "prop_3",
      playerName: "Travis Kelce",
      recommendation: "BUY",
      confidence: 0.78,
      expectedValue: 0.12,
      reasoning: "Favorable weather conditions and opponent weakness",
      sport: "football",
      strategy: "value",
    },
  ];

  const filteredRecs = mockRecommendations.filter(
    (rec) => rec.confidence >= parseFloat(minConfidence),
  );

  if (sport) {
    filteredRecs = filteredRecs.filter((rec) => rec.sport === sport);
  }

  if (strategy && strategy !== "value") {
    filteredRecs = filteredRecs.filter((rec) => rec.strategy === strategy);
  }

  res.json(filteredRecs);
});

// Portfolio endpoints;
app.get("/api/portfolio/:userId/analysis", (req, res) => {
  const { userId } = req.params;

  const mockPortfolioAnalysis = {
    userId: userId,
    totalValue: 5240.75,
    totalProfit: 1240.75,
    winRate: 0.67,
    sharpeRatio: 1.84,
    maxDrawdown: -0.12,
    roi: 0.31,
    positions: [
      {
        id: "pos_1",
        betId: "bet_123",
        sport: "basketball",
        description: "Lakers ML vs Warriors",
        stake: 100.0,
        odds: 1.85,
        potentialReturn: 185.0,
        status: "active",
        placedAt: "2024-01-16T14:20:00Z",
        profit: 0,
      },
      {
        id: "pos_2",
        betId: "bet_124",
        sport: "football",
        description: "Chiefs -3.5 vs Bills",
        stake: 150.0,
        odds: 1.91,
        potentialReturn: 286.5,
        status: "won",
        placedAt: "2024-01-15T19:30:00Z",
        profit: 136.5,
      },
      {
        id: "pos_3",
        betId: "bet_125",
        sport: "basketball",
        description: "LeBron James Over 28.5 Points",
        stake: 75.0,
        odds: 1.83,
        potentialReturn: 137.25,
        status: "lost",
        placedAt: "2024-01-14T20:15:00Z",
        profit: -75.0,
      },
    ],
    analytics: {
      profitByMonth: [
        { month: "Dec", profit: 450.25 },
        { month: "Jan", profit: 790.5 },
      ],
      winRateByMonth: [
        { month: "Dec", winRate: 0.62 },
        { month: "Jan", winRate: 0.72 },
      ],
      sportPerformance: [
        { sport: "basketball", profit: 620.3, winRate: 0.65 },
        { sport: "football", profit: 620.45, winRate: 0.7 },
      ],
    },
    riskMetrics: {
      volatility: 0.18,
      beta: 1.12,
      diversificationRatio: 0.76,
    },
  };

  res.json(mockPortfolioAnalysis);
});

// PropOllama chat endpoint;
app.post("/api/propollama/chat", (req, res) => {
  const { message, context } = req.body;

  // Mock AI chat response for PropOllama;
  const mockResponses = [
    "Based on historical data, LeBron James averages 28.2 points in games against Western Conference teams. The over looks favorable tonight.",
    "Weather conditions are clear with no wind, which typically benefits passing games. Travis Kelce's receiving yards prop has good value.",
    "The Lakers are 8-2 ATS in their last 10 games as favorites. Consider the spread bet for tonight's game.",
    "Injury reports show the opposing team's best defender is questionable. This could impact the defensive matchup significantly.",
    "Recent trends show this player performs 15% better in primetime games. Tonight's national TV game could be a factor.",
  ];

  const randomResponse =
    mockResponses[Math.floor(Math.random() * mockResponses.length)];

  res.json({
    response: randomResponse,
    confidence: 0.75 + Math.random() * 0.2, // Random confidence between 0.75-0.95;
    context: {
      messageId: `msg_${Date.now()}`,
      timestamp: new Date().toISOString(),
      tokensUsed: Math.floor(Math.random() * 50) + 20, // Random tokens 20-70;
    },
    suggestions: [
      "Tell me more about this player's recent performance",
      "What are the key factors in this matchup?",
      "Show me similar historical games",
      "What's the risk level for this bet?",
    ],
  });
});

// Error handling middleware;
app.use((err, req, res, next) => {
  // console statement removed
  res.status(500).json({
    error: "Internal Server Error",
    message: err.message,
    timestamp: new Date().toISOString(),
  });
});

// 404 handler;
app.use((req, res) => {
  res.status(404).json({
    error: "Not Found",
    message: `Route ${req.method} ${req.path} not found`,
    timestamp: new Date().toISOString(),
  });
});

// Create HTTP server;

// WebSocket server for real-time updates;

wss.on("connection", (ws) => {
  // console statement removed

  // Send initial data;
  ws.send(
    JSON.stringify({
      type: "connection",
      data: { status: "connected", timestamp: new Date().toISOString() },
    }),
  );

  // Send periodic updates;
  const interval = setInterval(() => {
    if (ws.readyState === ws.OPEN) {
      ws.send(
        JSON.stringify({
          type: "odds_update",
          data: {
            event: "Lakers vs Warriors",
            odds: 1.85 + (Math.random() - 0.5) * 0.1,
            timestamp: new Date().toISOString(),
          },
        }),
      );
    }
  }, 10000);

  ws.on("close", () => {
    // console statement removed
    clearInterval(interval);
  });

  ws.on("error", (error) => {
    // console statement removed
    clearInterval(interval);
  });
});

// Start server;
server.listen(PORT, () => {
  // console statement removed
  // console statement removed
  // console statement removed
  // console statement removed
});

export default app;
