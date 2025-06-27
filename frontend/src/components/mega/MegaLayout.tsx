import React, { useState, useEffect, ReactNode  } from 'react';
import { createPortal } from 'react-dom';
// Removed unused CyberTheme imports;
import { useTheme } from '@/components/common/theme/ThemeProvider';
import { MegaButton } from './MegaUI';
// Removed problematic import;
import {
  Brain,
  Menu,
  X,
  Bell,
  Settings,
  User,
  LogOut,
  Search,
  Wifi,
  WifiOff,
  ChevronLeft,
  ChevronRight,
  Home,
  BarChart3,
  DollarSign,
  Target,
  Activity,
  Shield,
  Zap,
  Sun,
  Moon,
  ChevronDown,
  UserCircle,
} from 'lucide-react.ts';

// MEGA LAYOUT SYSTEM - Consolidates 23 layout components;

// ============================================================================
// USER AVATAR DROPDOWN COMPONENT;
// ============================================================================
const UserAvatarDropdown: React.FC<{
  user: { name: string; avatar?: string };
  isDark?: boolean;
  onNavigate?: (pageId: string) => void;
}> = ({ user, isDark, onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownRef, setDropdownRef] = useState<HTMLDivElement | null key={825020}>(null);
  const [buttonRef, setButtonRef] = useState<HTMLButtonElement | null key={824026}>(null);
  const [dropdownPosition, setDropdownPosition] = useState({
    top: 0,
    right: 0,
  });

  // Calculate dropdown position based on button position;
  useEffect(() => {
    if (isOpen && buttonRef) {

      setDropdownPosition({
        top: rect.bottom + 8,
        right: window.innerWidth - rect.right,
      });
    }
  }, [isOpen, buttonRef]);

  // Close dropdown when clicking outside;
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef &&
        !dropdownRef.contains(event.target as Node) &&
        buttonRef &&
        !buttonRef.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [dropdownRef, buttonRef, isOpen]);

  const handleAccountProfile = () => {
    // Navigate to profile page using app navigation;
    if (onNavigate) {
      onNavigate("profile");
    }
    setIsOpen(false);
  };

  const handleSignOut = () => {
    // Handle sign out;
    if (confirm("Are you sure you want to sign out?")) {
      // Clear any stored auth data;
      localStorage.removeItem("authToken");
      sessionStorage.clear();
      // Redirect to login or home page;
      window.location.href = "/login";
    }
    setIsOpen(false);
  };

  return (
    <div style={{ position: "relative" }} key={981141}>
      <button;
        ref={setButtonRef}
        onClick={() = key={829724}> setIsOpen(!isOpen)}
        style={{
          width: "32px",
          height: "32px",
          background: "linear-gradient(135deg, #06ffa5, #00ff88)",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          border: "none",
          transition: "all 0.2s ease",
          transform: isOpen ? "scale(1.05)" : "scale(1)",
        }}
      >
        {user.avatar ? (
          <img;
            src={user.avatar}
            alt={user.name}
            style={{ width: "100%", height: "100%", borderRadius: "50%" }}
          / key={749505}>
        ) : (
          <User size={16} color={isDark ? "#000" : "#fff"} / key={903286}>
        )}
      </button>

      {/* Dropdown Menu using Portal */}
      {isOpen &&
        createPortal(
          <div;
            ref={setDropdownRef}
            style={{
              position: "fixed",
              top: `${dropdownPosition.top}px`,
              right: `${dropdownPosition.right}px`,
              minWidth: "220px",
              background: "rgba(15, 23, 42, 0.98)",
              backdropFilter: "blur(40px) saturate(2)",
              border: "1px solid rgba(6, 255, 165, 0.4)",
              borderRadius: "16px",
              boxShadow:
                "0 25px 80px rgba(0, 0, 0, 0.6), 0 10px 40px rgba(6, 255, 165, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
              zIndex: 2147483647,
              padding: "12px",
              transform: "translateY(0)",
              opacity: 1,
            }}
           key={610485}>
            {/* User Info Header */}
            <div;
              style={{
                padding: "12px 16px",
                borderBottom: "1px solid rgba(6, 255, 165, 0.2)",
                marginBottom: "8px",
              }}
             key={871788}>
              <div;
                style={{
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#ffffff",
                  marginBottom: "2px",
                }}
               key={643721}>
                {user.name}
              </div>
              <div;
                style={{
                  fontSize: "12px",
                  color: "#94a3b8",
                }}
               key={159805}>
                Pro User;
              </div>
            </div>

            {/* Menu Items */}
            <button;
              onClick={handleAccountProfile}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                padding: "12px 16px",
                background: "transparent",
                border: "none",
                borderRadius: "12px",
                cursor: "pointer",
                fontSize: "14px",
                color: "#ffffff",
                transition: "all 0.2s ease",
                textAlign: "left",
                fontWeight: "500",
              }}
              onMouseEnter={(e) = key={106857}> {
                e.currentTarget.style.background = "rgba(6, 255, 165, 0.15)";
                e.currentTarget.style.transform = "translateX(4px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.transform = "translateX(0)";
              }}
            >
              <UserCircle;
                size={16}
                style={{ marginRight: "12px", color: "#06ffa5" }}
              / key={474531}>
              Account & Profile;
            </button>

            <button;
              onClick={handleSignOut}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                padding: "12px 16px",
                background: "transparent",
                border: "none",
                borderRadius: "12px",
                cursor: "pointer",
                fontSize: "14px",
                color: "#ff6b6b",
                transition: "all 0.2s ease",
                textAlign: "left",
                fontWeight: "500",
              }}
              onMouseEnter={(e) = key={672901}> {
                e.currentTarget.style.background = "rgba(255, 107, 107, 0.15)";
                e.currentTarget.style.transform = "translateX(4px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.transform = "translateX(0)";
              }}
            >
              <LogOut;
                size={16}
                style={{ marginRight: "12px", color: "#ff6b6b" }}
              / key={842545}>
              Sign Out;
            </button>
          </div>,
          document.body,
        )}
    </div>
  );
};

