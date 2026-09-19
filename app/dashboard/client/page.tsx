'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import UpcomingBookings, { ClientUpcomingBooking } from '@/components/client-dashboard/UpcomingBookings';
import PastBookings, { ClientPastBooking } from '@/components/client-dashboard/PastBookings';
import ClientProfileSection, { ClientProfileData } from '@/components/client-dashboard/ClientProfileSection';
import { useAuth } from '@/context/AuthContext';
import { createClient, isSupabaseConfigured } from '@/lib/supabase/client';
import { 
  Calendar, 
  Clock, 
  User, 
  Star, 
  Sparkles, 
  LogIn, 
  Terminal, 
  ArrowRight,
  CheckCircle2,
  Layers,
  Video
} from 'lucide-react';

// Default initial client mock data for immediate interactivity
const MOCK_INITIAL_UPCOMING: ClientUpcomingBooking[] = [
  {
    id: 'bkg-client-1',
    professional_id: 'pro-1',
    professional_name: 'Arjun Kapoor',
    professional_title: 'Ex-Google Staff PM',
    professional_photo: '',
    service_id: 'svc-1',
    service_title: '0 to 1 Product Strategy & PMF Validation',
    duration_minutes: 45,
    price_inr: 2999,
    slot_start: new Date(Date.now() + 2 * 3600 * 1000).toISOString(),
    slot_end: new Date(Date.now() + 2.75 * 3600 * 1000).toISOString(),
    status: 'confirmed',
    meet_link: 'https://meet.google.com/abc-defg-hij',
    created_at: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
  },
  {
    id: 'bkg-client-2',
    professional_id: 'pro-2',
    professional_name: 'Rhea Sharma',
    professional_title: 'Tech Lead @ Razorpay',
    professional_photo: '',
    service_id: 'svc-3',
    service_title: 'System Design Mock Interview & Architecture Sanity',
    duration_minutes: 60,
    price_inr: 3499,
    slot_start: new Date(Date.now() + 48 * 3600 * 1000).toISOString(),
    slot_end: new Date(Date.now() + 49 * 3600 * 1000).toISOString(),
    status: 'confirmed',
    meet_link: 'https://meet.google.com/xyz-uvwx-rst',
    created_at: new Date(Date.now() - 12 * 3600 * 1000).toISOString(),
  },
];

const MOCK_INITIAL_PAST: ClientPastBooking[] = [
  {
    id: 'bkg-client-past-1',
    professional_id: 'pro-3',
    professional_name: 'Deepika Nair',
    professional_title: 'Head of Talent @ Swiggy',
    professional_photo: '',
    service_id: 'svc-2',
    service_title: 'Executive Resume Teardown & Salary Negotiation',
    duration_minutes: 30,
    slot_start: new Date(Date.now() - 3 * 24 * 3600 * 1000).toISOString(),
    slot_end: new Date(Date.now() - 3 * 24 * 3600 * 1000 + 1800000).toISOString(),
    status: 'completed',
    review: {
      id: 'rev-c-1',
      rating: 5,
      comment: 'Deepika was incredible! She gave me direct insights into compensation benchmarking for Senior PM roles.',
      created_at: new Date(Date.now() - 2 * 24 * 3600 * 1000).toISOString(),
    },
  },
  {
    id: 'bkg-client-past-2',
    professional_id: 'pro-4',
    professional_name: 'Vikram Sengupta',
    professional_title: 'Series A Founder (Exited $12M)',
    professional_photo: '',
    service_id: 'svc-4',
    service_title: 'Pitch Deck Line-by-Line & Term Sheet Teardown',
    duration_minutes: 60,
    slot_start: new Date(Date.now() - 7 * 24 * 3600 * 1000).toISOString(),
    slot_end: new Date(Date.now() - 7 * 24 * 3600 * 1000 + 3600000).toISOString(),
    status: 'completed',
    review: null, // Ready for review!
  },
];

