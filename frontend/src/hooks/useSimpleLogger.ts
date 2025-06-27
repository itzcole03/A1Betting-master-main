// Simple logger hook that doesn't require a provider;
export const useSimpleLogger = (componentName?: string) => {

  return {
    log: (message: string) => // console statement removed,
    error: (message: string) => // console statement removed,
    warn: (message: string) => // console statement removed,
    info: (message: string) => console.info(`${prefix} ${message}`),
    debug: (message: string) => console.debug(`${prefix} ${message}`),
  };
};

export default useSimpleLogger;
