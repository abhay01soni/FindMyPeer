'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import StatusBanner from '@/components/dashboard/StatusBanner';
import BookingsSection, { BookingRecord } from '@/components/dashboard/BookingsSection';
import EarningsSection, { PaymentRecord } from '@/components/dashboard/EarningsSection';
import ProfileServicesSection, { ProfessionalProfileData, ServiceRecord } from '@/components/dashboard/ProfileServicesSection';
import ReviewsSection, { ReviewRecord } from '@/components/dashboard/ReviewsSection';
import ProfileCompletionCard from '@/components/dashboard/ProfileCompletionCard';
import { useAuth } from '@/context/AuthContext';
import { createClient, isSupabaseConfigured } from '@/lib/supabase/client';
import { 
  Briefcase, 
  Calendar, 
  IndianRupee, 
  User, 
  MessageSquare, 
  ShieldCheck, 
  Sparkles, 
  LogIn, 
  RefreshCw,
  ExternalLink,
  CheckCircle2,
  Terminal,
  Layers,
  Video,
  Clock,
  Link2,
  CalendarCheck
} from 'lucide-react';

// Default initial data for rich MVP presentation
const MOCK_INITIAL_PROFILE: ProfessionalProfileData = {
  bio: 'Led core search infrastructure products at Google. Helped 14+ early-stage startups navigate initial product validation, PMF, and high-scale architecture.',
  credentials: 'Ex-Google Staff PM, 9+ yrs product leadership',
  linkedin_url: 'https://linkedin.com/in/arjun-kapoor-tech',
  years_experience: 9,
  city: 'Bengaluru / Remote',
  photo_url: '',
  status: 'active',
  google_calendar_connected: true,
  rating_avg: 5.0,
};

const MOCK_INITIAL_SERVICES: ServiceRecord[] = [
  {
    id: 'svc-1',
    title: '0 to 1 Product Strategy & PMF Validation',
    duration_minutes: 45,
    price_inr: 2999,
    description: 'Line-by-line review of your PRD, feature prioritization matrix, and user acquisition metrics.',
    is_active: true,
  },
  {
    id: 'svc-2',
    title: 'Staff Engineer & Senior PM Career Roadmap',
    duration_minutes: 30,
    price_inr: 1999,
    description: 'Executive resume teardown, promo packet structure, and salary negotiation tactics.',
    is_active: true,
  },
  {
    id: 'svc-3',
    title: 'System Design Mock Interview & Architecture Sanity',
    duration_minutes: 60,
    price_inr: 3999,
    description: 'High-throughput system design critique, microservices scaling, and database bottleneck teardown.',
    is_active: true,
  },
];

const MOCK_INITIAL_BOOKINGS: BookingRecord[] = [
  {
    id: 'bkg-101',
    client_id: 'client-1',
    client_name: 'Vikram Sharma',
    client_email: 'vikram.sharma@startup.io',
    service_id: 'svc-1',
    service_title: '0 to 1 Product Strategy & PMF Validation',
    service_duration: 45,
    slot_start: new Date(Date.now() + 24 * 3600 * 1000 + 4 * 3600 * 1000).toISOString(),
    slot_end: new Date(Date.now() + 24 * 3600 * 1000 + 4.75 * 3600 * 1000).toISOString(),
    status: 'confirmed',
    meet_link: 'https://meet.google.com/abc-defg-hij',
    created_at: new Date(Date.now() - 2 * 24 * 3600 * 1000).toISOString(),
  },
  {
    id: 'bkg-102',
    client_id: 'client-2',
    client_name: 'Ananya Roy',
    client_email: 'ananya@techventures.co',
    service_id: 'svc-3',
    service_title: 'System Design Mock Interview & Architecture Sanity',
    service_duration: 60,
    slot_start: new Date(Date.now() + 48 * 3600 * 1000).toISOString(),
    slot_end: new Date(Date.now() + 49 * 3600 * 1000).toISOString(),
    status: 'confirmed',
    meet_link: 'https://meet.google.com/xyz-uvwx-rst',
    created_at: new Date(Date.now() - 1 * 24 * 3600 * 1000).toISOString(),
  },
  {
    id: 'bkg-100',
    client_id: 'client-3',
    client_name: 'Rohan Mehta',
    client_email: 'rohan.m@devs.com',
    service_id: 'svc-2',
    service_title: 'Staff Engineer & Senior PM Career Roadmap',
    service_duration: 30,
    slot_start: new Date(Date.now() - 3 * 24 * 3600 * 1000).toISOString(),
    slot_end: new Date(Date.now() - 3 * 24 * 3600 * 1000 + 1800000).toISOString(),
    status: 'completed',
    meet_link: 'https://meet.google.com/completed-link',
    created_at: new Date(Date.now() - 5 * 24 * 3600 * 1000).toISOString(),
  },
];

