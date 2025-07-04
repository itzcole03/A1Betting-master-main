import React, { createContext, useContext, useState, ReactNode  } from 'react.ts';

interface User {
  name: string;
  email: string;
  balance: number;
  tier: string;
  accuracy: number;
  winRate: number;
  totalProfit: number;
}

interface CyberAppContextType {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  user: User;
  theme: string;
  setTheme: (theme: string) => void;
}

interface CyberAppContextProviderProps {
  children: ReactNode;
}

export const CyberAppContextProvider: React.FC<
  CyberAppContextProviderProps;
> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [user] = useState<User key={43469}>({
    name: "Alex Chen",
    email: "alex@a1betting.com",
    balance: 127430.5,
    tier: "Quantum Pro",
    accuracy: 97.3,
    winRate: 89.4,
    totalProfit: 47230,
  });
  const [theme, setTheme] = useState("dark");

  const value: CyberAppContextType = {
    currentPage,
    setCurrentPage,
    user,
    theme,
    setTheme,
  };

  return (
    <CyberAppContext.Provider value={value} key={582792}>
      {children}
    </CyberAppContext.Provider>
  );
};

export const useCyberApp = () => {

  if (!context) {
    throw new Error(
      "useCyberApp must be used within a CyberAppContextProvider",
    );
  }
  return context;
};

export default CyberAppContext;
