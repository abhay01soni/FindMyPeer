-- ==============================================================================
-- FindMyPeer — Supabase Database Schema & Setup
-- Run this in your Supabase SQL Editor (Dashboard > SQL Editor > New Query)
-- ==============================================================================

-- 1. Create profiles table (maps to users / auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  phone TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'client' CHECK (role IN ('client', 'professional', 'expert', 'admin')),
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

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 3. Create professional_profiles table
CREATE TABLE IF NOT EXISTS public.professional_profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
  niche_id TEXT,
  bio TEXT,
  credentials TEXT,
  linkedin_url TEXT,
  years_experience INT DEFAULT 0,
  city TEXT,
  photo_url TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('draft', 'active', 'inactive', 'suspended')),
  google_calendar_connected BOOLEAN DEFAULT FALSE,
  rating_avg NUMERIC(3, 2) DEFAULT 0.0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.professional_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public professional profiles viewable by everyone"
ON public.professional_profiles FOR SELECT
USING (true);

CREATE POLICY "Professionals can insert own profile"
ON public.professional_profiles FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Professionals can update own profile"
ON public.professional_profiles FOR UPDATE
USING (auth.uid() = user_id);

-- 4. Create services table
CREATE TABLE IF NOT EXISTS public.services (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  professional_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  duration_minutes INT NOT NULL DEFAULT 30,
  price_inr NUMERIC NOT NULL DEFAULT 0,
  description TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public services viewable by everyone"
ON public.services FOR SELECT
USING (true);

CREATE POLICY "Professionals can manage own services"
ON public.services FOR ALL
USING (auth.uid() = professional_id);

-- 5. Create bookings table
CREATE TABLE IF NOT EXISTS public.bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  professional_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  service_id UUID REFERENCES public.services(id) ON DELETE SET NULL,
  slot_start TIMESTAMPTZ NOT NULL,
  slot_end TIMESTAMPTZ NOT NULL,
  status TEXT DEFAULT 'confirmed' CHECK (status IN ('pending_payment', 'confirmed', 'completed', 'cancelled', 'no_show')),
  google_event_id TEXT,
  meet_link TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Professionals can view own bookings"
ON public.bookings FOR SELECT
USING (auth.uid() = professional_id OR auth.uid() = client_id);

CREATE POLICY "Professionals can update own bookings"
ON public.bookings FOR UPDATE
USING (auth.uid() = professional_id);

CREATE POLICY "Clients can create bookings"
ON public.bookings FOR INSERT
WITH CHECK (auth.uid() = client_id);

-- 6. Create payments table
CREATE TABLE IF NOT EXISTS public.payments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  booking_id UUID REFERENCES public.bookings(id) ON DELETE CASCADE UNIQUE NOT NULL,
  amount_inr NUMERIC NOT NULL,
  commission_inr NUMERIC NOT NULL,
  payout_status TEXT DEFAULT 'pending' CHECK (payout_status IN ('pending', 'paid')),
  status TEXT DEFAULT 'paid' CHECK (status IN ('created', 'paid', 'failed', 'refunded')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Professionals can view own payments"
ON public.payments FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.bookings
    WHERE bookings.id = payments.booking_id
    AND (bookings.professional_id = auth.uid() OR bookings.client_id = auth.uid())
  )
);

-- 7. Create reviews table
CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  booking_id UUID REFERENCES public.bookings(id) ON DELETE CASCADE UNIQUE NOT NULL,
  client_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  professional_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public reviews viewable by everyone"
ON public.reviews FOR SELECT
USING (true);

CREATE POLICY "Clients can write reviews for completed bookings"
ON public.reviews FOR INSERT
WITH CHECK (auth.uid() = client_id);

-- 8. Create waitlist_submissions table
CREATE TABLE IF NOT EXISTS public.waitlist_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  role TEXT NOT NULL CHECK (role IN ('client', 'expert', 'professional')),
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

ALTER TABLE public.waitlist_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit to waitlist" 
ON public.waitlist_submissions FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Users can view own waitlist submissions" 
ON public.waitlist_submissions FOR SELECT 
USING (auth.uid() = user_id OR auth.email() = email);
