import React, { useState, useEffect, useMemo, useCallback  } from 'react.ts';
import { motion, AnimatePresence, PanInfo } from 'framer-motion.ts';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  IconButton,
  Fab,
  BottomNavigation,
  BottomNavigationAction,
  SwipeableDrawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Avatar,
  Badge,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Paper,
  Stack,
  Grid,
  useTheme,
  useMediaQuery,
  Slide,
  Collapse,
  Alert,
  Snackbar,
  LinearProgress,
  CircularProgress,
  Dialog,
  DialogContent,
  AppBar,
  Toolbar,
  Tabs,
  Tab,
  Divider,
  Skeleton,
} from '@mui/material.ts';
import {
  Home,
  Analytics,
  TrendingUp,
  AccountBalance,
  Settings,
  Notifications,
  Search,
  Add,
  Remove,
  SwapVert,
  FilterList,
  Sort,
  Share,
  Bookmark,
  Star,
  Menu,
  Close,
  ChevronLeft,
  ChevronRight,
  ExpandLess,
  ExpandMore,
  PlayArrow,
  Pause,
  Refresh,
  Download,
  Upload,
  Edit,
  Delete,
  Visibility,
  VisibilityOff,
  Lock,
  LockOpen,
  MonetizationOn,
  Assessment,
  Timeline,
  ShowChart,
  BarChart,
  PieChart,
  Speed,
  Psychology,
  AutoAwesome,
  Group,
  Person,
  Security,
  Help,
  Feedback,
  ExitToApp,
} from '@mui/icons-material.ts';
import {
  formatCurrency,
  formatPercentage,
  formatDateTime,
} from '@/utils/formatters.ts';

interface MobileCard {
  id: string;
  type: "metric" | "chart" | "action" | "news" | "opportunity";
  title: string;
  subtitle?: string;
  value?: number | string;
  change?: number;
  trend?: "up" | "down" | "neutral";
  action?: () => void;
  priority: "high" | "medium" | "low";
  category: string;
  data?: any;
  timestamp?: Date;
}

interface SwipeableCardStackProps {
  cards: MobileCard[];
  onCardSwipe: (cardId: string, direction: "left" | "right") => void;
  onCardTap: (card: MobileCard) => void;
}

interface QuickAction {
  id: string;
  label: string;
  icon: React.ReactNode;
  color: "primary" | "secondary" | "success" | "warning" | "error";
  action: () => void;
  badge?: number;
}

