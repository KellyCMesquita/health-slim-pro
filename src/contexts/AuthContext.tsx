"use client";

import { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@/types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {
    try {
      const token = localStorage.getItem('auth_token');
      if (!token) {
        setLoading(false);
        return;
      }

      const response = await fetch('/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        
        // Salva o token no cookie também para o middleware
        document.cookie = `auth_token=${token}; path=/; max-age=2592000`; // 30 dias
      } else {
        localStorage.removeItem('auth_token');
        document.cookie = 'auth_token=; path=/; max-age=0'; // Remove cookie
      }
    } catch (error) {
      console.error('Error checking user:', error);
    } finally {
      setLoading(false);
    }
  }

  async function signIn(email: string, password: string) {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('auth_token', data.token);
        // Salva o token no cookie também para o middleware
        document.cookie = `auth_token=${data.token}; path=/; max-age=2592000`; // 30 dias
        setUser(data.user);
      } else {
        throw new Error(data.error || 'Erro ao fazer login');
      }
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    }
  }

  async function signUp(email: string, password: string, name: string) {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('auth_token', data.token);
        // Salva o token no cookie também para o middleware
        document.cookie = `auth_token=${data.token}; path=/; max-age=2592000`; // 30 dias
        setUser(data.user);
      } else {
        throw new Error(data.error || 'Erro ao criar conta');
      }
    } catch (error) {
      console.error('Sign up error:', error);
      throw error;
    }
  }

  async function signOut() {
    localStorage.removeItem('auth_token');
    document.cookie = 'auth_token=; path=/; max-age=0'; // Remove cookie
    setUser(null);
  }

  async function refreshUser() {
    await checkUser();
  }

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
