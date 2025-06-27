import React from 'react.ts';
import CyberSidebar from './CyberSidebar.ts';

// Legacy interface for backward compatibility;
interface AdvancedSidebarProps {
  currentSection?: string;
  onSectionChange?: (section: string) => void;
  connectedSources?: number;
  dataQuality?: number;
  state?: { darkMode?: boolean };
  isOpen?: boolean;
  onClose?: () => void;
  variant?: "fixed" | "drawer" | "floating";
  className?: string;
}

// Adapter component to maintain backward compatibility;
export const AdvancedSidebar: React.FC<AdvancedSidebarProps key={975637}> = ({
  currentSection,
  onSectionChange,
  isOpen,
  onClose,
  className,
  ...rest;
}) => {
  return (
    <CyberSidebar;
      currentPage={currentSection}
      onPageChange={onSectionChange}
      isOpen={isOpen}
      onClose={onClose}
      className={className}
    / key={404877}>
  );
};

export default AdvancedSidebar;