export default function ClientDashboardPage() {
  const { user, profile: authProfile, isLoading: authLoading, openAuthModal, updateProfile: updateAuthProfile } = useAuth();

  const [activeTab, setActiveTab] = useState<'upcoming' | 'past' | 'profile'>('upcoming');

  // Supabase Data States
  const [upcomingBookings, setUpcomingBookings] = useState<ClientUpcomingBooking[]>(MOCK_INITIAL_UPCOMING);
  const [pastBookings, setPastBookings] = useState<ClientPastBooking[]>(MOCK_INITIAL_PAST);
  const [clientProfile, setClientProfile] = useState<ClientProfileData>({
    full_name: authProfile?.full_name || '',
    email: authProfile?.email || user?.email || '',
    phone: authProfile?.phone || '',
  });

  const [dataLoading, setDataLoading] = useState(true);

  // Sync auth profile
  useEffect(() => {
    if (authProfile || user) {
      setClientProfile({
        full_name: authProfile?.full_name || user?.user_metadata?.full_name || '',
        email: authProfile?.email || user?.email || '',
        phone: authProfile?.phone || '',
      });
    }
  }, [authProfile, user]);

  // Load client bookings and reviews from Supabase
  useEffect(() => {
    if (!user) {
      setDataLoading(false);
      return;
    }

    const loadClientData = async () => {
      setDataLoading(true);
      const supabase = createClient();

      try {
        if (isSupabaseConfigured) {
          // Fetch Bookings with joined professional profiles and services
          const { data: bkgs } = await supabase
            .from('bookings')
            .select(`
              *,
              profiles!professional_id(full_name, headline, avatar_url),
              services(title, duration_minutes, price_inr),
              reviews(id, rating, comment, created_at)
            `)
            .eq('client_id', user.id);

          if (bkgs && bkgs.length > 0) {
            const nowTime = new Date().getTime();

            const upcoming: ClientUpcomingBooking[] = [];
            const past: ClientPastBooking[] = [];

            bkgs.forEach((b: any) => {
              const startMs = new Date(b.slot_start).getTime();
              const isPast = b.status === 'completed' || b.status === 'cancelled' || b.status === 'no_show' || startMs < nowTime - 24 * 3600 * 1000;

              if (isPast) {
                const revObj = Array.isArray(b.reviews) && b.reviews.length > 0 ? b.reviews[0] : b.reviews;
                past.push({
                  id: b.id,
                  professional_id: b.professional_id,
                  professional_name: b.profiles?.full_name || 'Verified Advisor',
                  professional_title: b.profiles?.headline || 'Expert Practitioner',
                  professional_photo: b.profiles?.avatar_url || null,
                  service_id: b.service_id,
                  service_title: b.services?.title || '1:1 Session',
                  duration_minutes: b.services?.duration_minutes || 30,
                  slot_start: b.slot_start,
                  slot_end: b.slot_end,
                  status: b.status === 'confirmed' ? 'completed' : b.status,
                  review: revObj ? {
                    id: revObj.id,
                    rating: revObj.rating,
                    comment: revObj.comment,
                    created_at: revObj.created_at,
                  } : null,
                });
              } else {
                upcoming.push({
                  id: b.id,
                  professional_id: b.professional_id,
                  professional_name: b.profiles?.full_name || 'Verified Advisor',
                  professional_title: b.profiles?.headline || 'Expert Practitioner',
                  professional_photo: b.profiles?.avatar_url || null,
                  service_id: b.service_id,
                  service_title: b.services?.title || '1:1 Session',
                  duration_minutes: b.services?.duration_minutes || 30,
                  price_inr: b.services?.price_inr || 2999,
                  slot_start: b.slot_start,
                  slot_end: b.slot_end,
                  status: b.status,
                  meet_link: b.meet_link || 'https://meet.google.com/peer-session',
                  created_at: b.created_at,
                });
              }
            });

            setUpcomingBookings(upcoming);
            setPastBookings(past);
          }
        }
      } catch (err) {
        console.warn('Supabase client fetch notice:', err);
      } finally {
        setDataLoading(false);
      }
    };

    loadClientData();
  }, [user]);

  // Cancel Booking handler
  const handleCancelBooking = async (bookingId: string): Promise<void> => {
    setUpcomingBookings((prev) => prev.filter((b) => b.id !== bookingId));

    if (user && isSupabaseConfigured) {
      try {
        const supabase = createClient();
        await supabase
          .from('bookings')
          .update({ status: 'cancelled' })
          .eq('id', bookingId)
          .eq('client_id', user.id);
      } catch (err) {
        console.error('Error cancelling booking in Supabase:', err);
      }
    }
  };

  // Submit Review Handler (Writes to reviews table)
  const handleSubmitReview = async (
    bookingId: string,
    professionalId: string,
    rating: number,
    comment: string
  ): Promise<boolean> => {
    const newRev = {
      id: 'rev-' + Date.now(),
      rating,
      comment,
      created_at: new Date().toISOString(),
    };

    setPastBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, review: newRev } : b))
    );

    if (user && isSupabaseConfigured) {
      try {
        const supabase = createClient();
        await supabase.from('reviews').insert({
          booking_id: bookingId,
          client_id: user.id,
          professional_id: professionalId,
          rating,
          comment,
        });
      } catch (err) {
        console.error('Error writing review to Supabase:', err);
        return false;
      }
    }
    return true;
  };

  // Save Profile Handler (Writes to profiles table)
  const handleSaveProfile = async (updated: Partial<ClientProfileData>): Promise<boolean> => {
    setClientProfile((prev) => ({ ...prev, ...updated }));

    if (user) {
      await updateAuthProfile({
        full_name: updated.full_name,
        phone: updated.phone,
      });

      if (isSupabaseConfigured) {
        try {
          const supabase = createClient();
          await supabase
            .from('profiles')
            .update({
              full_name: updated.full_name,
              phone: updated.phone,
              updated_at: new Date().toISOString(),
            })
            .eq('id', user.id);
        } catch (err) {
          console.error('Error updating client profile in Supabase:', err);
        }
      }
    }
    return true;
  };

  // Unauthenticated Guard Screen
  if (!authLoading && !user) {
    return (
      <main className="min-h-screen bg-dark-950 text-techGray-100 flex flex-col font-sans">
        <Navbar />
        <div className="flex-1 flex items-center justify-center p-6 py-32">
          <div className="bg-dark-900 border border-dark-750 p-8 sm:p-12 rounded-2xl max-w-lg w-full text-center space-y-6 shadow-2xl font-mono">
            <div className="w-16 h-16 rounded-full bg-coral-500/15 border border-coral-500/40 text-coral-400 flex items-center justify-center mx-auto">
              <User className="w-8 h-8" />
            </div>

            <div className="space-y-2 font-sans">
              <span className="font-mono text-xs text-coral-400 bg-dark-850 px-3 py-1 rounded border border-dark-750">
                CLIENT PORTAL // AUTH REQUIRED
              </span>
              <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight pt-2">
                Client Dashboard Access
              </h1>
              <p className="text-techGray-300 text-sm">
                Sign in with your Magic Link email to access your scheduled 1:1 sessions, Google Meet links, past history, and review ratings.
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

  return (
    <main className="min-h-screen bg-dark-950 text-techGray-100 flex flex-col font-sans">
      <Navbar />

      <div className="flex-1 pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Header Banner */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-dark-800">
            <div>
              <div className="flex items-center gap-2 font-mono text-xs text-coral-400 mb-1">
                <Terminal className="w-4 h-4" />
                <span>FINDMYPEER // CLIENT_PORTAL</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                Welcome back, <span className="text-coral-500 font-mono">{clientProfile.full_name || user?.email?.split('@')[0] || 'Peer'}</span>
              </h1>
              <p className="text-techGray-300 text-xs sm:text-sm font-sans mt-1">
                View upcoming 1:1 calls, launch Google Meet, leave verified expert reviews, and manage your account.
              </p>
            </div>

            <div className="flex items-center gap-3 font-mono text-xs">
              <a
                href="/#discover"
                className="bg-coral-500 hover:bg-coral-600 text-dark-950 font-bold px-4 py-2.5 rounded-lg flex items-center gap-2 shadow cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Book New 1:1 Session</span>
              </a>
            </div>
          </div>

          {/* Quick Stats Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-dark-900 border border-dark-750 p-4 rounded-xl flex items-center gap-4 shadow-xl">
              <div className="w-10 h-10 rounded-lg bg-coral-500/15 border border-coral-500/30 text-coral-400 flex items-center justify-center shrink-0 font-mono font-bold">
                {upcomingBookings.length}
              </div>
              <div>
                <div className="text-white font-bold text-sm">Upcoming Sessions</div>
                <div className="text-techGray-400 text-xs font-mono">Confirmed 1:1 Calls</div>
              </div>
            </div>

            <div className="bg-dark-900 border border-dark-750 p-4 rounded-xl flex items-center gap-4 shadow-xl">
              <div className="w-10 h-10 rounded-lg bg-blue-500/15 border border-blue-500/30 text-blue-400 flex items-center justify-center shrink-0 font-mono font-bold">
                {pastBookings.length}
              </div>
              <div>
                <div className="text-white font-bold text-sm">Past Consultation Logs</div>
                <div className="text-techGray-400 text-xs font-mono">Completed & Archived</div>
              </div>
            </div>

            <div className="bg-dark-900 border border-dark-750 p-4 rounded-xl flex items-center gap-4 shadow-xl">
              <div className="w-10 h-10 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0 font-mono font-bold">
                {pastBookings.filter((b) => b.review).length}
              </div>
              <div>
                <div className="text-white font-bold text-sm">Reviews Submitted</div>
                <div className="text-techGray-400 text-xs font-mono">Verified Expert Feedback</div>
              </div>
            </div>
          </div>

          {/* Section Tabs */}
          <div className="bg-dark-900 p-1.5 rounded-xl border border-dark-750 flex flex-wrap items-center gap-2 font-mono text-xs">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`px-4 py-2.5 rounded-lg transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'upcoming'
                  ? 'bg-coral-500 text-dark-950 font-bold shadow'
                  : 'text-techGray-400 hover:text-white hover:bg-dark-850'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>Upcoming Calls ({upcomingBookings.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('past')}
              className={`px-4 py-2.5 rounded-lg transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'past'
                  ? 'bg-coral-500 text-dark-950 font-bold shadow'
                  : 'text-techGray-400 hover:text-white hover:bg-dark-850'
              }`}
            >
              <Clock className="w-4 h-4" />
              <span>Past History & Reviews ({pastBookings.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className={`px-4 py-2.5 rounded-lg transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'profile'
                  ? 'bg-coral-500 text-dark-950 font-bold shadow'
                  : 'text-techGray-400 hover:text-white hover:bg-dark-850'
              }`}
            >
              <User className="w-4 h-4" />
              <span>Client Account Details</span>
            </button>
          </div>

          {/* Tab Views */}
          {activeTab === 'upcoming' && (
            <UpcomingBookings
              bookings={upcomingBookings}
              onCancelBooking={handleCancelBooking}
              isLoading={dataLoading}
            />
          )}

          {activeTab === 'past' && (
            <PastBookings
              bookings={pastBookings}
              onSubmitReview={handleSubmitReview}
              isLoading={dataLoading}
            />
          )}

          {activeTab === 'profile' && (
            <ClientProfileSection
              profile={clientProfile}
              onSaveProfile={handleSaveProfile}
              isLoading={dataLoading}
            />
          )}

        </div>
      </div>

      <Footer />
    </main>
  );
}
