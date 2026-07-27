'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { authApi } from '@/lib/api/auth';
import type { User, LoginCredentials } from '@/types/user';
import { UserRole } from '@/types/user';

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
      const storedUser = getStorageItem('user');

      // Try loading user from localStorage first for faster initial load
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser) as User);
        } catch (e) {
          // Invalid JSON, clear it
          localStorage.removeItem('user');
        }
      }

      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await authApi.getCurrentUser();
        if (response.success && response.data) {
          const userData = response.data as User;
          setUser(userData);
          // Update localStorage with fresh data from API
          setStorageItem('user', JSON.stringify(userData));
        }
      } catch (error: any) {
        // Only clear tokens if it's a 401/403 authentication error
        const isAuthError = error?.message?.includes('401') ||
                           error?.message?.includes('Unauthorized') ||
                           error?.message?.includes('403');

        if (isAuthError) {
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          localStorage.removeItem('user');
          setUser(null);
        }
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [getStorageItem, setStorageItem]);

  const login = useCallback(async (credentials: LoginCredentials) => {
    try {
      const response = await authApi.login(credentials);

      if (response.success && response.data) {
        const { user: userData, accessToken, refreshToken } = response.data;

        // Store tokens
        setStorageItem('access_token', accessToken);
        setStorageItem('refresh_token', refreshToken);

        // Store user data in localStorage
        setStorageItem('user', JSON.stringify(userData));

        // Store user data in state
        setUser(userData as User);

        // Show success toast
        toast.success(`Welcome back, ${userData.firstName}!`);

        // Redirect based on user role
        const redirectPath = (() => {
          switch (userData.role) {
            case UserRole.ADMIN:
              return '/admin';
            case UserRole.ORGANIZER:
              return '/organizer';
            case UserRole.USER:
            default:
              return '/dashboard';
          }
        })();

        router.push(redirectPath);
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
      localStorage.removeItem('user');
      setUser(null);

      // Show logout toast
      toast.success('Logged out successfully');

      router.push('/login');
    }
  }, [router, getStorageItem]);

  const refreshUser = useCallback(async () => {
    try {
      const response = await authApi.getCurrentUser();
      if (response.success && response.data) {
        const userData = response.data as User;
        setUser(userData);
        // Update localStorage with fresh data
        setStorageItem('user', JSON.stringify(userData));
      }
    } catch (error) {
      throw error;
    }
  }, [setStorageItem]);

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
