'use client';

import React from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  Calendar, 
  Star, 
  IndianRupee, 
  Check, 
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Clock,
  Sparkles,
  ExternalLink
} from 'lucide-react';

interface StatusBannerProps {
  upcomingBookingsCount: number;
  totalCompletedBookings: number;
  ratingAvg: number;
  monthlyNetEarnings: number;
  isCalendarConnected: boolean;
  onConnectCalendar: () => void;
}

export default function StatusBanner({
  upcomingBookingsCount,
  totalCompletedBookings,
  ratingAvg,
  monthlyNetEarnings,
  isCalendarConnected,
  onConnectCalendar,
}: StatusBannerProps) {
  return (
    <div className="space-y-6">
      {/* 1. Google Calendar Required Warning Banner (If not connected) */}
      {!isCalendarConnected && (
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 font-sans shadow-lg">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-white font-bold text-base flex items-center gap-2">
                <span>Google Calendar Not Connected</span>
                <span className="text-[10px] font-mono uppercase bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded border border-amber-500/40">
                  BOOKINGS DISABLED
                </span>
              </h3>
              <p className="text-techGray-300 text-xs sm:text-sm mt-0.5">
                Your profile cannot receive real client bookings until your Google Calendar is linked for automated Google Meet link generation and slot syncing.
              </p>
            </div>
          </div>

          <button
            onClick={onConnectCalendar}
            className="w-full md:w-auto bg-amber-500 hover:bg-amber-400 text-dark-950 font-mono text-xs font-bold px-4 py-2.5 rounded-lg transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer shadow-md"
          >
            <Calendar className="w-4 h-4" />
            <span>&gt; Connect Google Calendar</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* 2. Top Header Stat Row: 4 Circular Animated Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 py-2">
        
        {/* Circular Card 1: Upcoming Meetings */}
        <div className="relative group flex justify-center">
          {/* Pulsing Animated Glow Ring */}
          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-cyan-500/30 via-blue-500/20 to-cyan-500/30 blur-sm opacity-60 group-hover:opacity-100 transition-opacity animate-pulse" />
          
          <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-dark-900 border border-dark-700 shadow-2xl flex flex-col items-center justify-center p-3 text-center transition-transform duration-300 group-hover:scale-105">
            <div className="w-8 h-8 rounded-full bg-cyan-500/15 border border-cyan-500/40 text-cyan-400 flex items-center justify-center mb-1 shrink-0">
              <Calendar className="w-4 h-4" />
            </div>
            
            <span className="font-mono text-[9px] sm:text-[10px] text-techGray-400 uppercase tracking-tight">
              UPCOMING MEETINGS
            </span>
            
            <div className="text-2xl sm:text-3xl font-bold font-mono text-white my-0.5">
              {upcomingBookingsCount}
            </div>
            
            <div className="text-[9px] font-sans text-cyan-400 flex items-center gap-1">
              <Clock className="w-2.5 h-2.5 text-cyan-400" />
              <span>Scheduled 1:1 Calls</span>
            </div>
          </div>
        </div>

        {/* Circular Card 2: Completed Calls */}
        <div className="relative group flex justify-center">
          {/* Pulsing Animated Glow Ring */}
          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-coral-500/30 via-orange-500/20 to-coral-500/30 blur-sm opacity-60 group-hover:opacity-100 transition-opacity animate-pulse" />
          
          <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-dark-900 border border-dark-700 shadow-2xl flex flex-col items-center justify-center p-3 text-center transition-transform duration-300 group-hover:scale-105">
            <div className="w-8 h-8 rounded-full bg-coral-500/15 border border-coral-500/40 text-coral-400 flex items-center justify-center mb-1 shrink-0">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            
            <span className="font-mono text-[9px] sm:text-[10px] text-techGray-400 uppercase tracking-tight">
              COMPLETED CALLS
            </span>
            
            <div className="text-2xl sm:text-3xl font-bold font-mono text-white my-0.5">
              {totalCompletedBookings}
            </div>
            
            <div className="text-[9px] font-sans text-techGray-400 flex items-center gap-1">
              <TrendingUp className="w-2.5 h-2.5 text-emerald-400" />
              <span>Total 1:1 Sessions</span>
            </div>
          </div>
        </div>

        {/* Circular Card 3: Rating Average */}
        <div className="relative group flex justify-center">
          {/* Pulsing Animated Glow Ring */}
          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-amber-500/30 via-yellow-500/20 to-amber-500/30 blur-sm opacity-60 group-hover:opacity-100 transition-opacity animate-pulse" />
          
          <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-dark-900 border border-dark-700 shadow-2xl flex flex-col items-center justify-center p-3 text-center transition-transform duration-300 group-hover:scale-105">
            <div className="w-8 h-8 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-400 flex items-center justify-center mb-1 shrink-0">
              <Star className="w-4 h-4 fill-current" />
            </div>
            
            <span className="font-mono text-[9px] sm:text-[10px] text-techGray-400 uppercase tracking-tight">
              RATING AVERAGE
            </span>
            
            <div className="text-xl sm:text-2xl font-bold font-mono text-white my-0.5 flex items-baseline gap-0.5">
              <span>{ratingAvg > 0 ? ratingAvg.toFixed(1) : '5.0'}</span>
              <span className="text-[10px] text-amber-400 font-normal">/ 5.0 ★</span>
            </div>
            
            <div className="text-[9px] font-sans text-techGray-400">
              Client Satisfaction
            </div>
          </div>
        </div>

        {/* Circular Card 4: Monthly Net Earnings */}
        <div className="relative group flex justify-center">
          {/* Pulsing Animated Glow Ring */}
          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-emerald-500/30 via-teal-500/20 to-emerald-500/30 blur-sm opacity-60 group-hover:opacity-100 transition-opacity animate-pulse" />
          
          <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-dark-900 border border-dark-700 shadow-2xl flex flex-col items-center justify-center p-3 text-center transition-transform duration-300 group-hover:scale-105">
            <div className="w-8 h-8 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mb-1 shrink-0">
              <IndianRupee className="w-4 h-4" />
            </div>
            
            <span className="font-mono text-[9px] sm:text-[10px] text-techGray-400 uppercase tracking-tight">
              THIS MONTH NET
            </span>
            
            <div className="text-xl sm:text-2xl font-bold font-mono text-white my-0.5 truncate max-w-full px-1">
              ₹{monthlyNetEarnings.toLocaleString()}
            </div>
            
            <div className="text-[9px] font-sans text-emerald-400">
              After 12% commission
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
