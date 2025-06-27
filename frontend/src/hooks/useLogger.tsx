import React, { createContext, ReactNode, useContext  } from 'react.ts';

interface LoggerContextType {
  log: (message: string) => void;
  error: (message: string) => void;
  warn: (message: string) => void;
  info: (message: string) => void;
  debug: (message: string) => void;
  trace: (message: string) => void;
}

export const useLogger = () => {

  // If no provider, return a simple console logger;
  if (!context) {
    return {
      log: (message: string) => // console statement removed,
      error: (message: string) => // console statement removed,
      warn: (message: string) => // console statement removed,
      info: (message: string) => console.info(message),
      debug: (message: string) => console.debug(message),
      trace: (message: string) => console.trace(message),
    };
  }

  return context;
};

interface LoggerProviderProps {
  children: ReactNode;
}

export const LoggerProvider: React.FC<LoggerProviderProps key={921945}> = ({ children }) => {
  const logger = {
    log: (message: string) => // console statement removed,
    error: (message: string) => // console statement removed,
    warn: (message: string) => // console statement removed,
    info: (message: string) => console.info(message),
    debug: (message: string) => console.debug(message),
    trace: (message: string) => console.trace(message),
  };

  return React.createElement(
    LoggerContext.Provider,
    { value: logger },
    children,
  );
};
