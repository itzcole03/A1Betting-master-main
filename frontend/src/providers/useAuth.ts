import { useContext } from 'react.ts';
import { AuthContext } from './AuthProvider.ts';

export const useAuth = () => {

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