const MOCK_INITIAL_PAYMENTS: PaymentRecord[] = [
  {
    id: 'pay-1',
    booking_id: 'bkg-100',
    client_name: 'Rohan Mehta',
    service_title: '0 to 1 Product Strategy & PMF Validation',
    amount_inr: 2999,
    commission_inr: 360,
    net_inr: 2639,
    payout_status: 'processed',
    status: 'paid',
    created_at: new Date(Date.now() - 3 * 24 * 3600 * 1000).toISOString(),
  },
  {
    id: 'pay-2',
    booking_id: 'bkg-99',
    client_name: 'Kavita Sundaram',
    service_title: 'System Design Mock Interview & Architecture Sanity',
    amount_inr: 3999,
    commission_inr: 480,
    net_inr: 3519,
    payout_status: 'pending',
    status: 'paid',
    created_at: new Date(Date.now() - 2 * 24 * 3600 * 1000).toISOString(),
  },
];

const MOCK_INITIAL_REVIEWS: ReviewRecord[] = [
  {
    id: 'rev-1',
    booking_id: 'bkg-100',
    client_id: 'client-3',
    client_name: 'Rohan Mehta',
    rating: 5,
    comment: 'Exceptional insight! Arjun tore down my promo packet and gave super actionable feedback on positioning my system architectural metrics.',
    created_at: new Date(Date.now() - 2 * 24 * 3600 * 1000).toISOString(),
  },
  {
    id: 'rev-2',
    booking_id: 'bkg-99',
    client_id: 'client-4',
    client_name: 'Kavita Sundaram',
    rating: 5,
    comment: 'The 45-minute PMF validation session saved us months of building the wrong feature set. Worth every single rupee!',
    created_at: new Date(Date.now() - 8 * 24 * 3600 * 1000).toISOString(),
  },
];

