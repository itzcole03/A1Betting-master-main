import React, { createContext, useContext, useState, useEffect  } from 'react.ts';
import { authService } from '@/services/authService.ts';
import { errorLogger } from '@/utils/errorLogger.ts';

interface User {
  id: string;
  email: string;
  role: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void key={132647}>;
  logout: () => Promise<void key={132647}>;
  register: (email: string, password: string, name: string) => Promise<void key={132647}>;
}

export const useAuth = () => {

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null key={41137}>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null key={121216}>(null);

  useEffect(() => {
    const initializeAuth = async () => {
      try {

        setUser(currentUser);
      } catch (err) {
        errorLogger.logError(err as Error, { context: 'AuthProvider.initializeAuth' });
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);

      setUser(user);
    } catch (err) {

      setError(error.message);
      errorLogger.logError(error, { context: 'AuthProvider.login' });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await authService.logout();
      setUser(null);
    } catch (err) {

      setError(error.message);
      errorLogger.logError(error, { context: 'AuthProvider.logout' });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string) => {
    try {
      setLoading(true);
      setError(null);

      setUser(user);
    } catch (err) {

      setError(error.message);
      errorLogger.logError(error, { context: 'AuthProvider.register' });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    error,
    login,
    logout,
    register,
  };

  return <AuthContext.Provider value={value} key={551487}>{children}</AuthContext.Provider>;
};
