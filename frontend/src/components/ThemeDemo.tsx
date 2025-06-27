import React from 'react.ts';
import { useTheme } from '@/providers/UniversalThemeProvider.ts';

const ThemeDemo: React.FC = () => {
  const { theme, variant, isDark, toggleDarkMode } = useTheme();

  return (
    <div;
      style={{
        padding: "24px",
        minHeight: "100vh",
        background: theme.colors.background,
        color: theme.colors.text.primary,
        fontFamily: "Inter, sans-serif",
      }}
     key={307617}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }} key={344409}>
        <div;
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "32px",
          }}
         key={450823}>
          <h1 style={{ margin: "0", color: theme.colors.text.primary }} key={744376}>
            🎨 Cyber Theme System Demo;
          </h1>
          <button;
            onClick={toggleDarkMode}
            style={{
              background: theme.gradients.primary,
              border: "none",
              padding: "8px 16px",
              borderRadius: "8px",
              color: "#000",
              fontWeight: "600",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
           key={93827}>
            {isDark ? "☀️" : "🌙"} {isDark ? "Light Mode" : "Dark Mode"}
          </button>
        </div>

        <div;
          style={{
            display: "grid",
            gap: "24px",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          }}
         key={729805}>
          {/* Theme Info Card */}
          <div;
            className="glass-card"
            style={{ padding: "24px", borderRadius: "12px" }}
           key={596460}>
            <h3;
              style={{ margin: "0 0 16px 0", color: theme.colors.text.primary }}
             key={289760}>
              Current Theme;
            </h3>
            <div;
              style={{ display: "flex", flexDirection: "column", gap: "8px" }}
             key={611771}>
              <div style={{ color: theme.colors.text.secondary }} key={604279}>
                <strong key={829099}>Variant:</strong> {variant}
              </div>
              <div style={{ color: theme.colors.text.secondary }} key={604279}>
                <strong key={829099}>Mode:</strong> {isDark ? "Dark" : "Light"}
              </div>
              <div style={{ color: theme.colors.text.secondary }} key={604279}>
                <strong key={829099}>Primary Color:</strong>
                <span;
                  style={{
                    display: "inline-block",
                    width: "20px",
                    height: "20px",
                    backgroundColor: theme.colors.primary,
                    marginLeft: "8px",
                    borderRadius: "4px",
                    verticalAlign: "middle",
                  }}
                / key={919341}>
              </div>
            </div>
          </div>

          {/* Color Palette Card */}
          <div;
            className="glass-card"
            style={{ padding: "24px", borderRadius: "12px" }}
           key={596460}>
            <h3;
              style={{ margin: "0 0 16px 0", color: theme.colors.text.primary }}
             key={289760}>
              Color Palette;
            </h3>
            <div;
              style={{
                display: "grid",
                gap: "12px",
                gridTemplateColumns: "repeat(2, 1fr)",
              }}
             key={602626}>
              {Object.entries(theme.colors).map(([key, value]) => {
                if (typeof value === "string") {
                  return (
                    <div;
                      key={key}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                     key={968050}>
                      <div;
                        style={{
                          width: "16px",
                          height: "16px",
                          backgroundColor: value,
                          borderRadius: "4px",
                          border: "1px solid rgba(255,255,255,0.2)",
                        }}
                      / key={294277}>
                      <span;
                        style={{
                          fontSize: "12px",
                          color: theme.colors.text.muted,
                        }}
                       key={324804}>
                        {key}
                      </span>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </div>

          {/* Interactive Elements Card */}
          <div;
            className="glass-card"
            style={{ padding: "24px", borderRadius: "12px" }}
           key={596460}>
            <h3;
              style={{ margin: "0 0 16px 0", color: theme.colors.text.primary }}
             key={289760}>
              Interactive Elements;
            </h3>
            <div;
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
             key={141350}>
              <button;
                className="cyber-btn"
                style={{
                  background: theme.gradients.primary,
                  border: "none",
                  padding: "12px 24px",
                  borderRadius: "8px",
                  color: isDark ? "#000" : "#000",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
               key={523914}>
                Primary Button;
              </button>

              <button;
                style={{
                  background: theme.colors.surface,
                  border: `1px solid ${theme.colors.border}`,
                  padding: "12px 24px",
                  borderRadius: "8px",
                  color: theme.colors.text.primary,
                  fontWeight: "500",
                  cursor: "pointer",
                }}
               key={652822}>
                Secondary Button;
              </button>

              <input;
                type="text"
                placeholder="Sample input..."
                style={{
                  background: theme.colors.surface,
                  border: `1px solid ${theme.colors.border}`,
                  padding: "12px 16px",
                  borderRadius: "8px",
                  color: theme.colors.text.primary,
                  fontSize: "14px",
                }}
              / key={509022}>
            </div>
          </div>

          {/* Typography Card */}
          <div;
            className="glass-card"
            style={{ padding: "24px", borderRadius: "12px" }}
           key={596460}>
            <h3;
              style={{ margin: "0 0 16px 0", color: theme.colors.text.primary }}
             key={289760}>
              Typography;
            </h3>
            <div;
              style={{ display: "flex", flexDirection: "column", gap: "8px" }}
             key={611771}>
              <h1;
                style={{
                  margin: "0",
                  color: theme.colors.text.primary,
                  fontSize: "24px",
                }}
               key={835599}>
                Heading 1;
              </h1>
              <h2;
                style={{
                  margin: "0",
                  color: theme.colors.text.primary,
                  fontSize: "20px",
                }}
               key={216154}>
                Heading 2;
              </h2>
              <p style={{ margin: "0", color: theme.colors.text.secondary }} key={273199}>
                Body text with secondary color;
              </p>
              <p;
                style={{
                  margin: "0",
                  color: theme.colors.text.muted,
                  fontSize: "14px",
                }}
               key={648651}>
                Muted text for captions and hints;
              </p>
              <div;
                className="holographic"
                style={{ fontSize: "18px", fontWeight: "900" }}
               key={397333}>
                Holographic Text Effect;
              </div>
            </div>
          </div>

          {/* Status Indicators Card */}
          <div;
            className="glass-card"
            style={{ padding: "24px", borderRadius: "12px" }}
           key={596460}>
            <h3;
              style={{ margin: "0 0 16px 0", color: theme.colors.text.primary }}
             key={289760}>
              Status Indicators;
            </h3>
            <div;
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
             key={141350}>
              <div;
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
               key={929522}>
                <div className="status-dot status-active" key={882605}></div>
                <span style={{ color: theme.colors.text.secondary }} key={145298}>
                  Active Status;
                </span>
              </div>
              <div;
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
               key={929522}>
                <div className="status-dot status-warning" key={70201}></div>
                <span style={{ color: theme.colors.text.secondary }} key={145298}>
                  Warning Status;
                </span>
              </div>
              <div;
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
               key={929522}>
                <div className="status-dot status-error" key={70183}></div>
                <span style={{ color: theme.colors.text.secondary }} key={145298}>
                  Error Status;
                </span>
              </div>
            </div>
          </div>

          {/* Effects Demo Card */}
          <div;
            className="glass-card animate-float"
            style={{ padding: "24px", borderRadius: "12px" }}
           key={86134}>
            <h3;
              style={{ margin: "0 0 16px 0", color: theme.colors.text.primary }}
             key={289760}>
              Effects & Animations;
            </h3>
            <div;
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
             key={141350}>
              <div;
                className="shadow-neon"
                style={{
                  padding: "12px",
                  borderRadius: "8px",
                  background: theme.colors.surface,
                  textAlign: "center",
                  color: theme.colors.text.primary,
                }}
               key={441489}>
                Neon Shadow Effect;
              </div>
              <div;
                className="animate-cyber-pulse"
                style={{
                  padding: "12px",
                  borderRadius: "8px",
                  background: theme.gradients.primary,
                  textAlign: "center",
                  color: "#000",
                  fontWeight: "600",
                }}
               key={683176}>
                Cyber Pulse Animation;
              </div>
              <div;
                className="cyber-loading"
                style={{ height: "4px", borderRadius: "2px" }}
               key={643341}></div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: "32px", textAlign: "center" }} key={818544}>
          <p style={{ color: theme.colors.text.muted, fontSize: "14px" }} key={148500}>
            Toggle between cyber light and dark modes to see the theme in;
            action! 🌟
          </p>
        </div>
      </div>
    </div>
  );
};

export default ThemeDemo;
