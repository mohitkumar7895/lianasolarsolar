'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'admin' | 'customer';
}

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string, role?: 'admin' | 'customer') => Promise<{ success: boolean; message?: string; role?: 'admin' | 'customer' }>;
  register: (data: {
    name: string;
    email: string;
    phone?: string;
    password: string;
    role: 'admin' | 'customer';
    adminKey?: string;
  }) => Promise<{ success: boolean; message?: string; role?: 'admin' | 'customer' }>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  // Check current session on initial load
  const refreshUser = async () => {
    try {
      const res = await fetch('/api/auth/me', { cache: 'no-store' });
      const data = await res.json();
      if (data.success && data.user) {
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (err) {
      console.error('Failed to fetch user session:', err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  const login = async (
    email: string,
    password: string,
    role?: 'admin' | 'customer'
  ): Promise<{ success: boolean; message?: string; role?: 'admin' | 'customer' }> => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        return {
          success: false,
          message: data.message || 'Login failed. Please check your credentials.',
        };
      }

      setUser(data.user);
      return {
        success: true,
        message: data.message,
        role: data.user.role,
      };
    } catch (err: any) {
      return {
        success: false,
        message: err.message || 'Network error occurred during sign in.',
      };
    }
  };

  const register = async (data: {
    name: string;
    email: string;
    phone?: string;
    password: string;
    role: 'admin' | 'customer';
    adminKey?: string;
  }): Promise<{ success: boolean; message?: string; role?: 'admin' | 'customer' }> => {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const resData = await res.json();

      if (!res.ok || !resData.success) {
        return {
          success: false,
          message: resData.message || 'Registration failed.',
        };
      }

      setUser(resData.user);
      return {
        success: true,
        message: resData.message,
        role: resData.user.role,
      };
    } catch (err: any) {
      return {
        success: false,
        message: err.message || 'Network error occurred during registration.',
      };
    }
  };

  const logout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setUser(null);
      window.location.href = '/login';
    }
  };

  const isAuthenticated = !!user;
  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated,
        isAdmin,
        login,
        register,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
