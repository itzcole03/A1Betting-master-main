import React, { createContext, useContext } from "react";

export const useLogger = () => {

  // If no provider, return a simple console logger;
  if (!context) {
    return {
      log: (message) => // console statement removed,
      error: (message) => // console statement removed,
      warn: (message) => // console statement removed,
      info: (message) => console.info(message),
    };
  }

  return context;
};
export const LoggerProvider = ({ children }) => {
  const logger = {
    log: (message) => // console statement removed,
    error: (message) => // console statement removed,
    warn: (message) => // console statement removed,
    info: (message) => console.info(message),
  };
  return React.createElement(
    LoggerContext.Provider,
    { value: logger },
    children,
  );
};
