'use client';

import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { User, Session, AuthChangeEvent } from '@supabase/supabase-js';
import { createClient, checkIsSupabaseConfigured } from '@/lib/supabase/client';

export interface UserProfile {
  id: string;
  email: string;
  full_name?: string | null;
  phone?: string | null;
  avatar_url?: string | null;
  role: 'client' | 'expert' | 'professional' | 'admin';
  headline?: string | null;
  bio?: string | null;
  linkedin_url?: string | null;
  city?: string | null;
  category?: string | null;
  experience_years?: string | null;
  hourly_rate?: number | null;
  is_verified?: boolean;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: UserProfile | null;
  isLoading: boolean;
  isConfigured: boolean;
  isAuthModalOpen: boolean;
  openAuthModal: (defaultEmail?: string) => void;
  closeAuthModal: () => void;
  signInWithMagicLink: (email: string, role?: 'client' | 'expert') => Promise<{ error: string | null; success: boolean }>;
  verifyOtp: (email: string, token: string) => Promise<{ error: string | null; success: boolean }>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<{ error: string | null; success: boolean }>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [defaultModalEmail, setDefaultModalEmail] = useState('');

  const supabase = useMemo(() => createClient(), []);

  // Fetch or construct profile from Supabase
  const fetchProfile = async (currentUser: User) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', currentUser.id)
        .single();

      if (error && error.code === 'PGRST116') {
        const newProfile: Partial<UserProfile> = {
          id: currentUser.id,
          email: currentUser.email || '',
          full_name: currentUser.user_metadata?.full_name || currentUser.email?.split('@')[0] || 'User',
          role: (currentUser.user_metadata?.role as 'client' | 'expert') || 'client',
        };

        const { data: inserted } = await supabase
          .from('profiles')
          .insert(newProfile)
          .select()
          .single();

        if (inserted) {
          setProfile(inserted as UserProfile);
        }
      } else if (data) {
        setProfile(data as UserProfile);
      }
    } catch (err) {
      console.warn('Could not fetch Supabase profile:', err);
    }
  };

  useEffect(() => {
    // Supabase session initialization
    const getInitialSession = async () => {
      try {
        const { data: { session: initialSession } } = await supabase.auth.getSession();
        setSession(initialSession);
        setUser(initialSession?.user ?? null);
        if (initialSession?.user) {
          await fetchProfile(initialSession.user);
        }
      } catch (err) {
        console.error('Error fetching Supabase session:', err);
      } finally {
        setIsLoading(false);
      }
    };

    getInitialSession();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event: AuthChangeEvent, currentSession: Session | null) => {
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        if (currentSession?.user) {
          await fetchProfile(currentSession.user);
        } else {
          setProfile(null);
        }
        setIsLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);

  const openAuthModal = (defaultEmail: string = '') => {
    setDefaultModalEmail(defaultEmail);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const isConfigured = checkIsSupabaseConfigured();

  // Direct Supabase Magic Link call
  const signInWithMagicLink = async (
    email: string,
    role: 'client' | 'expert' = 'client'
  ): Promise<{ error: string | null; success: boolean }> => {
    if (!email || !email.includes('@')) {
      return { error: 'Please enter a valid email address.', success: false };
    }

    if (!checkIsSupabaseConfigured()) {
      return {
        error: 'Supabase credentials are not configured in .env.local. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.',
        success: false,
      };
    }

    try {
      const redirectUrl = typeof window !== 'undefined' 
        ? `${window.location.origin}/auth/callback` 
        : undefined;

      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            role: role,
            full_name: email.split('@')[0],
          },
        },
      });

      if (error) {
        return { error: error.message, success: false };
      }

      return { error: null, success: true };
    } catch (err: any) {
      return { error: err?.message || 'Failed to send magic link.', success: false };
    }
  };

  // Direct Supabase OTP Verification call
  const verifyOtp = async (
    email: string,
    token: string
  ): Promise<{ error: string | null; success: boolean }> => {
    if (!token || token.trim().length < 6) {
      return { error: 'Please enter a valid 6-digit verification code.', success: false };
    }

    if (!checkIsSupabaseConfigured()) {
      return {
        error: 'Supabase credentials are not configured in .env.local.',
        success: false,
      };
    }

    try {
      const { data, error } = await supabase.auth.verifyOtp({
        email,
        token: token.trim(),
        type: 'magiclink',
      });

      if (error) {
        // Try email OTP type if magiclink token type fails
        const retry = await supabase.auth.verifyOtp({
          email,
          token: token.trim(),
          type: 'email',
        });
        if (retry.error) {
          return { error: retry.error.message, success: false };
        }
        if (retry.data?.user) {
          setUser(retry.data.user);
          setSession(retry.data.session);
          await fetchProfile(retry.data.user);
          return { error: null, success: true };
        }
      }

      if (data?.user) {
        setUser(data.user);
        setSession(data.session);
        await fetchProfile(data.user);
        return { error: null, success: true };
      }

      return { error: null, success: true };
    } catch (err: any) {
      return { error: err?.message || 'Failed to verify OTP code.', success: false };
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setSession(null);
      setProfile(null);
    } catch (err) {
      console.error('Error signing out:', err);
    }
  };

  const updateProfile = async (
    updates: Partial<UserProfile>
  ): Promise<{ error: string | null; success: boolean }> => {
    if (!user) {
      return { error: 'User is not logged in.', success: false };
    }

    try {
      const { data, error } = await supabase
        .from('profiles')
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id)
        .select()
        .single();

      if (error) {
        return { error: error.message, success: false };
      }

      setProfile(data as UserProfile);
      return { error: null, success: true };
    } catch (err: any) {
      return { error: err?.message || 'Failed to update profile.', success: false };
    }
  };

  const refreshProfile = async () => {
    if (user) {
      await fetchProfile(user);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        profile,
        isLoading,
        isConfigured: checkIsSupabaseConfigured(),
        isAuthModalOpen,
        openAuthModal,
        closeAuthModal,
        signInWithMagicLink,
        verifyOtp,
        signOut,
        updateProfile,
        refreshProfile,
      }}
    >
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
