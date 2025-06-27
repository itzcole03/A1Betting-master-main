import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState, useEffect } from 'react';

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {

        if (token) {
            validateToken(token);
        }
        else {
            setIsLoading(false);
        }
    }, []);
    const validateToken = async (token) => {
        try {
            const response = await fetch('https://api.betproai.com/auth/validate', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.ok) {

                setUser(userData);
            }
            else {
                localStorage.removeItem('auth_token');
            }
        }
        catch (error) {
            // console statement removed
            localStorage.removeItem('auth_token');
        }
        finally {
            setIsLoading(false);
        }
    };
    const login = async (email, password) => {
        setIsLoading(true);
        try {
            const response = await fetch('https://api.betproai.com/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            if (!response.ok) {
                throw new Error('Login failed');
            }
            const { token, user: userData } = await response.json();
            localStorage.setItem('auth_token', token);
            setUser(userData);
        }
        catch (error) {
            // console statement removed
            throw error;
        }
        finally {
            setIsLoading(false);
        }
    };
    const register = async (email, password, username) => {
        setIsLoading(true);
        try {
            const response = await fetch('https://api.betproai.com/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, username }),
            });
            if (!response.ok) {
                throw new Error('Registration failed');
            }
            const { token, user: userData } = await response.json();
            localStorage.setItem('auth_token', token);
            setUser(userData);
        }
        catch (error) {
            // console statement removed
            throw error;
        }
        finally {
            setIsLoading(false);
        }
    };
    const logout = () => {
        localStorage.removeItem('auth_token');
        setUser(null);
    };
    const updateProfile = async (data) => {

        if (!token)
            throw new Error('Not authenticated');
        try {
            const response = await fetch('https://api.betproai.com/auth/profile', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                throw new Error('Profile update failed');
            }

            setUser(updatedUser);
        }
        catch (error) {
            // console statement removed
            throw error;
        }
    };
    return (_jsx(AuthContext.Provider, { value: {
            user,
            isLoading,
            login,
            logout,
            register,
            updateProfile,
        }, children: children }));
};
export const useAuth = () => {

    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