// ============================================================================
// MEGA SIDEBAR (Consolidates CyberSidebar, AdvancedSidebar, Sidebar variants)
// ============================================================================
export const MegaSidebar: React.FC<{
  isOpen: boolean;
  onToggle: () => void;
  navigationItems: Array<{
    id: string;
    label: string;
    icon: React.ComponentType<any key={295429}>;
    href?: string;
    badge?: string | number;
    submenu?: Array<{
      id: string;
      label: string;
      icon?: React.ComponentType<any key={295429}>;
    }>;
  }>;
  currentPage: string;
  onNavigate: (pageId: string) => void;
  user?: {
    name: string;
    email: string;
    avatar?: string;
    tier?: string;
    balance?: number;
  };
  systemStatus?: {
    connectedSources: number;
    dataQuality: number;
    isOnline: boolean;
  };
  variant?: "default" | "compact" | "floating";
  className?: string;
}> = ({
  isOpen,
  onToggle,
  navigationItems,
  currentPage,
  onNavigate,
  user,
  systemStatus,
  variant = "default",
  className = "",
}) => {
  const { theme } = useTheme();
  const [expandedSubmenus, setExpandedSubmenus] = useState<Set<string key={798680}>>(
    new Set(),
  );

  const toggleSubmenu = (itemId: string) => {

    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId);
    } else {
      newExpanded.add(itemId);
    }
    setExpandedSubmenus(newExpanded);
  };

  const getStatusIcon = () => {
    if (!systemStatus?.isOnline)
      return { icon: WifiOff, color: "#ff4757", text: "Offline" };
    if (systemStatus.connectedSources < 5)
      return { icon: Wifi, color: "#00d4ff", text: "Limited" };
    return { icon: Wifi, color: "#06ffa5", text: "Connected" };
  };



  return (
    <div;
      className={`mega-sidebar ${className}`}
      style={{
        width: sidebarWidth,
        height: "100vh",
        position: variant === "floating" ? "fixed" : "relative",
        left: variant === "floating" && !isOpen ? "-280px" : "0",
        zIndex: variant === "floating" ? 1000 : "auto",
        transition: "all 0.3s ease",
        backdropFilter: "blur(40px) saturate(2)",
        backgroundColor: "rgba(255, 255, 255, 0.02)",
        border: "1px solid rgba(255, 255, 255, 0.05)",
        boxShadow:
          "0 8px 32px rgba(0, 0, 0, 0.2), 0 1px 0 rgba(255, 255, 255, 0.05) inset",
        borderRight:
          variant !== "floating"
            ? `1px solid rgba(255, 255, 255, 0.1)`
            : "none",
        borderRadius: variant === "floating" ? "0 16px 16px 0" : "0",
        display: "flex",
        flexDirection: "column",
      }}
     key={767993}>
      {/* Header */}
      <div style={{ padding: isCompact ? "16px 12px" : "24px 20px" }} key={802861}>
        <div;
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: isCompact ? "center" : "space-between",
            marginBottom: isCompact ? "0" : "24px",
          }}
         key={598820}>
          <div style={{ display: "flex", alignItems: "center" }} key={597803}>
            <button;
              onClick={() = key={619354}> onNavigate("dashboard")}
              style={{
                width: "44px",
                height: "44px",
                background:
                  "linear-gradient(135deg, rgba(6, 255, 165, 0.9), rgba(0, 255, 136, 0.8))",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginRight: isCompact ? "0" : "14px",
                border: "none",
                cursor: "pointer",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                boxShadow: "0 4px 16px rgba(6, 255, 165, 0.2)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform =
                  "scale(1.08) translateY(-1px)";
                e.currentTarget.style.boxShadow =
                  "0 8px 32px rgba(6, 255, 165, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1) translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 4px 16px rgba(6, 255, 165, 0.2)";
              }}
              title="Return to Dashboard"
            >
              <Brain size={24} color="#000" / key={298472}>
            </button>
            {!isCompact && (
              <div key={241917}>
                <div;
                  style={{
                    fontSize: "16px",
                    fontWeight: "700",
                    color: "#ffffff",
                    lineHeight: "1.2",
                    letterSpacing: "-0.01em",
                  }}
                 key={698265}>
                  A1Betting;
                </div>
                <div;
                  style={{
                    fontSize: "12px",
                    color: "#94a3b8",
                    lineHeight: "1.2",
                    fontWeight: "500",
                  }}
                 key={676621}>
                  Quantum Platform;
                </div>
              </div>
            )}
          </div>

          {!isCompact && (
            <button;
              onClick={onToggle}
              style={{
                background: "rgba(6, 255, 165, 0.08)",
                border: "1px solid rgba(6, 255, 165, 0.2)",
                color: "#06ffa5",
                fontWeight: "500",
                padding: "8px",
                fontSize: "12px",
                borderRadius: "10px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.2s ease",
                width: "36px",
                height: "36px",
              }}
              onMouseEnter={(e) = key={294116}> {
                e.currentTarget.style.background = "rgba(6, 255, 165, 0.15)";
                e.currentTarget.style.borderColor = "rgba(6, 255, 165, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(6, 255, 165, 0.08)";
                e.currentTarget.style.borderColor = "rgba(6, 255, 165, 0.2)";
              }}
            >
              <X size={16} / key={185282}>
            </button>
          )}
        </div>

        {/* User Info */}
        {user && !isCompact && (
          <div;
            style={{
              padding: "16px",
              marginBottom: "16px",
              borderRadius: "12px",
              background: "rgba(255, 255, 255, 0.05)",
              backdropFilter: "blur(20px) saturate(180%)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
            }}
           key={792293}>
            <div;
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "8px",
              }}
             key={284775}>
              <div;
                style={{
                  width: "32px",
                  height: "32px",
                  background:
                    "linear-gradient(135deg, rgba(6, 255, 165, 0.8), rgba(0, 255, 136, 0.6))",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: "8px",
                }}
               key={793039}>
                <User size={16} color="#000" / key={363008}>
              </div>
              <div key={241917}>
                <div;
                  style={{
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#ffffff",
                    lineHeight: "1.2",
                  }}
                 key={871394}>
                  {user.name}
                </div>
                <div;
                  style={{
                    fontSize: "12px",
                    color: "#94a3b8",
                    lineHeight: "1.2",
                  }}
                 key={321215}>
                  {user.tier || "Pro User"}
                </div>
              </div>
            </div>
            {user.balance && (
              <div;
                style={{
                  fontSize: "12px",
                  color: "#06ffa5",
                  lineHeight: "1.2",
                }}
               key={299580}>
                Balance: ${user.balance.toLocaleString()}
              </div>
            )}
          </div>
        )}

        {/* System Status */}
        {systemStatus && !isCompact && (
          <div;
            style={{
              padding: "12px",
              marginBottom: "16px",
              borderRadius: "12px",
              background: "rgba(255, 255, 255, 0.05)",
              backdropFilter: "blur(20px) saturate(180%)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
            }}
           key={564747}>
            <div;
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
             key={149193}>
              <div style={{ display: "flex", alignItems: "center" }} key={597803}>
                <StatusIcon size={16} color={status.color} / key={65302}>
                <div;
                  style={{
                    fontSize: "12px",
                    marginLeft: "8px",
                    color: status.color,
                    lineHeight: "1.2",
                  }}
                 key={641404}>
                  {status.text}
                </div>
              </div>
              <div;
                style={{
                  fontSize: "12px",
                  color: "#94a3b8",
                  lineHeight: "1.2",
                }}
               key={811156}>
                {systemStatus.dataQuality}%
              </div>
            </div>
          </div>
        )}

        {/* Toggle Button for Compact */}
        {isCompact && (
          <div style={{ textAlign: "center", marginTop: "16px" }} key={125296}>
            <button;
              onClick={onToggle}
              style={{
                background: "rgba(6, 255, 165, 0.1)",
                border: "1px solid rgba(6, 255, 165, 0.8)",
                color: "#06ffa5",
                fontWeight: "500",
                padding: "6px 12px",
                fontSize: "12px",
                borderRadius: "8px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
             key={933749}>
              <Menu size={16} / key={733938}>
            </button>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1, padding: "0 16px", overflowY: "auto" }} key={679418}>
        <div style={{ marginBottom: "8px" }} key={867857}>
          {navigationItems;
            .filter(
              (item) =>
                !["settings", "profile", "Settings", "Profile"].includes(
                  item.id,
                ) &&
                !item.label?.toLowerCase().includes("settings") &&
                !item.label?.toLowerCase().includes("profile"),
            )
            .map((item, index) => {




              return (
                <div key={item.id} style={{ marginBottom: "6px" }} key={667103}>
                  <button;
                    onClick={() = key={263171}> {
                      if (hasSubmenu && !isCompact) {
                        toggleSubmenu(item.id);
                      } else {
                        onNavigate(item.id);
                      }
                    }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      width: "100%",
                      borderRadius: "14px",
                      padding: isCompact ? "14px 12px" : "14px 18px",
                      fontSize: "14px",
                      fontWeight: isActive ? "600" : "500",
                      cursor: "pointer",
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      justifyContent: isCompact ? "center" : "flex-start",
                      border: isActive;
                        ? "1px solid rgba(6, 255, 165, 0.3)"
                        : "1px solid transparent",
                      background: isActive;
                        ? "linear-gradient(135deg, rgba(6, 255, 165, 0.95), rgba(0, 255, 136, 0.9))"
                        : "rgba(255, 255, 255, 0.03)",
                      color: isActive ? "#000" : "#e2e8f0",
                      backdropFilter: "blur(20px) saturate(1.8)",
                      position: "relative",
                      overflow: "hidden",
                      boxShadow: isActive;
                        ? "0 8px 32px rgba(6, 255, 165, 0.25), 0 2px 8px rgba(0, 0, 0, 0.1)"
                        : "0 2px 8px rgba(0, 0, 0, 0.05)",
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.background =
                          "rgba(255, 255, 255, 0.08)";
                        e.currentTarget.style.transform = "translateY(-1px)";
                        e.currentTarget.style.boxShadow =
                          "0 4px 16px rgba(0, 0, 0, 0.1)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.background =
                          "rgba(255, 255, 255, 0.03)";
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow =
                          "0 2px 8px rgba(0, 0, 0, 0.05)";
                      }
                    }}
                  >
                    <span;
                      style={{
                        fontSize: "18px",
                        color: isActive ? "#000" : "#ffffff",
                        display: "flex",
                        alignItems: "center",
                        minWidth: "18px",
                      }}
                     key={512696}>
                      {item.icon}
                    </span>
                    {!isCompact && (
                      <div;
                        style={{
                          display: "flex",
                          alignItems: "center",
                          flex: 1,
                          marginLeft: "14px",
                        }}
                       key={179214}>
                        <span;
                          style={{
                            flex: 1,
                            textAlign: "left",
                            letterSpacing: "-0.01em",
                          }}
                         key={170935}>
                          {item.label}
                        </span>
                        {item.badge && (
                          <span;
                            style={{
                              background: isActive;
                                ? "rgba(0, 0, 0, 0.15)"
                                : "#06ffa5",
                              color: isActive ? "#000" : "#000",
                              borderRadius: "12px",
                              padding: "4px 8px",
                              fontSize: "11px",
                              fontWeight: "700",
                              marginLeft: "8px",
                            }}
                           key={330366}>
                            {item.badge}
                          </span>
                        )}
                        {hasSubmenu && (
                          <ChevronRight;
                            size={16}
                            style={{
                              marginLeft: "8px",
                              transform: isExpanded;
                                ? "rotate(90deg)"
                                : "rotate(0deg)",
                              transition: "transform 0.3s ease",
                              color: isActive ? "#000" : "#94a3b8",
                            }}
                          / key={764792}>
                        )}
                      </div>
                    )}
                  </button>

                  {/* Submenu */}
                  {hasSubmenu && isExpanded && !isCompact && (
                    <div style={{ marginLeft: "16px", marginTop: "4px" }} key={317240}>
                      {item.submenu!.map((subItem) => {

                        return (
                          <MegaButton;
                            key={subItem.id}
                            variant="secondary"
                            onClick={() = key={33260}> onNavigate(subItem.id)}
                            icon={
                              SubIcon ? (
                                <span style={{ fontSize: "14px" }} key={777475}>
                                  {SubIcon}
                                </span>
                              ) : undefined;
                            }
                            style={{
                              marginBottom: "2px",
                              fontSize: "12px",
                              padding: "8px 12px",
                            }}
                          >
                            {subItem.label}
                          </MegaButton>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      </nav>

      <div key={241917}>
        <div key={241917}>
          <div;
            style={{
              fontWeight: "400",
              marginBottom: "6px",
              pointerEvents: "auto",
            }}
          / key={79732}>
          <div;
            style={{
              fontWeight: "400",
              marginBottom: "6px",
              pointerEvents: "auto",
            }}
          / key={79732}>
        </div>
      </div>

      {/* Settings and Profile buttons outside navigation */}
      {!isCompact && (
        <div style={{ padding: "8px 16px 20px 16px" }} key={949991}>
          <div;
            style={{
              height: "1px",
              background:
                "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)",
              marginBottom: "16px",
            }}
          / key={464967}>
          <button;
            onClick={() = key={919301}> onNavigate("profile")}
            style={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              borderRadius: "14px",
              padding: "14px 18px",
              fontSize: "14px",
              fontWeight: "500",
              marginBottom: "8px",
              cursor: "pointer",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              border: "1px solid transparent",
              background: "rgba(255, 255, 255, 0.03)",
              color: "#e2e8f0",
              backdropFilter: "blur(20px) saturate(1.8)",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.08)";
              e.currentTarget.style.transform = "translateY(-1px)";
              e.currentTarget.style.boxShadow = "0 4px 16px rgba(0, 0, 0, 0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.03)";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.05)";
            }}
          >
            <span;
              style={{
                fontSize: "18px",
                color: "#ffffff",
                display: "flex",
                alignItems: "center",
                minWidth: "18px",
              }}
             key={621502}>
              ��
            </span>
            <span;
              style={{
                marginLeft: "14px",
                letterSpacing: "-0.01em",
              }}
             key={449208}>
              Profile;
            </span>
          </button>
          <button;
            onClick={() = key={919301}> onNavigate("settings")}
            style={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              borderRadius: "14px",
              padding: "14px 18px",
              fontSize: "14px",
              fontWeight: "500",
              cursor: "pointer",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              border: "1px solid rgba(6, 255, 165, 0.3)",
              background:
                "linear-gradient(135deg, rgba(6, 255, 165, 0.95), rgba(0, 255, 136, 0.9))",
              color: "#000",
              backdropFilter: "blur(20px) saturate(1.8)",
              boxShadow:
                "0 8px 32px rgba(6, 255, 165, 0.25), 0 2px 8px rgba(0, 0, 0, 0.1)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-1px)";
              e.currentTarget.style.boxShadow =
                "0 12px 48px rgba(6, 255, 165, 0.35), 0 4px 16px rgba(0, 0, 0, 0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 8px 32px rgba(6, 255, 165, 0.25), 0 2px 8px rgba(0, 0, 0, 0.1)";
            }}
          >
            <span;
              style={{
                fontSize: "18px",
                color: "#000",
                display: "flex",
                alignItems: "center",
                minWidth: "18px",
              }}
             key={237846}>
              ⚙️
            </span>
            <span;
              style={{
                marginLeft: "14px",
                letterSpacing: "-0.01em",
              }}
             key={449208}>
              Settings;
            </span>
          </button>
        </div>
      )}
    </div>
  );
};

// ============================================================================
// MEGA HEADER (Consolidates CyberHeader, EliteSportsHeader, Navbar variants)
// ============================================================================
export const MegaHeader: React.FC<{
  title?: string;
  subtitle?: string;
  leftActions?: ReactNode;
  rightActions?: ReactNode;
  showSearch?: boolean;
  onSearch?: (query: string) => void;
  notifications?: number;
  onNotificationsClick?: () => void;
  user?: {
    name: string;
    avatar?: string;
  };
  onNavigate?: (pageId: string) => void;
  className?: string;
}> = ({
  title,
  subtitle,
  leftActions,
  rightActions,
  showSearch = false,
  onSearch,
  notifications = 0,
  onNotificationsClick,
  user,
  onNavigate,
  className = "",
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  // Use try-catch to handle any theme access errors;
  let theme, isDark, toggleDarkMode;
  try {

    theme = themeContext.theme;
    isDark = themeContext.isDark;
    toggleDarkMode = themeContext.toggleDarkMode;
  } catch (error) {
    // console statement removed
    theme = null;
    isDark = false;
    toggleDarkMode = () => // console statement removed
  }

  // Comprehensive fallback theme;
  const defaultTheme = {
    colors: {
      surface: "rgba(255, 255, 255, 0.8)",
      border: "rgba(15, 23, 42, 0.1)",
      text: {
        primary: "#0f172a",
        secondary: "#334155",
        muted: "#64748b",
      },
      primary: "#06ffa5",
    },
    effects: {
      shadow: "0 8px 32px rgba(15, 23, 42, 0.1)",
    },
    gradients: {
      primary: "linear-gradient(135deg, #06ffa5, #00ff88)",
    },
  };

  // Ensure we always have a complete theme object;

  return (
    <header;
      className={`mega-header ${className}`}
      style={{
        background: "rgba(15, 23, 42, 0.95)",
        backdropFilter: "blur(40px) saturate(180%)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
        padding: "20px 32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        minHeight: "72px",
        boxShadow:
          "0 8px 32px rgba(0, 0, 0, 0.3), 0 0px 20px rgba(6, 255, 165, 0.2)",
        position: "relative",
        zIndex: 1000,
      }}
     key={229706}>
      {/* Left Section */}
      <div style={{ display: "flex", alignItems: "center", flex: 1 }} key={505100}>
        {leftActions}

        {(title || subtitle) && (
          <div style={{ marginLeft: leftActions ? "20px" : "0" }} key={556131}>
            {title && (
              <div;
                style={{
                  fontSize: "24px",
                  marginBottom: "4px",
                  color: "#ffffff",
                  fontWeight: "700",
                  lineHeight: "1.2",
                  letterSpacing: "-0.02em",
                }}
               key={414014}>
                {title}
              </div>
            )}
            {subtitle && (
              <div;
                style={{
                  fontSize: "14px",
                  color: "#94a3b8",
                  lineHeight: "1.3",
                  fontWeight: "500",
                  letterSpacing: "-0.01em",
                }}
               key={610787}>
                {subtitle}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Center Section - Search */}
      {showSearch && (
        <div style={{ flex: 1, maxWidth: "480px", margin: "0 32px" }} key={149711}>
          <div style={{ position: "relative" }} key={981141}>
            <Search;
              size={18}
              style={{
                position: "absolute",
                left: "16px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#94a3b8",
                zIndex: 1,
              }}
            / key={677798}>
            <input;
              type="text"
              placeholder="Search anything..."
              value={searchQuery}
              onChange={(e) = key={24897}> {
                setSearchQuery(e.target.value);
                onSearch?.(e.target.value);
              }}
              style={{
                width: "100%",
                padding: "14px 20px 14px 48px",
                borderRadius: "16px",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(20px) saturate(180%)",
                color: "#ffffff",
                fontSize: "15px",
                fontWeight: "500",
                outline: "none",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "rgba(6, 255, 165, 0.3)";
                e.target.style.backgroundColor = "rgba(255, 255, 255, 0.08)";
                e.target.style.boxShadow =
                  "0 8px 32px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(6, 255, 165, 0.2)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "rgba(255, 255, 255, 0.1)";
                e.target.style.backgroundColor = "rgba(255, 255, 255, 0.05)";
                e.target.style.boxShadow = "0 4px 16px rgba(0, 0, 0, 0.1)";
              }}
            />
          </div>
        </div>
      )}

      {/* Right Section */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }} key={401855}>
        {/* Theme Toggle */}
        <button;
          onClick={toggleDarkMode}
          style={{
            background: "rgba(255, 255, 255, 0.05)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            color: "#ffffff",
            fontWeight: "500",
            padding: "12px",
            borderRadius: "12px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "44px",
            height: "44px",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            backdropFilter: "blur(20px) saturate(180%)",
          }}
          onMouseEnter={(e) = key={575330}> {
            e.currentTarget.style.background = "rgba(255, 255, 255, 0.08)";
            e.currentTarget.style.transform = "translateY(-1px)";
            e.currentTarget.style.boxShadow = "0 8px 24px rgba(0, 0, 0, 0.15)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "none";
          }}
          title={`Switch to ${isDark ? "Light" : "Dark"} Mode`}
        >
          {isDark ? <Sun size={18} / key={233552}> : <Moon size={18} / key={418721}>}
        </button>

        {/* Notifications */}
        {onNotificationsClick && (
          <div style={{ position: "relative" }} key={981141}>
            <button;
              onClick={onNotificationsClick}
              style={{
                background: "rgba(6, 255, 165, 0.08)",
                border: "1px solid rgba(6, 255, 165, 0.2)",
                color: "#06ffa5",
                fontWeight: "500",
                padding: "12px",
                borderRadius: "12px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "44px",
                height: "44px",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                backdropFilter: "blur(20px) saturate(180%)",
              }}
              onMouseEnter={(e) = key={703956}> {
                e.currentTarget.style.background = "rgba(6, 255, 165, 0.15)";
                e.currentTarget.style.transform = "translateY(-1px)";
                e.currentTarget.style.boxShadow =
                  "0 8px 24px rgba(6, 255, 165, 0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(6, 255, 165, 0.08)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <Bell size={18} / key={281710}>
            </button>
            {notifications > 0 && (
              <span;
                style={{
                  position: "absolute",
                  top: "2px",
                  right: "2px",
                  background: "linear-gradient(135deg, #06ffa5, #00ff88)",
                  color: "#000",
                  borderRadius: "50%",
                  width: "20px",
                  height: "20px",
                  fontSize: "11px",
                  fontWeight: "700",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "2px solid rgba(15, 23, 42, 0.95)",
                  boxShadow: "0 2px 8px rgba(6, 255, 165, 0.4)",
                }}
               key={678144}>
                {notifications > 9 ? "9+" : notifications}
              </span>
            )}
          </div>
        )}

        {/* User Avatar with Dropdown */}
        {user && (
          <UserAvatarDropdown;
            user={user}
            isDark={isDark}
            onNavigate={onNavigate}
          / key={680112}>
        )}

        {/* Custom Right Actions */}
        {rightActions}

        {/* Current Time */}
        <div;
          style={{
            fontSize: "12px",
            color: safeTheme.colors?.text?.muted || "#64748b",
            lineHeight: "1.2",
          }}
         key={463311}>
          {new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>
    </header>
  );
};

// ============================================================================
// MEGA APP SHELL (Complete layout wrapper)
// ============================================================================
export const MegaAppShell: React.FC<{
  children: ReactNode;
  sidebar?: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
  sidebarOpen?: boolean;
  className?: string;
}> = ({
  children,
  sidebar,
  header,
  footer,
  sidebarOpen = true,
  className = "",
}) => {
  // Use try-catch to handle any theme access errors;
  let safeTheme;
  try {
    const { theme } = useTheme();
    safeTheme = theme;
  } catch (error) {
    // console statement removed
    safeTheme = null;
  }

  // Comprehensive fallback theme with all required properties;
  const defaultTheme = {
    colors: {
      background:
        "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 25%, #cbd5e1 50%, #e2e8f0 75%, #f8fafc 100%)",
      text: {
        primary: "#0f172a",
        secondary: "#334155",
        muted: "#64748b",
      },
      primary: "#06ffa5",
      secondary: "#00ff88",
      surface: "rgba(255, 255, 255, 0.8)",
      border: "rgba(15, 23, 42, 0.1)",
    },
    gradients: {
      primary: "linear-gradient(135deg, #06ffa5, #00ff88)",
    },
    effects: {
      shadow: "0 8px 32px rgba(15, 23, 42, 0.1)",
    },
  };

  // Ensure we always have a complete theme object;

  return (
    <div;
      className={`mega-app-shell ${className}`}
      style={{
        display: "flex",
        minHeight: "100vh",
        background:
          finalTheme.colors?.background || defaultTheme.colors.background,
        color:
          finalTheme.colors?.text?.primary || defaultTheme.colors.text.primary,
      }}
     key={142575}>
      {/* Sidebar */}
      {sidebar}

      {/* Main Content Area */}
      <div;
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
       key={204913}>
        {/* Header */}
        {header}

        {/* Main Content */}
        <main;
          style={{
            flex: 1,
            overflow: "auto",
            position: "relative",
            background:
              "linear-gradient(135deg, rgba(15, 23, 42, 0.98) 0%, rgba(30, 41, 59, 0.95) 50%, rgba(15, 23, 42, 0.98) 100%)",
            padding: "24px 32px 32px 32px",
          }}
         key={761459}>
          <div;
            style={{
              maxWidth: "1400px",
              margin: "0 auto",
              width: "100%",
            }}
           key={479339}>
            {children}
          </div>
        </main>

        {/* Footer */}
        {footer}
      </div>
    </div>
  );
};

export default {
  MegaSidebar,
  MegaHeader,
  MegaAppShell,
};