export default function ProfessionalDashboardPage() {
  const { user, profile: authProfile, isLoading: authLoading, openAuthModal } = useAuth();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<'overview' | 'upcoming' | 'meet_links' | 'calendar' | 'bookings' | 'earnings' | 'services' | 'reviews' | 'completion'>('overview');

  // Supabase Data States
  const [profileData, setProfileData] = useState<ProfessionalProfileData>(MOCK_INITIAL_PROFILE);
  const [servicesData, setServicesData] = useState<ServiceRecord[]>(MOCK_INITIAL_SERVICES);
  const [bookingsData, setBookingsData] = useState<BookingRecord[]>(MOCK_INITIAL_BOOKINGS);
  const [paymentsData, setPaymentsData] = useState<PaymentRecord[]>(MOCK_INITIAL_PAYMENTS);
  const [reviewsData, setReviewsData] = useState<ReviewRecord[]>(MOCK_INITIAL_REVIEWS);

  const [dataLoading, setDataLoading] = useState(true);

  // Load from Supabase Postgres if configured
  useEffect(() => {
    if (!user) {
      setDataLoading(false);
      return;
    }

    const loadSupabaseData = async () => {
      setDataLoading(true);
      const supabase = createClient();

      try {
        if (isSupabaseConfigured) {
          // 1. Fetch Professional Profile
          const { data: prof } = await supabase
            .from('professional_profiles')
            .select('*')
            .eq('user_id', user.id)
            .single();

          if (prof) {
            setProfileData(prof);
          } else {
            // Auto-initialize draft professional profile
            const newProf: Partial<ProfessionalProfileData> = {
              user_id: user.id,
              bio: authProfile?.bio || MOCK_INITIAL_PROFILE.bio,
              credentials: authProfile?.headline || MOCK_INITIAL_PROFILE.credentials,
              linkedin_url: authProfile?.linkedin_url || MOCK_INITIAL_PROFILE.linkedin_url,
              years_experience: 5,
              city: authProfile?.city || MOCK_INITIAL_PROFILE.city,
              photo_url: authProfile?.avatar_url || '',
              google_calendar_connected: true,
              rating_avg: 5.0,
            };
            await supabase.from('professional_profiles').insert(newProf);
          }

          // 2. Fetch Services
          const { data: svcs } = await supabase
            .from('services')
            .select('*')
            .eq('professional_id', user.id);

          if (svcs && svcs.length > 0) {
            setServicesData(svcs);
          }

          // 3. Fetch Bookings
          const { data: bkgs } = await supabase
            .from('bookings')
            .select('*, profiles!client_id(full_name, email), services(title, duration_minutes)')
            .eq('professional_id', user.id);

          if (bkgs && bkgs.length > 0) {
            const mappedBkgs: BookingRecord[] = bkgs.map((b: any) => ({
              id: b.id,
              client_id: b.client_id,
              client_name: b.profiles?.full_name || 'Client',
              client_email: b.profiles?.email || '',
              service_id: b.service_id,
              service_title: b.services?.title || '1:1 Session',
              service_duration: b.services?.duration_minutes || 30,
              slot_start: b.slot_start,
              slot_end: b.slot_end,
              status: b.status,
              meet_link: b.meet_link || 'https://meet.google.com/peer-session',
              created_at: b.created_at,
            }));
            setBookingsData(mappedBkgs);
          }

          // 4. Fetch Payments
          const { data: pmts } = await supabase
            .from('payments')
            .select('*, bookings(*, profiles!client_id(full_name), services(title))');

          if (pmts && pmts.length > 0) {
            const mappedPmts: PaymentRecord[] = pmts.map((p: any) => ({
              id: p.id,
              booking_id: p.booking_id,
              client_name: p.bookings?.profiles?.full_name || 'Client',
              service_title: p.bookings?.services?.title || '1:1 Consultation',
              amount_inr: p.amount_inr,
              commission_inr: p.commission_inr || p.amount_inr * 0.12,
              net_inr: p.amount_inr - (p.commission_inr || p.amount_inr * 0.12),
              payout_status: p.payout_status || 'pending',
              status: p.status || 'paid',
              created_at: p.created_at,
            }));
            setPaymentsData(mappedPmts);
          }

          // 5. Fetch Reviews
          const { data: revs } = await supabase
            .from('reviews')
            .select('*, profiles!client_id(full_name)')
            .eq('professional_id', user.id);

          if (revs && revs.length > 0) {
            const mappedRevs: ReviewRecord[] = revs.map((r: any) => ({
              id: r.id,
              booking_id: r.booking_id,
              client_id: r.client_id,
              client_name: r.profiles?.full_name || 'Verified Client',
              rating: r.rating,
              comment: r.comment,
              created_at: r.created_at,
            }));
            setReviewsData(mappedRevs);
          }
        }
      } catch (err) {
        console.warn('Supabase fetch notice, displaying initial dashboard state:', err);
      } finally {
        setDataLoading(false);
      }
    };

    loadSupabaseData();
  }, [user, authProfile]);

  // Handle Save Profile
  const handleSaveProfile = async (updated: Partial<ProfessionalProfileData>): Promise<boolean> => {
    setProfileData((prev) => ({ ...prev, ...updated }));

    if (user && isSupabaseConfigured) {
      try {
        const supabase = createClient();
        await supabase
          .from('professional_profiles')
          .upsert({ user_id: user.id, ...updated, updated_at: new Date().toISOString() });
      } catch (err) {
        console.error('Error saving profile to Supabase:', err);
      }
    }
    return true;
  };

  // Handle Add Service
  const handleAddService = async (newSvc: Omit<ServiceRecord, 'id'>): Promise<boolean> => {
    const created: ServiceRecord = {
      ...newSvc,
      id: 'svc-' + Date.now(),
    };

    setServicesData((prev) => [created, ...prev]);

    if (user && isSupabaseConfigured) {
      try {
        const supabase = createClient();
        await supabase.from('services').insert({
          professional_id: user.id,
          title: newSvc.title,
          duration_minutes: newSvc.duration_minutes,
          price_inr: newSvc.price_inr,
          description: newSvc.description,
          is_active: newSvc.is_active,
        });
      } catch (err) {
        console.error('Error adding service to Supabase:', err);
      }
    }
    return true;
  };

  // Handle Toggle Active / Deactivate Service
  const handleToggleServiceActive = async (serviceId: string, currentActive: boolean): Promise<boolean> => {
    setServicesData((prev) =>
      prev.map((s) => (s.id === serviceId ? { ...s, is_active: !currentActive } : s))
    );

    if (user && isSupabaseConfigured) {
      try {
        const supabase = createClient();
        await supabase
          .from('services')
          .update({ is_active: !currentActive })
          .eq('id', serviceId);
      } catch (err) {
        console.error('Error toggling service in Supabase:', err);
      }
    }
    return true;
  };

  // Handle Update Service
  const handleUpdateService = async (serviceId: string, updated: Partial<ServiceRecord>): Promise<boolean> => {
    setServicesData((prev) =>
      prev.map((s) => (s.id === serviceId ? { ...s, ...updated } : s))
    );

    if (user && isSupabaseConfigured) {
      try {
        const supabase = createClient();
        await supabase.from('services').update(updated).eq('id', serviceId);
      } catch (err) {
        console.error('Error updating service in Supabase:', err);
      }
    }
    return true;
  };

  // Handle Update Booking Status
  const handleUpdateBookingStatus = async (bookingId: string, newStatus: 'completed' | 'cancelled' | 'no_show'): Promise<void> => {
    setBookingsData((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: newStatus } : b))
    );

    if (user && isSupabaseConfigured) {
      try {
        const supabase = createClient();
        await supabase.from('bookings').update({ status: newStatus }).eq('id', bookingId);
      } catch (err) {
        console.error('Error updating booking status in Supabase:', err);
      }
    }
  };

  // Connect Google Calendar Callback
  const handleConnectCalendar = async (): Promise<void> => {
    setProfileData((prev) => ({
      ...prev,
      google_calendar_connected: true,
    }));

    if (user && isSupabaseConfigured) {
      try {
        const supabase = createClient();
        await supabase
          .from('professional_profiles')
          .update({ google_calendar_connected: true })
          .eq('user_id', user.id);
      } catch (err) {
        console.error('Error updating calendar token in Supabase:', err);
      }
    }
  };

  // Unauthenticated Wall View
  if (!authLoading && !user) {
    return (
      <main className="min-h-screen bg-dark-950 text-techGray-100 flex flex-col font-sans">
        <Navbar />
        <div className="flex-1 flex items-center justify-center p-6 py-32">
          <div className="bg-dark-900 border border-dark-750 p-8 sm:p-12 rounded-2xl max-w-lg w-full text-center space-y-6 shadow-2xl font-mono">
            <div className="w-16 h-16 rounded-full bg-coral-500/15 border border-coral-500/40 text-coral-400 flex items-center justify-center mx-auto">
              <Briefcase className="w-8 h-8" />
            </div>

            <div className="space-y-2 font-sans">
              <span className="font-mono text-xs text-coral-400 bg-dark-850 px-3 py-1 rounded border border-dark-750">
                PROTECTED ROUTE // AUTH REQUIRED
              </span>
              <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight pt-2">
                Professional Dashboard Access
              </h1>
              <p className="text-techGray-300 text-sm">
                Please sign in with your Magic Link email to manage your 1:1 services, client bookings, payout ledger, and Google Calendar sync.
              </p>
            </div>

            <button
              onClick={() => openAuthModal()}
              className="w-full bg-coral-500 hover:bg-coral-600 text-dark-950 font-mono font-bold py-3.5 rounded-xl text-sm flex items-center justify-center gap-2 cursor-pointer shadow-lg"
            >
              <LogIn className="w-4 h-4" />
              <span>&gt; Sign In with Magic Link</span>
            </button>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  // Calculated Stats
  const completedBookings = bookingsData.filter((b) => b.status === 'completed').length;
  const upcomingBookingsCount = bookingsData.filter((b) => b.status === 'confirmed').length;
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const hasBio = Boolean(profileData.bio && profileData.bio.trim().length > 10);
  const hasServices = servicesData.length > 0;
  const isCalendarConnected = Boolean(profileData.google_calendar_connected);
  const completedSteps = [hasBio, hasServices, isCalendarConnected].filter(Boolean).length;

  const monthlyNetEarnings = paymentsData
    .filter((p) => {
      const pDate = new Date(p.created_at);
      return pDate.getMonth() === currentMonth && pDate.getFullYear() === currentYear;
    })
    .reduce((acc, p) => acc + (p.amount_inr - (p.commission_inr || p.amount_inr * 0.12)), 0);

  return (
    <main className="min-h-screen bg-dark-950 text-techGray-100 flex flex-col font-sans">
      <Navbar />

      <div className="flex-1 pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Top Header Banner */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-dark-800">
            <div>
              <div className="flex items-center gap-2 font-mono text-xs text-coral-400 mb-1">
                <Terminal className="w-4 h-4" />
                <span>FINDMYPEER // PROFESSIONAL_DASHBOARD</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                {authProfile?.full_name || user?.email?.split('@')[0] || 'Professional'} <span className="text-coral-500 font-mono">Workspace_</span>
              </h1>
              <p className="text-techGray-300 text-xs sm:text-sm font-sans mt-1">
                Manage 1:1 expert consultation sessions, services, payouts, and Google Calendar sync.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="font-mono text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-bold">
                <ShieldCheck className="w-4 h-4" /> VERIFIED PROFESSIONAL
              </span>
            </div>
          </div>

          {/* Main Dashboard Layout: Vertical Sidebar (Image 4) + Content Area */}
          <div className="flex flex-col lg:flex-row items-start gap-8">
            
            {/* Left Vertical Sidebar (Matching Image 4) */}
            <aside className="w-full lg:w-64 shrink-0 bg-dark-900 border border-dark-750 rounded-xl p-3 space-y-1 shadow-xl sticky top-24 font-mono text-xs">
              <div className="px-3 py-2 text-[10px] text-techGray-500 uppercase tracking-wider font-bold">
                NAVIGATION MENU
              </div>

              <button
                onClick={() => setActiveTab('overview')}
                className={`w-full px-3.5 py-3 rounded-lg transition-all flex items-center gap-3 cursor-pointer text-left relative ${
                  activeTab === 'overview'
                    ? 'bg-dark-850 text-coral-400 font-bold border border-dark-700 shadow-md'
                    : 'text-techGray-400 hover:text-white hover:bg-dark-850/60'
                }`}
              >
                {activeTab === 'overview' && (
                  <div className="absolute left-0 top-2 bottom-2 w-1 bg-coral-500 rounded-r" />
                )}
                <Layers className={`w-4 h-4 ${activeTab === 'overview' ? 'text-coral-400' : 'text-techGray-500'}`} />
                <span>Full Overview</span>
              </button>

              {/* Upcoming Meetings Tab */}
              <button
                onClick={() => setActiveTab('upcoming')}
                className={`w-full px-3.5 py-3 rounded-lg transition-all flex items-center gap-3 cursor-pointer text-left relative ${
                  activeTab === 'upcoming'
                    ? 'bg-dark-850 text-coral-400 font-bold border border-dark-700 shadow-md'
                    : 'text-techGray-400 hover:text-white hover:bg-dark-850/60'
                }`}
              >
                {activeTab === 'upcoming' && (
                  <div className="absolute left-0 top-2 bottom-2 w-1 bg-coral-500 rounded-r" />
                )}
                <Clock className={`w-4 h-4 ${activeTab === 'upcoming' ? 'text-coral-400' : 'text-techGray-500'}`} />
                <div className="flex items-center justify-between w-full">
                  <span>Upcoming</span>
                  <span className="bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded text-[10px] border border-emerald-500/30 font-bold">
                    {upcomingBookingsCount}
                  </span>
                </div>
              </button>

              {/* Meeting Links Tab */}
              <button
                onClick={() => setActiveTab('meet_links')}
                className={`w-full px-3.5 py-3 rounded-lg transition-all flex items-center gap-3 cursor-pointer text-left relative ${
                  activeTab === 'meet_links'
                    ? 'bg-dark-850 text-coral-400 font-bold border border-dark-700 shadow-md'
                    : 'text-techGray-400 hover:text-white hover:bg-dark-850/60'
                }`}
              >
                {activeTab === 'meet_links' && (
                  <div className="absolute left-0 top-2 bottom-2 w-1 bg-coral-500 rounded-r" />
                )}
                <Video className={`w-4 h-4 ${activeTab === 'meet_links' ? 'text-coral-400' : 'text-techGray-500'}`} />
                <div className="flex items-center justify-between w-full">
                  <span>Meeting Links</span>
                  <span className="bg-dark-800 text-techGray-300 px-2 py-0.5 rounded text-[10px] border border-dark-700 font-mono">
                    Google Meet
                  </span>
                </div>
              </button>

              {/* Calendar Tab */}
              <button
                onClick={() => setActiveTab('calendar')}
                className={`w-full px-3.5 py-3 rounded-lg transition-all flex items-center gap-3 cursor-pointer text-left relative ${
                  activeTab === 'calendar'
                    ? 'bg-dark-850 text-coral-400 font-bold border border-dark-700 shadow-md'
                    : 'text-techGray-400 hover:text-white hover:bg-dark-850/60'
                }`}
              >
                {activeTab === 'calendar' && (
                  <div className="absolute left-0 top-2 bottom-2 w-1 bg-coral-500 rounded-r" />
                )}
                <CalendarCheck className={`w-4 h-4 ${activeTab === 'calendar' ? 'text-coral-400' : 'text-techGray-500'}`} />
                <div className="flex items-center justify-between w-full">
                  <span>Calendar</span>
                  <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                    profileData.google_calendar_connected
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                      : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                  }`}>
                    {profileData.google_calendar_connected ? 'SYNCED' : 'NOT SYNCED'}
                  </span>
                </div>
              </button>

              <button
                onClick={() => setActiveTab('bookings')}
                className={`w-full px-3.5 py-3 rounded-lg transition-all flex items-center gap-3 cursor-pointer text-left relative ${
                  activeTab === 'bookings'
                    ? 'bg-dark-850 text-coral-400 font-bold border border-dark-700 shadow-md'
                    : 'text-techGray-400 hover:text-white hover:bg-dark-850/60'
                }`}
              >
                {activeTab === 'bookings' && (
                  <div className="absolute left-0 top-2 bottom-2 w-1 bg-coral-500 rounded-r" />
                )}
                <Calendar className={`w-4 h-4 ${activeTab === 'bookings' ? 'text-coral-400' : 'text-techGray-500'}`} />
                <div className="flex items-center justify-between w-full">
                  <span>Bookings</span>
                  <span className="bg-dark-800 text-techGray-300 px-2 py-0.5 rounded text-[10px] border border-dark-700">
                    {bookingsData.length}
                  </span>
                </div>
              </button>

              <button
                onClick={() => setActiveTab('earnings')}
                className={`w-full px-3.5 py-3 rounded-lg transition-all flex items-center gap-3 cursor-pointer text-left relative ${
                  activeTab === 'earnings'
                    ? 'bg-dark-850 text-coral-400 font-bold border border-dark-700 shadow-md'
                    : 'text-techGray-400 hover:text-white hover:bg-dark-850/60'
                }`}
              >
                {activeTab === 'earnings' && (
                  <div className="absolute left-0 top-2 bottom-2 w-1 bg-coral-500 rounded-r" />
                )}
                <IndianRupee className={`w-4 h-4 ${activeTab === 'earnings' ? 'text-coral-400' : 'text-techGray-500'}`} />
                <span>Earnings & Payouts</span>
              </button>

              <button
                onClick={() => setActiveTab('services')}
                className={`w-full px-3.5 py-3 rounded-lg transition-all flex items-center gap-3 cursor-pointer text-left relative ${
                  activeTab === 'services'
                    ? 'bg-dark-850 text-coral-400 font-bold border border-dark-700 shadow-md'
                    : 'text-techGray-400 hover:text-white hover:bg-dark-850/60'
                }`}
              >
                {activeTab === 'services' && (
                  <div className="absolute left-0 top-2 bottom-2 w-1 bg-coral-500 rounded-r" />
                )}
                <Briefcase className={`w-4 h-4 ${activeTab === 'services' ? 'text-coral-400' : 'text-techGray-500'}`} />
                <div className="flex items-center justify-between w-full">
                  <span>Profile & Services</span>
                  <span className="bg-dark-800 text-techGray-300 px-2 py-0.5 rounded text-[10px] border border-dark-700">
                    {servicesData.length}
                  </span>
                </div>
              </button>

              <button
                onClick={() => setActiveTab('reviews')}
                className={`w-full px-3.5 py-3 rounded-lg transition-all flex items-center gap-3 cursor-pointer text-left relative ${
                  activeTab === 'reviews'
                    ? 'bg-dark-850 text-coral-400 font-bold border border-dark-700 shadow-md'
                    : 'text-techGray-400 hover:text-white hover:bg-dark-850/60'
                }`}
              >
                {activeTab === 'reviews' && (
                  <div className="absolute left-0 top-2 bottom-2 w-1 bg-coral-500 rounded-r" />
                )}
                <MessageSquare className={`w-4 h-4 ${activeTab === 'reviews' ? 'text-coral-400' : 'text-techGray-500'}`} />
                <div className="flex items-center justify-between w-full">
                  <span>Reviews</span>
                  <span className="bg-dark-800 text-techGray-300 px-2 py-0.5 rounded text-[10px] border border-dark-700">
                    {reviewsData.length}
                  </span>
                </div>
              </button>

              {/* Profile Completion Button (Below Reviews) */}
              <button
                onClick={() => setActiveTab('completion')}
                className={`w-full px-3.5 py-3 rounded-lg transition-all flex items-center gap-3 cursor-pointer text-left relative ${
                  activeTab === 'completion'
                    ? 'bg-dark-850 text-coral-400 font-bold border border-dark-700 shadow-md'
                    : 'text-techGray-400 hover:text-white hover:bg-dark-850/60'
                }`}
              >
                {activeTab === 'completion' && (
                  <div className="absolute left-0 top-2 bottom-2 w-1 bg-coral-500 rounded-r" />
                )}
                <Sparkles className={`w-4 h-4 ${activeTab === 'completion' ? 'text-coral-400' : 'text-techGray-500'}`} />
                <div className="flex items-center justify-between w-full">
                  <span>Profile Completion</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                    completedSteps === 3 
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
                      : 'bg-coral-500/10 text-coral-400 border-coral-500/30'
                  }`}>
                    {completedSteps}/3
                  </span>
                </div>
              </button>

            </aside>

            {/* Right Main Content Panel */}
            <div className="flex-1 min-w-0 w-full space-y-8">
              
              {activeTab === 'overview' && (
                <div className="space-y-10">
                  {/* Status Banner with 4 Circular Animated Stat Cards */}
                  <StatusBanner
                    upcomingBookingsCount={upcomingBookingsCount}
                    totalCompletedBookings={completedBookings}
                    ratingAvg={profileData.rating_avg || 5.0}
                    monthlyNetEarnings={monthlyNetEarnings > 0 ? monthlyNetEarnings : 7917}
                    isCalendarConnected={profileData.google_calendar_connected}
                    onConnectCalendar={handleConnectCalendar}
                  />

                  <BookingsSection
                    bookings={bookingsData}
                    onUpdateStatus={handleUpdateBookingStatus}
                    isLoading={dataLoading}
                  />
                  <EarningsSection payments={paymentsData} isLoading={dataLoading} />
                  <ProfileServicesSection
                    profile={profileData}
                    services={servicesData}
                    onSaveProfile={handleSaveProfile}
                    onAddService={handleAddService}
                    onToggleServiceActive={handleToggleServiceActive}
                    onUpdateService={handleUpdateService}
                    onConnectCalendar={handleConnectCalendar}
                    isLoading={dataLoading}
                  />
                  <ReviewsSection
                    reviews={reviewsData}
                    ratingAvg={profileData.rating_avg || 5.0}
                    isLoading={dataLoading}
                  />
                </div>
              )}

              {activeTab === 'bookings' && (
                <BookingsSection
                  bookings={bookingsData}
                  onUpdateStatus={handleUpdateBookingStatus}
                  isLoading={dataLoading}
                />
              )}

              {activeTab === 'earnings' && (
                <EarningsSection payments={paymentsData} isLoading={dataLoading} />
              )}

              {activeTab === 'services' && (
                <ProfileServicesSection
                  profile={profileData}
                  services={servicesData}
                  onSaveProfile={handleSaveProfile}
                  onAddService={handleAddService}
                  onToggleServiceActive={handleToggleServiceActive}
                  onUpdateService={handleUpdateService}
                  onConnectCalendar={handleConnectCalendar}
                  isLoading={dataLoading}
                />
              )}

              {activeTab === 'reviews' && (
                <ReviewsSection
                  reviews={reviewsData}
                  ratingAvg={profileData.rating_avg || 5.0}
                  isLoading={dataLoading}
                />
              )}

              {activeTab === 'upcoming' && (
                <div className="space-y-6">
                  <div className="bg-dark-900 border border-dark-750 p-6 rounded-xl space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-white flex items-center gap-2">
                          <Clock className="w-5 h-5 text-emerald-400" />
                          <span>Upcoming Scheduled Meetings</span>
                        </h3>
                        <p className="text-sm text-techGray-400 mt-1">
                          All confirmed client consultation slots scheduled for upcoming dates.
                        </p>
                      </div>
                      <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full text-xs font-mono font-bold">
                        {upcomingBookingsCount} Scheduled
                      </span>
                    </div>

                    <BookingsSection
                      bookings={bookingsData.filter((b) => b.status === 'confirmed')}
                      onUpdateStatus={handleUpdateBookingStatus}
                      isLoading={dataLoading}
                    />
                  </div>
                </div>
              )}

              {activeTab === 'meet_links' && (
                <div className="space-y-6">
                  <div className="bg-dark-900 border border-dark-750 p-6 rounded-xl space-y-6">
                    <div>
                      <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <Video className="w-5 h-5 text-coral-400" />
                        <span>Instant Google Meet & Video Call Links</span>
                      </h3>
                      <p className="text-sm text-techGray-400 mt-1">
                        Direct video room links generated automatically for confirmed advisory sessions.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {bookingsData
                        .filter((b) => b.meet_link)
                        .map((b) => (
                          <div
                            key={b.id}
                            className="bg-dark-950 border border-dark-800 p-4 rounded-lg flex flex-col justify-between space-y-3"
                          >
                            <div className="space-y-1">
                              <span className="text-xs font-mono text-coral-400 font-bold">
                                {b.service_title}
                              </span>
                              <h4 className="font-bold text-white text-base">{b.client_name}</h4>
                              <p className="text-xs text-techGray-400 font-mono">
                                {new Date(b.slot_start).toLocaleString('en-US', {
                                  weekday: 'short',
                                  month: 'short',
                                  day: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit',
                                })}
                              </p>
                            </div>

                            <a
                              href={b.meet_link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-full bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 font-mono text-xs py-2 px-3 rounded flex items-center justify-center gap-2 transition-all font-bold"
                            >
                              <Video className="w-4 h-4" />
                              <span>Join Google Meet</span>
                              <ExternalLink className="w-3.5 h-3.5 ml-auto" />
                            </a>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'calendar' && (
                <div className="space-y-6">
                  <div className="bg-dark-900 border border-dark-750 p-6 rounded-xl space-y-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-bold text-white flex items-center gap-2">
                          <CalendarCheck className="w-5 h-5 text-coral-400" />
                          <span>Google Calendar Integration</span>
                        </h3>
                        <p className="text-sm text-techGray-400 mt-1">
                          Auto-sync your availability and prevent double booking across client calls.
                        </p>
                      </div>

                      <button
                        onClick={handleConnectCalendar}
                        className={`px-4 py-2.5 rounded-lg font-mono text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                          profileData.google_calendar_connected
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                            : 'bg-coral-500 text-dark-950 hover:bg-coral-400'
                        }`}
                      >
                        <Calendar className="w-4 h-4" />
                        <span>
                          {profileData.google_calendar_connected
                            ? '✓ Calendar Connected (Synced)'
                            : 'Connect Google Calendar'}
                        </span>
                      </button>
                    </div>

                    <div className="bg-dark-950 border border-dark-800 p-5 rounded-lg space-y-3 font-mono text-xs">
                      <div className="text-techGray-300 font-bold uppercase tracking-wider">
                        SYDNED UPCOMING SLOTS ({bookingsData.length})
                      </div>
                      <div className="space-y-2">
                        {bookingsData.map((b) => (
                          <div
                            key={b.id}
                            className="flex items-center justify-between bg-dark-900 p-3 rounded border border-dark-800"
                          >
                            <div>
                              <span className="text-white font-bold">{b.client_name}</span>
                              <span className="text-techGray-400 font-normal"> — {b.service_title}</span>
                            </div>
                            <span className="text-coral-400">
                              {new Date(b.slot_start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'completion' && (
                <ProfileCompletionCard
                  hasBio={hasBio}
                  hasServices={hasServices}
                  isCalendarConnected={isCalendarConnected}
                  onConnectCalendar={handleConnectCalendar}
                  onNavigateTab={(tab) => setActiveTab(tab)}
                />
              )}

            </div>
          </div>

        </div>
      </div>

      <Footer />
    </main>
  );
}
