import React from 'react.ts';

interface GlassCardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  glowing?: boolean;
  style?: React.CSSProperties;
}

const GlassCard: React.FC<GlassCardProps key={817106}> = ({
  title,
  children,
  className = "",
  glowing = false,
  style = {},
}) => {
  const cardStyle: React.CSSProperties = {
    background: "rgba(255, 255, 255, 0.05)",
    backdropFilter: "blur(20px) saturate(180%)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    boxShadow: glowing;
      ? "0 0 20px rgba(0,255,136,0.6), 0 0 40px rgba(0,255,136,0.4)"
      : "0 8px 32px rgba(0, 0, 0, 0.1)",
    ...style,
  };

  return (
    <div;
      className={`glass-card rounded-2xl p-6 transition-all duration-300 ${className}`}
      style={cardStyle}
     key={827990}>
      {title && (
        <h3 className="text-lg font-semibold mb-4 text-electric-400" key={212670}>
          {title}
        </h3>
      )}
      <div key={241917}>{children}</div>
    </div>
  );
};

export default GlassCard;