const SwipeableCardStack: React.FC<SwipeableCardStackProps key={825845}> = ({
  cards,
  onCardSwipe,
  onCardTap,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);

  const handleDragEnd = useCallback(
    (info: PanInfo) => {



      if (Math.abs(offset) > threshold || Math.abs(velocity) > 500) {


        if (currentCard) {
          onCardSwipe(currentCard.id, direction);
        }

        setCurrentIndex((prev) => Math.min(prev + 1, cards.length - 1));
      }

      setDragOffset(0);
    },
    [cards, currentIndex, onCardSwipe],
  );

  if (cards.length === 0) {
    return (
      <Box;
        display="flex"
        justifyContent="center"
        alignItems="center"
        height={200}
       key={677711}>
        <Typography variant="body2" color="textSecondary" key={565471}>
          No cards to display;
        </Typography>
      </Box>
    );
  }

  return (
    <Box;
      sx={{
        position: "relative",
        height: 280,
        width: "100%",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
     key={460709}>
      <AnimatePresence key={359944}>
        {cards.slice(currentIndex, currentIndex + 3).map((card, index) => (
          <motion.div;
            key={`${card.id}-${currentIndex + index}`}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={(_, info) = key={177391}> index === 0 && handleDragEnd(info)}
            onTap={() => onCardTap(card)}
            initial={{
              scale: 1 - index * 0.05,
              y: index * 10,
              zIndex: 10 - index,
              opacity: 1,
            }}
            animate={{
              scale: 1 - index * 0.05,
              y: index * 10,
              zIndex: 10 - index,
              opacity: 1 - index * 0.3,
              x: index === 0 ? dragOffset : 0,
            }}
            exit={{
              x: dragOffset > 0 ? 300 : -300,
              opacity: 0,
              transition: { duration: 0.3 },
            }}
            style={{
              position: "absolute",
              width: "90%",
              cursor: "pointer",
            }}
          >
            <Card;
              sx={{
                height: 240,
                background:
                  index === 0;
                    ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                    : "rgba(255,255,255,0.95)",
                color: index === 0 ? "white" : "inherit",
                backdropFilter: "blur(10px)",
                border:
                  index === 0 ? "none" : "1px solid rgba(255,255,255,0.2)",
              }}
             key={882721}>
              <CardContent;
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
               key={940767}>
                <Box key={485947}>
                  <Box;
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    mb={1}
                   key={367168}>
                    <Chip;
                      label={card.category}
                      size="small"
                      sx={{
                        backgroundColor:
                          index === 0;
                            ? "rgba(255,255,255,0.2)"
                            : "primary.main",
                        color: index === 0 ? "white" : "white",
                      }}
                    / key={92420}>
                    <Chip;
                      label={card.priority}
                      size="small"
                      color={
                        card.priority === "high"
                          ? "error"
                          : card.priority === "medium"
                            ? "warning"
                            : "success"
                      }
                    / key={423283}>
                  </Box>

                  <Typography;
                    variant="h6"
                    gutterBottom;
                    sx={{ fontWeight: "bold" }}
                   key={418202}>
                    {card.title}
                  </Typography>

                  {card.subtitle && (
                    <Typography;
                      variant="body2"
                      sx={{ opacity: 0.8 }}
                      gutterBottom;
                     key={755455}>
                      {card.subtitle}
                    </Typography>
                  )}
                </Box>

                <Box key={485947}>
                  {card.type === "metric" && card.value && (
                    <Box key={485947}>
                      <Typography;
                        variant="h3"
                        sx={{ fontWeight: "bold", mb: 1 }}
                       key={585007}>
                        {typeof card.value === "number"
                          ? formatCurrency(card.value)
                          : card.value}
                      </Typography>
                      {card.change && (
                        <Box display="flex" alignItems="center" gap={1} key={161969}>
                          {card.trend === "up" ? (
                            <TrendingUp / key={53470}>
                          ) : (
                            <TrendingUp;
                              style={{ transform: "rotate(180deg)" }}
                            / key={877453}>
                          )}
                          <Typography variant="body2" key={679167}>
                            {formatPercentage(Math.abs(card.change))}
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  )}

                  {card.type === "opportunity" && (
                    <Box key={485947}>
                      <Typography;
                        variant="h4"
                        color="success.main"
                        fontWeight="bold"
                       key={276945}>
                        {formatCurrency(card.data?.profit || 0)}
                      </Typography>
                      <Typography variant="body2" key={679167}>
                        Guaranteed Profit •{" "}
                        {formatPercentage(card.data?.margin || 0)} margin;
                      </Typography>
                    </Box>
                  )}

                  {card.timestamp && (
                    <Typography;
                      variant="caption"
                      sx={{ opacity: 0.6, mt: 1, display: "block" }}
                     key={469057}>
                      {formatDateTime(card.timestamp)}
                    </Typography>
                  )}
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Progress Indicator */}
      <Box;
        sx={{
          position: "absolute",
          bottom: 10,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: 1,
        }}
       key={283722}>
        {cards.map((_, index) => (
          <Box;
            key={index}
            sx={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              backgroundColor:
                index === currentIndex ? "white" : "rgba(255,255,255,0.3)",
              transition: "all 0.3s ease",
            }}
          / key={743898}>
        ))}
      </Box>
    </Box>
  );
};

export const MobileOptimizedInterface: React.FC = () => {


  // State Management;
  const [activeTab, setActiveTab] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [quickActionsOpen, setQuickActionsOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<MobileCard | null key={21463}>(null);
  const [notifications, setNotifications] = useState<any[] key={594112}>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  // Mock Data;
  const mobileCards: MobileCard[] = [
    {
      id: "profit-today",
      type: "metric",
      title: "Today's Profit",
      value: 234.5,
      change: 0.15,
      trend: "up",
      priority: "high",
      category: "Performance",
      timestamp: new Date(),
    },
    {
      id: "arbitrage-opp",
      type: "opportunity",
      title: "Lakers vs Warriors",
      subtitle: "Arbitrage Opportunity",
      priority: "high",
      category: "Arbitrage",
      data: { profit: 43.2, margin: 0.043 },
      timestamp: new Date(Date.now() - 300000),
    },
    {
      id: "win-rate",
      type: "metric",
      title: "Win Rate (7 days)",
      value: "64.2%",
      change: 0.08,
      trend: "up",
      priority: "medium",
      category: "Analytics",
      timestamp: new Date(Date.now() - 600000),
    },
    {
      id: "ml-prediction",
      type: "action",
      title: "New ML Prediction",
      subtitle: "Chiefs vs Bills - 89% confidence",
      priority: "medium",
      category: "ML",
      action: () => // console statement removed,
      timestamp: new Date(Date.now() - 900000),
    },
  ];

  const quickActions: QuickAction[] = [
    {
      id: "place-bet",
      label: "Place Bet",
      icon: <MonetizationOn / key={90951}>,
      color: "primary",
      action: () => handleQuickAction("place-bet"),
    },
    {
      id: "check-arbitrage",
      label: "Arbitrage",
      icon: <SwapVert / key={6623}>,
      color: "success",
      action: () => handleQuickAction("check-arbitrage"),
      badge: 3,
    },
    {
      id: "ml-insights",
      label: "ML Insights",
      icon: <Psychology / key={12337}>,
      color: "secondary",
      action: () => handleQuickAction("ml-insights"),
    },
    {
      id: "portfolio",
      label: "Portfolio",
      icon: <AccountBalance / key={432276}>,
      color: "warning",
      action: () => handleQuickAction("portfolio"),
    },
  ];

  // Event Handlers;
  const handleCardSwipe = useCallback(
    (cardId: string, direction: "left" | "right") => {

      setSnackbarMessage(`Card ${action}`);
      setSnackbarOpen(true);
    },
    [],
  );

  const handleCardTap = useCallback((card: MobileCard) => {
    setSelectedCard(card);
    if (card.action) {
      card.action();
    }
  }, []);

  const handleQuickAction = useCallback((actionId: string) => {
    setIsLoading(true);
    setSnackbarMessage(`Executing ${actionId}...`);
    setSnackbarOpen(true);

    setTimeout(() => {
      setIsLoading(false);
      setQuickActionsOpen(false);
    }, 2000);
  }, []);

  const handleTabChange = useCallback(
    (_: React.SyntheticEvent, newValue: number) => {
      setActiveTab(newValue);
    },
    [],
  );

  // Load notifications;
  useEffect(() => {
    const mockNotifications = [
      {
        id: "notif-1",
        title: "New Arbitrage Opportunity",
        message: "Lakers vs Warriors - 4.3% profit margin",
        type: "opportunity",
        timestamp: new Date(Date.now() - 300000),
      },
      {
        id: "notif-2",
        title: "ML Model Updated",
        message: "Ensemble model accuracy improved to 74.2%",
        type: "update",
        timestamp: new Date(Date.now() - 900000),
      },
    ];
    setNotifications(mockNotifications);
  }, []);

  if (!isMobile) {
    return (
      <Box;
        display="flex"
        justifyContent="center"
        alignItems="center"
        height={400}
       key={219816}>
        <Alert severity="info" key={150543}>
          This interface is optimized for mobile devices. Please resize your;
          browser or use a mobile device.
        </Alert>
      </Box>
    );
  }

  return (
    <Box;
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "background.default",
        overflow: "hidden",
      }}
     key={875060}>
      {/* Header */}
      <AppBar;
        position="static"
        elevation={0}
        sx={{ backgroundColor: "background.paper" }}
       key={79877}>
        <Toolbar key={629347}>
          <IconButton;
            edge="start"
            color="inherit"
            onClick={() = key={329416}> setDrawerOpen(true)}
            sx={{ mr: 2 }}
          >
            <Menu / key={662131}>
          </IconButton>

          <Typography variant="h6" sx={{ flexGrow: 1, color: "text.primary" }} key={289394}>
            A1Betting Mobile;
          </Typography>

          <IconButton color="inherit" sx={{ color: "text.primary" }} key={688048}>
            <Badge badgeContent={notifications.length} color="error" key={324599}>
              <Notifications / key={183601}>
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box sx={{ flex: 1, overflow: "hidden" }} key={640040}>
        <AnimatePresence mode="wait" key={725119}>
          {activeTab === 0 && (
            <motion.div;
              key="home"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              style={{ height: "100%", overflow: "auto", padding: "16px" }}
             key={906262}>
              {/* Quick Stats */}
              <Grid container spacing={2} sx={{ mb: 3 }} key={482082}>
                <Grid item xs={6} key={823052}>
                  <Card sx={{ textAlign: "center", p: 2 }} key={764292}>
                    <Typography;
                      variant="h4"
                      color="success.main"
                      fontWeight="bold"
                     key={106736}>
                      {formatCurrency(1247.5)}
                    </Typography>
                    <Typography variant="caption" color="textSecondary" key={15591}>
                      Total Profit;
                    </Typography>
                  </Card>
                </Grid>
                <Grid item xs={6} key={823052}>
                  <Card sx={{ textAlign: "center", p: 2 }} key={764292}>
                    <Typography;
                      variant="h4"
                      color="primary.main"
                      fontWeight="bold"
                     key={550703}>
                      64.2%
                    </Typography>
                    <Typography variant="caption" color="textSecondary" key={15591}>
                      Win Rate;
                    </Typography>
                  </Card>
                </Grid>
              </Grid>

              {/* Swipeable Cards */}
              <Box sx={{ mb: 3 }} key={864484}>
                <Typography variant="h6" gutterBottom key={90207}>
                  Recent Updates;
                </Typography>
                <SwipeableCardStack;
                  cards={mobileCards}
                  onCardSwipe={handleCardSwipe}
                  onCardTap={handleCardTap}
                / key={954638}>
              </Box>

              {/* Quick Actions Grid */}
              <Typography variant="h6" gutterBottom key={90207}>
                Quick Actions;
              </Typography>
              <Grid container spacing={2} key={272161}>
                {quickActions.map((action) => (
                  <Grid item xs={6} key={action.id} key={654688}>
                    <Card;
                      sx={{
                        p: 2,
                        textAlign: "center",
                        cursor: "pointer",
                        "&:hover": { transform: "scale(1.02)" },
                        transition: "transform 0.2s ease",
                      }}
                      onClick={action.action}
                     key={267263}>
                      <Badge badgeContent={action.badge} color="error" key={291445}>
                        <Box;
                          sx={{
                            width: 56,
                            height: 56,
                            borderRadius: "50%",
                            backgroundColor: `${action.color}.main`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            mx: "auto",
                            mb: 1,
                            color: "white",
                          }}
                         key={454957}>
                          {action.icon}
                        </Box>
                      </Badge>
                      <Typography variant="body2" fontWeight="medium" key={221330}>
                        {action.label}
                      </Typography>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </motion.div>
          )}

          {activeTab === 1 && (
            <motion.div;
              key="analytics"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              style={{ height: "100%", overflow: "auto", padding: "16px" }}
             key={538990}>
              <Typography variant="h5" gutterBottom key={248584}>
                Analytics;
              </Typography>

              {/* Mobile-optimized charts */}
              <Stack spacing={2} key={169333}>
                <Card sx={{ p: 2 }} key={302291}>
                  <Typography variant="h6" gutterBottom key={90207}>
                    Profit Trend (7 Days)
                  </Typography>
                  <Box;
                    sx={{
                      height: 200,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                   key={281410}>
                    <Typography variant="body2" color="textSecondary" key={565471}>
                      📈 Chart visualization would go here;
                    </Typography>
                  </Box>
                </Card>

                <Card sx={{ p: 2 }} key={302291}>
                  <Typography variant="h6" gutterBottom key={90207}>
                    Performance by Sport;
                  </Typography>
                  <Stack spacing={1} key={41946}>
                    {["NBA", "NFL", "MLB", "Tennis"].map((sport) => (
                      <Box;
                        key={sport}
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                       key={843704}>
                        <Typography variant="body2" key={679167}>{sport}</Typography>
                        <Box display="flex" alignItems="center" gap={1} key={161969}>
                          <LinearProgress;
                            variant="determinate"
                            value={Math.random() * 100}
                            sx={{ width: 60 }}
                          / key={563607}>
                          <Typography variant="caption" key={472228}>
                            {formatPercentage(Math.random())}
                          </Typography>
                        </Box>
                      </Box>
                    ))}
                  </Stack>
                </Card>
              </Stack>
            </motion.div>
          )}

          {activeTab === 2 && (
            <motion.div;
              key="portfolio"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              style={{ height: "100%", overflow: "auto", padding: "16px" }}
             key={638696}>
              <Typography variant="h5" gutterBottom key={248584}>
                Portfolio;
              </Typography>

              <Stack spacing={2} key={169333}>
                <Card sx={{ p: 2 }} key={302291}>
                  <Box;
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    mb={2}
                   key={671505}>
                    <Typography variant="h6" key={93421}>Current Positions</Typography>
                    <Chip label="5 Active" color="primary" size="small" / key={668990}>
                  </Box>

                  <Stack spacing={2} key={169333}>
                    {["Lakers ML", "Chiefs -3.5", "Over 2.5 Goals"].map(
                      (position, index) => (
                        <Box;
                          key={position}
                          display="flex"
                          justifyContent="space-between"
                          alignItems="center"
                          sx={{
                            p: 2,
                            border: 1,
                            borderColor: "divider",
                            borderRadius: 1,
                          }}
                         key={63087}>
                          <Box key={485947}>
                            <Typography variant="body2" fontWeight="medium" key={221330}>
                              {position}
                            </Typography>
                            <Typography variant="caption" color="textSecondary" key={15591}>
                              Stake: {formatCurrency(100 + index * 50)}
                            </Typography>
                          </Box>
                          <Box textAlign="right" key={594955}>
                            <Typography;
                              variant="body2"
                              color={
                                Math.random()  key={883339}> 0.5;
                                  ? "success.main"
                                  : "error.main"
                              }
                              fontWeight="bold"
                            >
                              {formatCurrency((Math.random() - 0.5) * 100)}
                            </Typography>
                            <Typography variant="caption" key={472228}>
                              {formatPercentage((Math.random() - 0.5) * 0.2)}
                            </Typography>
                          </Box>
                        </Box>
                      ),
                    )}
                  </Stack>
                </Card>
              </Stack>
            </motion.div>
          )}
        </AnimatePresence>
      </Box>

      {/* Bottom Navigation */}
      <Paper;
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={3}
       key={396162}>
        <BottomNavigation value={activeTab} onChange={handleTabChange} key={566292}>
          <BottomNavigationAction label="Home" icon={<Home / key={325475}>} />
          <BottomNavigationAction label="Analytics" icon={<Analytics / key={591074}>} />
          <BottomNavigationAction label="Portfolio" icon={<AccountBalance / key={397605}>} />
          <BottomNavigationAction label="Settings" icon={<Settings / key={622969}>} />
        </BottomNavigation>
      </Paper>

      {/* Speed Dial for Quick Actions */}
      <SpeedDial;
        ariaLabel="Quick Actions"
        sx={{ position: "fixed", bottom: 80, right: 16 }}
        icon={<SpeedDialIcon / key={774388}>}
        open={quickActionsOpen}
        onClose={() => setQuickActionsOpen(false)}
        onOpen={() => setQuickActionsOpen(true)}
      >
        {quickActions.map((action) => (
          <SpeedDialAction;
            key={action.id}
            icon={action.icon}
            tooltipTitle={action.label}
            onClick={action.action}
          / key={315951}>
        ))}
      </SpeedDial>

      {/* Navigation Drawer */}
      <SwipeableDrawer;
        anchor="left"
        open={drawerOpen}
        onClose={() = key={434011}> setDrawerOpen(false)}
        onOpen={() => setDrawerOpen(true)}
        sx={{
          "& .MuiDrawer-paper": {
            width: "80%",
            maxWidth: 320,
          },
        }}
      >
        <Box sx={{ p: 2 }} key={153054}>
          <Box display="flex" alignItems="center" gap={2} mb={3} key={808419}>
            <Avatar sx={{ width: 56, height: 56 }} key={605379}>U</Avatar>
            <Box key={485947}>
              <Typography variant="h6" key={93421}>John Doe</Typography>
              <Typography variant="body2" color="textSecondary" key={565471}>
                Premium Member;
              </Typography>
            </Box>
          </Box>

          <List key={733302}>
            {[
              {
                icon: <Home / key={47076}>,
                text: "Dashboard",
                action: () => setActiveTab(0),
              },
              {
                icon: <Analytics / key={168398}>,
                text: "Analytics",
                action: () => setActiveTab(1),
              },
              {
                icon: <AccountBalance / key={432276}>,
                text: "Portfolio",
                action: () => setActiveTab(2),
              },
              {
                icon: <Settings / key={834927}>,
                text: "Settings",
                action: () => setActiveTab(3),
              },
              { icon: <Security / key={439035}>, text: "Security" },
              { icon: <Help / key={860836}>, text: "Help & Support" },
              { icon: <Feedback / key={142617}>, text: "Feedback" },
              { icon: <ExitToApp / key={340730}>, text: "Logout" },
            ].map((item, index) => (
              <ListItem;
                key={item.text}
                onClick={() = key={960570}> {
                  item.action?.();
                  setDrawerOpen(false);
                }}
                sx={{ cursor: "pointer" }}
              >
                <ListItemIcon key={394934}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} / key={645184}>
              </ListItem>
            ))}
          </List>
        </Box>
      </SwipeableDrawer>

      {/* Card Detail Dialog */}
      <Dialog;
        fullScreen;
        open={!!selectedCard}
        onClose={() = key={805068}> setSelectedCard(null)}
      >
        <AppBar sx={{ position: "relative" }} key={842098}>
          <Toolbar key={629347}>
            <IconButton;
              edge="start"
              color="inherit"
              onClick={() = key={657596}> setSelectedCard(null)}
            >
              <Close / key={273094}>
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" key={397729}>
              {selectedCard?.title}
            </Typography>
            <Button autoFocus color="inherit" key={216104}>
              Save;
            </Button>
          </Toolbar>
        </AppBar>

        <DialogContent key={509164}>
          {selectedCard && (
            <Box sx={{ p: 2 }} key={153054}>
              <Typography variant="h5" gutterBottom key={248584}>
                {selectedCard.title}
              </Typography>
              <Typography variant="body1" color="textSecondary" paragraph key={317189}>
                {selectedCard.subtitle}
              </Typography>

              {selectedCard.type === "metric" && (
                <Card sx={{ p: 3, textAlign: "center", mb: 2 }} key={231839}>
                  <Typography;
                    variant="h2"
                    color="primary.main"
                    fontWeight="bold"
                   key={519210}>
                    {typeof selectedCard.value === "number"
                      ? formatCurrency(selectedCard.value)
                      : selectedCard.value}
                  </Typography>
                  {selectedCard.change && (
                    <Box;
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      gap={1}
                      mt={1}
                     key={148628}>
                      {selectedCard.trend === "up" ? (
                        <TrendingUp color="success" / key={667104}>
                      ) : (
                        <TrendingUp;
                          style={{
                            transform: "rotate(180deg)",
                            color: theme.palette.error.main,
                          }}
                        / key={886002}>
                      )}
                      <Typography;
                        variant="h6"
                        color={
                          selectedCard.trend === "up"
                            ? "success.main"
                            : "error.main"
                        }
                       key={54351}>
                        {formatPercentage(Math.abs(selectedCard.change))}
                      </Typography>
                    </Box>
                  )}
                </Card>
              )}

              <Button variant="contained" fullWidth size="large" sx={{ mt: 2 }} key={187501}>
                Take Action;
              </Button>
            </Box>
          )}
        </DialogContent>
      </Dialog>

      {/* Loading Overlay */}
      <AnimatePresence key={359944}>
        {isLoading && (
          <motion.div;
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0,0,0,0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 9999,
            }}
           key={851603}>
            <Box textAlign="center" sx={{ color: "white" }} key={883171}>
              <CircularProgress color="inherit" size={60} / key={506198}>
              <Typography variant="h6" sx={{ mt: 2 }} key={254642}>
                Loading...
              </Typography>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Snackbar */}
      <Snackbar;
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() = key={373767}> setSnackbarOpen(false)}
        message={snackbarMessage}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      />
    </Box>
  );
};

export default MobileOptimizedInterface;
