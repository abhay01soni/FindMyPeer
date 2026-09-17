-- ==============================================================================
-- FindMyPeer — Supabase Database Schema & Setup
-- Run this in your Supabase SQL Editor (Dashboard > SQL Editor > New Query)
-- ==============================================================================

-- 1. Create profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'client' CHECK (role IN ('client', 'expert', 'admin')),
  headline TEXT,
  bio TEXT,
  linkedin_url TEXT,
  city TEXT,
  category TEXT,
  experience_years TEXT,
  hourly_rate NUMERIC,
  is_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles Policies
CREATE POLICY "Public profiles are viewable by everyone" 
ON public.profiles FOR SELECT 
USING (true);

CREATE POLICY "Users can insert their own profile" 
ON public.profiles FOR INSERT 
WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles FOR UPDATE 
USING (auth.uid() = id);

-- 2. Create trigger function to automatically create profile on auth signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    COALESCE(new.raw_user_meta_data->>'role', 'client')
  )
  ON CONFLICT (id) DO UPDATE
  SET email = EXCLUDED.email,
      updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger execution on auth.users creation
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 3. Create waitlist_submissions table
CREATE TABLE IF NOT EXISTS public.waitlist_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  role TEXT NOT NULL CHECK (role IN ('client', 'expert')),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  linkedin_url TEXT,
  city TEXT,
  category TEXT,
  experience_years TEXT,
  expected_price NUMERIC,
  consultation_areas TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'invited')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on waitlist_submissions
ALTER TABLE public.waitlist_submissions ENABLE ROW LEVEL SECURITY;

-- Anyone can submit to waitlist (even if not yet authenticated)
CREATE POLICY "Anyone can submit to waitlist" 
ON public.waitlist_submissions FOR INSERT 
WITH CHECK (true);

-- Authenticated users can view their own submissions
CREATE POLICY "Users can view own waitlist submissions" 
ON public.waitlist_submissions FOR SELECT 
USING (auth.uid() = user_id OR auth.email() = email);
