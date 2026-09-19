'use client';

import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Clock, 
  Video, 
  User, 
  AlertTriangle, 
  ExternalLink, 
  XCircle, 
  ArrowRight,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface ClientUpcomingBooking {
  id: string;
  professional_id: string;
  professional_name: string;
  professional_title: string;
  professional_photo?: string | null;
  service_id: string;
  service_title: string;
  duration_minutes: number;
  price_inr: number;
  slot_start: string;
  slot_end: string;
  status: 'pending_payment' | 'confirmed';
  meet_link?: string | null;
  created_at: string;
}

interface UpcomingBookingsProps {
  bookings: ClientUpcomingBooking[];
  onCancelBooking: (bookingId: string) => Promise<void>;
  isLoading?: boolean;
}

export default function UpcomingBookings({
  bookings,
  onCancelBooking,
  isLoading = false,
}: UpcomingBookingsProps) {
  const [cancellingId, setCancellingId] = useState<string | null>(null);
  const [showCancelModal, setShowCancelModal] = useState<ClientUpcomingBooking | null>(null);
  const [now, setNow] = useState<Date>(new Date());

  // Update clock every minute for live "Starts in X" countdown
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const formatCountdown = (slotStart: string) => {
    const diffMs = new Date(slotStart).getTime() - now.getTime();
    if (diffMs <= 0) return 'In Progress / Ready';

    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 0) return `Starts in ${diffDays} day${diffDays > 1 ? 's' : ''}`;
    if (diffHours > 0) return `Starts in ${diffHours} hr${diffHours > 1 ? 's' : ''} ${diffMins % 60} min`;
    return `Starts in ${diffMins} min`;
  };

  const isMeetActive = (slotStart: string) => {
    // Active if session starts within 15 minutes or is ongoing
    const diffMs = new Date(slotStart).getTime() - now.getTime();
    return diffMs <= 15 * 60 * 1000;
  };

  const handleConfirmCancel = async () => {
    if (!showCancelModal) return;
    setCancellingId(showCancelModal.id);
    await onCancelBooking(showCancelModal.id);
    setCancellingId(null);
    setShowCancelModal(null);
  };

  return (
    <div className="bg-dark-900 border border-dark-750 rounded-xl overflow-hidden shadow-2xl space-y-0 font-sans">
      
      {/* Header */}
      <div className="p-4 sm:px-6 bg-dark-950 border-b border-dark-800 flex items-center justify-between font-mono text-xs">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-coral-400" />
          <span className="text-white font-bold text-sm font-sans tracking-tight">Upcoming 1:1 Sessions</span>
        </div>
        <span className="text-coral-400 bg-coral-500/10 border border-coral-500/20 px-2.5 py-0.5 rounded font-bold">
          {bookings.length} SCHEDULED
        </span>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-6">
        {isLoading ? (
          <div className="py-16 text-center font-mono text-xs text-techGray-400 space-y-2">
            <div className="animate-spin w-6 h-6 border-2 border-coral-500 border-t-transparent rounded-full mx-auto" />
            <div>LOADING_UPCOMING_SESSIONS...</div>
          </div>
        ) : bookings.length === 0 ? (
          /* Empty State */
          <div className="py-16 text-center space-y-4 font-mono">
            <div className="w-14 h-14 rounded-full bg-dark-850 border border-dark-750 flex items-center justify-center mx-auto text-techGray-500">
              <Calendar className="w-7 h-7" />
            </div>
            <div className="space-y-1 font-sans">
              <h3 className="text-white font-bold text-lg">No upcoming 1:1 sessions</h3>
              <p className="text-techGray-400 text-xs sm:text-sm max-w-sm mx-auto">
                Book a focused session with top experts in tech, PMF, fundraising, and system design.
              </p>
            </div>
            <a
              href="/#discover"
              className="inline-flex items-center gap-2 bg-coral-500 hover:bg-coral-600 text-dark-950 font-mono font-bold px-5 py-2.5 rounded-lg text-xs shadow-lg transition-all"
            >
              <span>&gt; Browse Advisors & Book Slot</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        ) : (
          /* Bookings Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {bookings.map((b) => {
              const startDate = new Date(b.slot_start);
              const endDate = new Date(b.slot_end);
              const ready = isMeetActive(b.slot_start);

              return (
                <div
                  key={b.id}
                  className="bg-dark-850 border border-dark-700/80 hover:border-coral-500/40 p-5 rounded-xl transition-all duration-200 flex flex-col justify-between space-y-4 shadow-lg"
                >
                  <div className="space-y-3.5">
                    
                    {/* Header: Professional details + Photo */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-lg bg-coral-500/20 border border-coral-500/40 text-coral-400 font-mono font-bold text-sm flex items-center justify-center overflow-hidden shrink-0">
                          {b.professional_photo ? (
                            <img src={b.professional_photo} alt={b.professional_name} className="w-full h-full object-cover" />
                          ) : (
                            <span>{b.professional_name ? b.professional_name.substring(0, 2).toUpperCase() : 'PRO'}</span>
                          )}
                        </div>
                        <div>
                          <h4 className="font-bold text-white text-base leading-snug">{b.professional_name}</h4>
                          <p className="font-mono text-xs text-techGray-400 line-clamp-1">{b.professional_title}</p>
                        </div>
                      </div>

                      {/* Countdown Tag */}
                      <span className="font-mono text-[10px] bg-dark-800 text-coral-400 px-2 py-1 rounded border border-dark-750 shrink-0 font-bold">
                        {formatCountdown(b.slot_start)}
                      </span>
                    </div>

                    {/* Service title & Duration */}
                    <div className="p-3 bg-dark-900 rounded-lg border border-dark-800 space-y-1">
                      <div className="font-bold text-white text-sm">{b.service_title}</div>
                      <div className="font-mono text-xs text-techGray-400 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-coral-400" />
                        <span>{b.duration_minutes} minutes 1:1 call</span>
                      </div>
                    </div>

                    {/* Date & Time */}
                    <div className="flex items-center justify-between font-mono text-xs text-techGray-300">
                      <div>
                        {startDate.toLocaleDateString('en-US', {
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </div>
                      <div className="text-white font-medium">
                        {startDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })} - {endDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>

                  {/* Actions: Join Meet + Cancel */}
                  <div className="pt-3 border-t border-dark-800 flex items-center justify-between gap-3 font-mono text-xs">
                    <button
                      onClick={() => setShowCancelModal(b)}
                      className="text-techGray-400 hover:text-red-400 transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      <span>Cancel</span>
                    </button>

                    {b.meet_link ? (
                      <a
                        href={b.meet_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`px-4 py-2 rounded-lg font-mono font-bold text-xs flex items-center gap-1.5 transition-all shadow cursor-pointer ${
                          ready
                            ? 'bg-emerald-500 hover:bg-emerald-400 text-dark-950 animate-pulse'
                            : 'bg-dark-800 text-techGray-300 hover:text-white border border-dark-700'
                        }`}
                      >
                        <Video className="w-4 h-4" />
                        <span>{ready ? 'Join Meet Now' : 'Join Meet Link'}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : (
                      <span className="text-techGray-500 text-[11px]">Generating Meet Link...</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Cancel Confirmation Modal */}
      <AnimatePresence>
        {showCancelModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-dark-900 border border-dark-750 max-w-md w-full p-6 rounded-xl shadow-2xl space-y-5 font-sans relative"
            >
              <div className="flex items-center gap-3 text-amber-400 font-mono text-xs">
                <AlertTriangle className="w-5 h-5 shrink-0" />
                <span className="font-bold text-sm">CANCEL BOOKING CONFIRMATION</span>
              </div>

              <div className="space-y-2 text-xs sm:text-sm text-techGray-300">
                <p>
                  Are you sure you want to cancel your <strong className="text-white">{showCancelModal.service_title}</strong> call with <strong className="text-white">{showCancelModal.professional_name}</strong>?
                </p>

                {/* TODO: Cancellation policy window validation logic (e.g. 24h prior refund rule) */}
                <div className="p-3 bg-dark-850 rounded border border-dark-750 font-mono text-[11px] text-techGray-400 space-y-1">
                  <div>POLICY NOTICE: Free cancellation is allowed up to 12 hours prior to slot start time.</div>
                  <div className="text-amber-400">TODO: Cancellation policy window validation</div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 font-mono text-xs pt-2">
                <button
                  onClick={() => setShowCancelModal(null)}
                  className="bg-dark-800 hover:bg-dark-750 text-techGray-300 px-4 py-2 rounded-lg"
                >
                  Back
                </button>
                <button
                  onClick={handleConfirmCancel}
                  disabled={cancellingId === showCancelModal.id}
                  className="bg-red-500 hover:bg-red-600 disabled:opacity-50 text-white font-bold px-4 py-2 rounded-lg flex items-center gap-1.5 cursor-pointer"
                >
                  <XCircle className="w-4 h-4" />
                  <span>Confirm Cancellation</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
