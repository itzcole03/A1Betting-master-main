import React from 'react.ts';
export interface HeaderProps {
    onToggleSidebar: () => void;
    isSidebarOpen: boolean;
}
declare const Header: React.FC<HeaderProps>;
export default Header;
