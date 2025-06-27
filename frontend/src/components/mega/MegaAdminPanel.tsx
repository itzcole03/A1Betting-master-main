import React, { useState, useEffect  } from 'react.ts';
import {
  CYBER_COLORS,
  CYBER_GRADIENTS,
  CyberContainer,
  CyberText,
  CyberButton,
} from './CyberTheme.ts';
import {
  MegaCard,
  MegaInput,
  MegaAlert,
  MegaButton as MegaBtn,
} from './MegaUI.ts';
import {
  Users,
  Activity,
  BarChart3,
  Settings,
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Search,
  Eye,
  EyeOff,
  UserX,
  UserCheck,
} from 'lucide-react.ts';

// MEGA ADMIN PANEL - Cyber-themed administrative interface;
const MegaAdminPanel: React.FC<{
  className?: string;
}> = ({ className = "" }) => {
  const [activeTab, setActiveTab] = useState("users");
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState([
    {
      id: "1",
      name: "Alex Chen",
      email: "alex@a1betting.com",
      role: "Quantum Pro",
      status: "active",
      lastLogin: "2024-01-15T10:30:00Z",
      balance: 127430.5,
      totalBets: 1247,
      winRate: 89.4,
    },
    {
      id: "2",
      name: "Sarah Johnson",
      email: "sarah@a1betting.com",
      role: "Premium",
      status: "active",
      lastLogin: "2024-01-15T09:15:00Z",
      balance: 45230.0,
      totalBets: 892,
      winRate: 84.2,
    },
    {
      id: "3",
      name: "Mike Wilson",
      email: "mike@a1betting.com",
      role: "Standard",
      status: "suspended",
      lastLogin: "2024-01-10T14:22:00Z",
      balance: 1230.0,
      totalBets: 156,
      winRate: 62.1,
    },
  ]);

  const [systemLogs, setSystemLogs] = useState([
    {
      id: "1",
      level: "info",
      message: "Neural network model v4.2 deployed successfully",
      timestamp: "2024-01-15T10:45:00Z",
      category: "deployment",
    },
    {
      id: "2",
      level: "warning",
      message: "High memory usage detected on prediction service",
      timestamp: "2024-01-15T10:30:00Z",
      category: "performance",
    },
    {
      id: "3",
      level: "error",
      message: "Failed to connect to external odds API",
      timestamp: "2024-01-15T10:15:00Z",
      category: "integration",
    },
  ]);

  const [systemMetrics, setSystemMetrics] = useState({
    totalUsers: 12847,
    activeUsers: 8932,
    activeSessions: 347,
    totalPredictions: 1892456,
    systemUptime: "99.97%",
    cpuUsage: 67.8,
    memoryUsage: 84.3,
    modelsRunning: 47,
  });

  const tabs = [
    { key: "users", label: "User Management", icon: Users },
    { key: "logs", label: "System Logs", icon: Activity },
    { key: "stats", label: "System Stats", icon: BarChart3 },
    { key: "settings", label: "Settings", icon: Settings },
  ];

  const handleUserStatusUpdate = (
    userId: string,
    newStatus: "active" | "suspended",
  ) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === userId ? { ...user, status: newStatus } : user,
      ),
    );
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const getLogLevelColor = (level: string) => {
    switch (level) {
      case "error":
        return "#ff4757";
      case "warning":
        return "#ffa502";
      case "info":
        return CYBER_COLORS.primary;
      default:
        return CYBER_COLORS.text.muted;
    }
  };

  const renderUsersTab = () => (
    <div style={{ display: "grid", gap: "24px" }} key={588121}>
      {/* User Stats */}
      <div;
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "16px",
        }}
       key={125470}>
        <MegaCard variant="glass" padding="md" key={634886}>
          <div style={{ textAlign: "center" }} key={912688}>
            <Users;
              size={24}
              color={CYBER_COLORS.primary}
              style={{ marginBottom: "8px" }}
            / key={451344}>
            <CyberText;
              variant="title"
              style={{
                color: CYBER_COLORS.primary,
                fontSize: "20px",
                marginBottom: "4px",
              }}
             key={410123}>
              {systemMetrics.totalUsers.toLocaleString()}
            </CyberText>
            <CyberText variant="caption" color="muted" key={505352}>
              Total Users;
            </CyberText>
          </div>
        </MegaCard>

        <MegaCard variant="glass" padding="md" key={634886}>
          <div style={{ textAlign: "center" }} key={912688}>
            <Activity;
              size={24}
              color={CYBER_COLORS.secondary}
              style={{ marginBottom: "8px" }}
            / key={409473}>
            <CyberText;
              variant="title"
              style={{
                color: CYBER_COLORS.secondary,
                fontSize: "20px",
                marginBottom: "4px",
              }}
             key={699666}>
              {systemMetrics.activeUsers.toLocaleString()}
            </CyberText>
            <CyberText variant="caption" color="muted" key={505352}>
              Active Users;
            </CyberText>
          </div>
        </MegaCard>

        <MegaCard variant="glass" padding="md" key={634886}>
          <div style={{ textAlign: "center" }} key={912688}>
            <Shield;
              size={24}
              color={CYBER_COLORS.accent}
              style={{ marginBottom: "8px" }}
            / key={803850}>
            <CyberText;
              variant="title"
              style={{
                color: CYBER_COLORS.accent,
                fontSize: "20px",
                marginBottom: "4px",
              }}
             key={922463}>
              {systemMetrics.activeSessions}
            </CyberText>
            <CyberText variant="caption" color="muted" key={505352}>
              Live Sessions;
            </CyberText>
          </div>
        </MegaCard>
      </div>

      {/* Search */}
      <MegaInput;
        type="search"
        placeholder="Search users by name or email..."
        value={searchQuery}
        onChange={setSearchQuery}
        icon={<Search size={16} / key={449696}>}
        fullWidth;
      />

      {/* Users Table */}
      <MegaCard variant="glass" padding="none" key={412065}>
        <div style={{ overflowX: "auto" }} key={554085}>
          <table style={{ width: "100%", borderCollapse: "collapse" }} key={216615}>
            <thead key={851248}>
              <tr;
                style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.05)" }}
               key={838255}>
                <th style={{ padding: "16px", textAlign: "left" }} key={882640}>
                  <CyberText;
                    variant="caption"
                    color="muted"
                    style={{ fontWeight: "600" }}
                   key={879803}>
                    USER;
                  </CyberText>
                </th>
                <th style={{ padding: "16px", textAlign: "left" }} key={882640}>
                  <CyberText;
                    variant="caption"
                    color="muted"
                    style={{ fontWeight: "600" }}
                   key={879803}>
                    ROLE;
                  </CyberText>
                </th>
                <th style={{ padding: "16px", textAlign: "right" }} key={440506}>
                  <CyberText;
                    variant="caption"
                    color="muted"
                    style={{ fontWeight: "600" }}
                   key={879803}>
                    BALANCE;
                  </CyberText>
                </th>
                <th style={{ padding: "16px", textAlign: "right" }} key={440506}>
                  <CyberText;
                    variant="caption"
                    color="muted"
                    style={{ fontWeight: "600" }}
                   key={879803}>
                    WIN RATE;
                  </CyberText>
                </th>
                <th style={{ padding: "16px", textAlign: "center" }} key={109956}>
                  <CyberText;
                    variant="caption"
                    color="muted"
                    style={{ fontWeight: "600" }}
                   key={879803}>
                    STATUS;
                  </CyberText>
                </th>
                <th style={{ padding: "16px", textAlign: "right" }} key={440506}>
                  <CyberText;
                    variant="caption"
                    color="muted"
                    style={{ fontWeight: "600" }}
                   key={879803}>
                    ACTIONS;
                  </CyberText>
                </th>
              </tr>
            </thead>
            <tbody key={453335}>
              {filteredUsers.map((user) => (
                <tr;
                  key={user.id}
                  style={{
                    borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
                  }}
                 key={95052}>
                  <td style={{ padding: "16px" }} key={118463}>
                    <div key={241917}>
                      <CyberText;
                        variant="body"
                        style={{ fontWeight: "600", marginBottom: "2px" }}
                       key={891721}>
                        {user.name}
                      </CyberText>
                      <CyberText variant="caption" color="muted" key={505352}>
                        {user.email}
                      </CyberText>
                    </div>
                  </td>
                  <td style={{ padding: "16px" }} key={118463}>
                    <span;
                      style={{
                        padding: "4px 8px",
                        borderRadius: "4px",
                        fontSize: "12px",
                        fontWeight: "600",
                        backgroundColor: `${CYBER_COLORS.accent}20`,
                        color: CYBER_COLORS.accent,
                        border: `1px solid ${CYBER_COLORS.accent}40`,
                      }}
                     key={794013}>
                      {user.role}
                    </span>
                  </td>
                  <td style={{ padding: "16px", textAlign: "right" }} key={611186}>
                    <CyberText;
                      variant="body"
                      style={{ color: CYBER_COLORS.primary, fontWeight: "600" }}
                     key={761645}>
                      ${user.balance.toLocaleString()}
                    </CyberText>
                  </td>
                  <td style={{ padding: "16px", textAlign: "right" }} key={611186}>
                    <CyberText;
                      variant="body"
                      style={{
                        color: CYBER_COLORS.secondary,
                        fontWeight: "600",
                      }}
                     key={25200}>
                      {user.winRate.toFixed(1)}%
                    </CyberText>
                  </td>
                  <td style={{ padding: "16px", textAlign: "center" }} key={811855}>
                    <div;
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "4px",
                      }}
                     key={192276}>
                      {user.status === "active" ? (
                        <CheckCircle size={16} color={CYBER_COLORS.primary} / key={545247}>
                      ) : (
                        <XCircle size={16} color="#ff4757" / key={891862}>
                      )}
                      <CyberText;
                        variant="caption"
                        style={{
                          color:
                            user.status === "active"
                              ? CYBER_COLORS.primary;
                              : "#ff4757",
                        }}
                       key={369754}>
                        {user.status}
                      </CyberText>
                    </div>
                  </td>
                  <td style={{ padding: "16px", textAlign: "right" }} key={611186}>
                    <MegaBtn;
                      variant={user.status === "active" ? "danger" : "success"}
                      size="sm"
                      onClick={() = key={825949}>
                        handleUserStatusUpdate(
                          user.id,
                          user.status === "active" ? "suspended" : "active",
                        )
                      }
                      icon={
                        user.status === "active" ? (
                          <UserX size={14} / key={947563}>
                        ) : (
                          <UserCheck size={14} / key={148320}>
                        )
                      }
                    >
                      {user.status === "active" ? "Suspend" : "Activate"}
                    </MegaBtn>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </MegaCard>
    </div>
  );

  const renderLogsTab = () => (
    <MegaCard variant="glass" padding="lg" key={736026}>
      <CyberText variant="title" style={{ marginBottom: "16px" }} key={926451}>
        System Logs;
      </CyberText>
      <div style={{ display: "grid", gap: "12px" }} key={543541}>
        {systemLogs.map((log) => (
          <div;
            key={log.id}
            style={{
              padding: "16px",
              borderRadius: "8px",
              backgroundColor: "rgba(255, 255, 255, 0.02)",
              border: "1px solid rgba(255, 255, 255, 0.05)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
           key={518859}>
            <div style={{ flex: 1 }} key={130883}>
              <CyberText variant="body" style={{ marginBottom: "4px" }} key={911435}>
                {log.message}
              </CyberText>
              <CyberText variant="caption" color="muted" key={505352}>
                {new Date(log.timestamp).toLocaleString()} • {log.category}
              </CyberText>
            </div>
            <span;
              style={{
                padding: "4px 8px",
                borderRadius: "4px",
                fontSize: "10px",
                fontWeight: "600",
                backgroundColor: `${getLogLevelColor(log.level)}20`,
                color: getLogLevelColor(log.level),
                border: `1px solid ${getLogLevelColor(log.level)}40`,
                textTransform: "uppercase",
              }}
             key={941358}>
              {log.level}
            </span>
          </div>
        ))}
      </div>
    </MegaCard>
  );

  const renderStatsTab = () => (
    <div;
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "16px",
      }}
     key={390928}>
      {[
        {
          label: "System Uptime",
          value: systemMetrics.systemUptime,
          icon: Shield,
          color: CYBER_COLORS.primary,
        },
        {
          label: "CPU Usage",
          value: `${systemMetrics.cpuUsage}%`,
          icon: Activity,
          color: CYBER_COLORS.secondary,
        },
        {
          label: "Memory Usage",
          value: `${systemMetrics.memoryUsage}%`,
          icon: BarChart3,
          color: CYBER_COLORS.accent,
        },
        {
          label: "Models Running",
          value: systemMetrics.modelsRunning.toString(),
          icon: Settings,
          color: CYBER_COLORS.purple,
        },
      ].map((metric, index) => {

        return (
          <MegaCard key={index} variant="glass" padding="lg" key={623245}>
            <div style={{ textAlign: "center" }} key={912688}>
              <Icon;
                size={32}
                color={metric.color}
                style={{ marginBottom: "16px" }}
              / key={760425}>
              <CyberText;
                variant="title"
                style={{
                  color: metric.color,
                  fontSize: "24px",
                  marginBottom: "8px",
                }}
               key={117858}>
                {metric.value}
              </CyberText>
              <CyberText variant="body" color="muted" key={892775}>
                {metric.label}
              </CyberText>
            </div>
          </MegaCard>
        );
      })}
    </div>
  );

  return (
    <div;
      className={`mega-admin-panel ${className}`}
      style={{
        minHeight: "100vh",
        background: CYBER_GRADIENTS.background,
        padding: "24px",
      }}
     key={501408}>
      {/* Header */}
      <MegaCard;
        variant="panel"
        style={{ marginBottom: "24px", padding: "20px" }}
       key={924020}>
        <div;
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "16px",
          }}
         key={580818}>
          <div key={241917}>
            <CyberText;
              variant="title"
              style={{ fontSize: "28px", marginBottom: "4px" }}
             key={851908}>
              Admin Control Center;
            </CyberText>
            <CyberText variant="body" color="muted" key={892775}>
              System administration and user management;
            </CyberText>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }} key={537788}>
            <Shield size={16} color={CYBER_COLORS.primary} / key={814101}>
            <CyberText variant="caption" color="accent" key={194784}>
              Administrator Access;
            </CyberText>
          </div>
        </div>

        {/* Tab Navigation */}
        <div style={{ display: "flex", gap: "8px" }} key={772482}>
          {tabs.map((tab) => {

            return (
              <CyberButton;
                key={tab.key}
                variant={activeTab === tab.key ? "primary" : "secondary"}
                active={activeTab === tab.key}
                onClick={() = key={287146}> setActiveTab(tab.key)}
                icon={<Icon size={16} / key={856509}>}
                style={{ marginBottom: 0, width: "auto", padding: "8px 16px" }}
              >
                {tab.label}
              </CyberButton>
            );
          })}
        </div>
      </MegaCard>

      {/* Content */}
      <div key={241917}>
        {activeTab === "users" && renderUsersTab()}
        {activeTab === "logs" && renderLogsTab()}
        {activeTab === "stats" && renderStatsTab()}
        {activeTab === "settings" && (
          <MegaCard;
            variant="glass"
            padding="lg"
            style={{ textAlign: "center" }}
           key={89933}>
            <Settings;
              size={48}
              color={CYBER_COLORS.accent}
              style={{ marginBottom: "16px", margin: "0 auto" }}
            / key={237103}>
            <CyberText variant="title" style={{ marginBottom: "8px" }} key={813364}>
              System Settings;
            </CyberText>
            <CyberText variant="body" color="muted" key={892775}>
              Advanced configuration options;
            </CyberText>
          </MegaCard>
        )}
      </div>
    </div>
  );
};

export default MegaAdminPanel;
