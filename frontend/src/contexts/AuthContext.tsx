'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { authApi } from '@/lib/api/auth';
import type { User, LoginCredentials } from '@/types/user';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Helper to safely get localStorage items
  const getStorageItem = useCallback((key: string): string | null => {
    if (typeof window === 'undefined') return null;
    try {
      return localStorage.getItem(key);
    } catch (e) {
      return null;
    }
  }, []);

  // Helper to safely set localStorage items
  const setStorageItem = useCallback((key: string, value: string): boolean => {
    if (typeof window === 'undefined') return false;
    try {
      localStorage.setItem(key, value);
      return true;
    } catch (e) {
      return false;
    }
  }, []);

  // Check if user is authenticated on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = getStorageItem('access_token');

      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await authApi.getCurrentUser();
        if (response.success && response.data) {
          setUser(response.data as User);
        }
      } catch (error: any) {
        // Only clear tokens if it's a 401/403 authentication error
        const isAuthError = error?.message?.includes('401') ||
                           error?.message?.includes('Unauthorized') ||
                           error?.message?.includes('403');

        if (isAuthError) {
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
        }
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [getStorageItem]);

  const login = useCallback(async (credentials: LoginCredentials) => {
    try {
      const response = await authApi.login(credentials);

      if (response.success && response.data) {
        const { user: userData, accessToken, refreshToken } = response.data;

        // Store tokens
        setStorageItem('access_token', accessToken);
        setStorageItem('refresh_token', refreshToken);

        // Store user data
        setUser(userData as User);

        // Redirect to admin dashboard
        router.push('/admin');
      }
    } catch (error) {
      throw error;
    }
  }, [router, setStorageItem]);

  const logout = useCallback(async () => {
    const refreshToken = getStorageItem('refresh_token');

    try {
      if (refreshToken) {
        await authApi.logout(refreshToken);
      }
    } finally {
      // Clear local storage regardless of API call result
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      setUser(null);
      router.push('/login');
    }
  }, [router, getStorageItem]);

  const refreshUser = useCallback(async () => {
    try {
      const response = await authApi.getCurrentUser();
      if (response.success && response.data) {
        setUser(response.data as User);
      }
    } catch (error) {
      throw error;
    }
  }, []);

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
