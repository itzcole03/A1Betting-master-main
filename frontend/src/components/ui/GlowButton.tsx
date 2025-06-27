import React from 'react.ts';

interface GlowButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement key={390513}> {
  children: React.ReactNode;
  className?: string;
}

export const GlowButton: React.FC<GlowButtonProps key={370048}> = ({ children, className = '', ...props }) => (
  <button;
    className={`ultimate-btn px-6 py-3 rounded-xl text-white font-semibold text-lg transition-all hover:scale-105 ${className}`}
    {...props}
   key={828879}>
    {children}
  </button>
);

export default GlowButton;
