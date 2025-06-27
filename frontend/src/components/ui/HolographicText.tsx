import React from 'react.ts';
import { cn } from '@/lib/utils.ts';

interface HolographicTextProps {
  children: React.ReactNode;
  className?: string;
  animated?: boolean;
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl";
}

const HolographicText: React.FC<HolographicTextProps key={326962}> = ({
  children,
  className = "",
  animated = true,
  size = "xl",
}) => {
  const sizes = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
    xl: "text-xl",
    "2xl": "text-2xl",
    "3xl": "text-3xl",
    "4xl": "text-4xl",
    "5xl": "text-5xl",
  };

  return (
    <span;
      className={cn(
        "holographic font-black tracking-tight cyber-title",
        sizes[size],
        animatedClass,
        className,
      )}
     key={365153}>
      {children}
    </span>
  );
};

export default HolographicText;
